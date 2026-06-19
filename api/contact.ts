import type { VercelRequest, VercelResponse } from "@vercel/node";

const RESEND_API_URL = "https://api.resend.com/emails";
const TO_EMAIL = "sohaibmayo12@gmail.com";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function sanitize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    return res.status(204).setHeader("Access-Control-Allow-Origin", CORS_HEADERS["Access-Control-Allow-Origin"]).setHeader("Access-Control-Allow-Methods", CORS_HEADERS["Access-Control-Allow-Methods"]).setHeader("Access-Control-Allow-Headers", CORS_HEADERS["Access-Control-Allow-Headers"]).send("");
  }

  if (req.method !== "POST") {
    return res.status(405).setHeader("Allow", "POST, OPTIONS").json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || "Consultancy Website <onboarding@resend.dev>";

  if (!apiKey) {
    return res.status(500).setHeader("Access-Control-Allow-Origin", CORS_HEADERS["Access-Control-Allow-Origin"]).json({
      error: "Missing RESEND_API_KEY environment variable",
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
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Company:</strong> ${company || "N/A"}</p>
    <p><strong>Phone:</strong> ${phone || "N/A"}</p>
    <p><strong>Location:</strong> ${location || "N/A"}</p>
    <p><strong>Service:</strong> ${service || "N/A"}</p>
    <p><strong>Project Type:</strong> ${projectType || "N/A"}</p>
    <p><strong>Project details:</strong></p>
    <p>${details.replace(/\n/g, "<br />")}</p>
  `;

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New enquiry: ${name}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const resendError = await response.text();
      return res.status(502).setHeader("Access-Control-Allow-Origin", CORS_HEADERS["Access-Control-Allow-Origin"]).json({
        error: "Failed to send email",
        details: resendError,
      });
    }

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
