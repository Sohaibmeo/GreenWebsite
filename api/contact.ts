import * as nodemailer from "nodemailer";

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  setHeader: (name: string, value: string) => ApiResponse;
  json: (payload: unknown) => ApiResponse;
  send: (payload: string) => ApiResponse;
};

const TO_EMAIL = "developmentsohaib@gmail.com";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function sanitize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === "OPTIONS") {
    return res.status(204).setHeader("Access-Control-Allow-Origin", CORS_HEADERS["Access-Control-Allow-Origin"]).setHeader("Access-Control-Allow-Methods", CORS_HEADERS["Access-Control-Allow-Methods"]).setHeader("Access-Control-Allow-Headers", CORS_HEADERS["Access-Control-Allow-Headers"]).send("");
  }

  if (req.method !== "POST") {
    return res.status(405).setHeader("Allow", "POST, OPTIONS").json({ error: "Method not allowed" });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = (process.env.SMTP_SECURE || "false").toLowerCase() === "true";
  const fromEmail = process.env.SMTP_FROM || smtpUser || TO_EMAIL;

  if (!smtpHost || !smtpUser || !smtpPass) {
    return res.status(500).setHeader("Access-Control-Allow-Origin", CORS_HEADERS["Access-Control-Allow-Origin"]).json({
      error: "Missing SMTP_HOST, SMTP_USER, or SMTP_PASS environment variables",
    });
  }

  const body = typeof req.body === "object" && req.body ? req.body : {};

  const name = sanitize((body as Record<string, unknown>).name);
  const email = sanitize((body as Record<string, unknown>).email);
  const company = sanitize((body as Record<string, unknown>).company);
  const phone = sanitize((body as Record<string, unknown>).phone);
  const location = sanitize((body as Record<string, unknown>).location);
  const service = sanitize((body as Record<string, unknown>).service);
  const projectType = sanitize((body as Record<string, unknown>).projectType);
  const details = sanitize((body as Record<string, unknown>).details);

  if (!name || !email || !details) {
    return res.status(400).setHeader("Access-Control-Allow-Origin", CORS_HEADERS["Access-Control-Allow-Origin"]).json({
      error: "Name, email, and project details are required",
    });
  }

  const text = [
    "New project enquiry from GreenWebsite",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "N/A"}`,
    `Phone: ${phone || "N/A"}`,
    `Location: ${location || "N/A"}`,
    `Service: ${service || "N/A"}`,
    `Project Type: ${projectType || "N/A"}`,
    "",
    "Project details:",
    details,
  ].join("\n");

  const html = `
    <h2>New project enquiry from GreenWebsite</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company || "N/A")}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "N/A")}</p>
    <p><strong>Location:</strong> ${escapeHtml(location || "N/A")}</p>
    <p><strong>Service:</strong> ${escapeHtml(service || "N/A")}</p>
    <p><strong>Project Type:</strong> ${escapeHtml(projectType || "N/A")}</p>
    <p><strong>Project details:</strong></p>
    <p>${escapeHtml(details).replace(/\n/g, "<br />")}</p>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: fromEmail,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New enquiry: ${name}`,
      text,
      html,
    });

    return res.status(200).setHeader("Access-Control-Allow-Origin", CORS_HEADERS["Access-Control-Allow-Origin"]).json({
      success: true,
      message: "Enquiry sent successfully",
    });
  } catch (error) {
    return res.status(500).setHeader("Access-Control-Allow-Origin", CORS_HEADERS["Access-Control-Allow-Origin"]).json({
      error: "Unexpected server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
