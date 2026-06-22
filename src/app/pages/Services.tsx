import { FormEvent, useState } from "react";
import { ArrowRight, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";

type ServiceItem = {
  name: string;
  category: string;
  description: string;
  feeRange: string;
};

type EnquiryForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  projectType: string;
  details: string;
};

const SERVICES: ServiceItem[] = [
  {
    name: "SAP Calculations",
    category: "Energy & Sustainability",
    description: "Dwelling energy assessments and compliance outputs for planning and Part L submissions.",
    feeRange: "From GBP 180",
  },
  {
    name: "SBEM Modelling",
    category: "Energy & Sustainability",
    description: "Non-domestic building energy modelling to demonstrate carbon and compliance performance.",
    feeRange: "From GBP 450",
  },
  {
    name: "EPC Certificates",
    category: "Energy & Sustainability",
    description: "Energy Performance Certificates for sales, lettings, and compliance documentation.",
    feeRange: "From GBP 120",
  },
  {
    name: "Part L Compliance",
    category: "Energy & Sustainability",
    description: "Regulatory calculations and reports to satisfy Approved Document L obligations.",
    feeRange: "From GBP 280",
  },
  {
    name: "BREEAM Assessments",
    category: "Energy & Sustainability",
    description: "Assessor-led strategy and evidence coordination to achieve targeted BREEAM ratings.",
    feeRange: "From GBP 1,250",
  },
  {
    name: "Air Quality Assessments",
    category: "Environmental Consultancy",
    description: "Technical assessment and mitigation advice aligned to local planning policy.",
    feeRange: "From GBP 950",
  },
  {
    name: "Noise Impact Assessments",
    category: "Environmental Consultancy",
    description: "Site-specific acoustic studies for planning submissions and design decisions.",
    feeRange: "From GBP 850",
  },
  {
    name: "Flood Risk Assessments",
    category: "Environmental Consultancy",
    description: "Flood risk analysis with drainage and mitigation recommendations for planning.",
    feeRange: "From GBP 950",
  },
  {
    name: "Biodiversity Net Gain (BNG)",
    category: "Environmental Consultancy",
    description: "Baseline habitat and uplift strategy to support BNG obligations and approvals.",
    feeRange: "From GBP 1,450",
  },
  {
    name: "Ecology Surveys",
    category: "Environmental Consultancy",
    description: "Ecological appraisal and protected species surveys for planning-stage due diligence.",
    feeRange: "From GBP 790",
  },
  {
    name: "Fire Risk Assessments",
    category: "Fire & Building Safety",
    description: "Risk-led fire safety review for occupied buildings and dutyholder compliance.",
    feeRange: "From GBP 350",
  },
  {
    name: "Fire Strategy Reports",
    category: "Fire & Building Safety",
    description: "Comprehensive fire design strategy for planning, building control, and sign-off.",
    feeRange: "From GBP 1,250",
  },
  {
    name: "Part B Compliance Support",
    category: "Fire & Building Safety",
    description: "Targeted technical support to address fire safety provisions under Approved Document B.",
    feeRange: "From GBP 650",
  },
  {
    name: "Building Regulations Consultancy",
    category: "Compliance & Regulations",
    description: "Multi-discipline building regulations guidance across design and pre-construction stages.",
    feeRange: "From GBP 550",
  },
  {
    name: "Airtightness Testing",
    category: "Testing & Certification",
    description: "On-site air permeability testing with certificates accepted for compliance submission.",
    feeRange: "From GBP 220",
  },
  {
    name: "Sound Testing",
    category: "Testing & Certification",
    description: "Pre-completion acoustic testing for separating elements and compliance reports.",
    feeRange: "From GBP 300",
  },
  {
    name: "Asbestos Surveys",
    category: "Testing & Certification",
    description: "Management and refurbishment surveys with actionable risk findings.",
    feeRange: "From GBP 240",
  },
  {
    name: "TM44 Inspections",
    category: "Testing & Certification",
    description: "Air conditioning energy inspections with TM44 certification reports.",
    feeRange: "From GBP 180",
  },
];

const PROJECT_TYPES = [
  "Residential",
  "Commercial",
  "Industrial",
  "Mixed Use",
  "Healthcare",
  "Education",
  "Other",
];

const SERVICE_OPTIONS = SERVICES.map((s) => s.name);

const INITIAL_FORM: EnquiryForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  location: "",
  service: "",
  projectType: "",
  details: "",
};

export function Services() {
  const [form, setForm] = useState<EnquiryForm>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState("");

  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const requestExactPrice = (serviceName: string) => {
    setForm((prev) => ({
      ...prev,
      service: serviceName,
      details: prev.details || `I would like an exact quote for ${serviceName}.`,
    }));
    document.getElementById("service-enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage("");
    setFormError("");

    if (!form.name || !form.email || !form.details) {
      setFormError("Please complete name, email, and project details.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setFormError(payload.error || "Unable to send right now. Please try again shortly.");
        return;
      }

      setFormMessage(payload.message || "Your enquiry has been sent successfully.");
      setForm(INITIAL_FORM);
    } catch {
      setFormError("Network issue while sending. Please check your connection and retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="perf-section border-y border-[var(--line)] bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-600)]">Our Service Portfolio</p>
            <h1 className="mt-3 font-['Plus_Jakarta_Sans'] text-4xl font-extrabold tracking-tight sm:text-5xl">
              Complete Service List With Pricing
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ink-600)]">
              All services with typical fee ranges based on project scope and complexity. Click "Get Exact Price" below any service to receive a personalized quote.
            </p>
          </div>

          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Typical fee ranges are indicative and depend on project size, complexity, location, and programme.
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {SERVICES.map((service) => (
              <AccordionItem
                key={service.name}
                value={service.name}
                className="rounded-2xl border border-[var(--line)] bg-[var(--card-soft)] px-5"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex w-full flex-col items-start gap-2 pr-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[var(--ink-900)]">{service.name}</p>
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ink-500)]">
                        {service.category}
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                      {service.feeRange}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm leading-relaxed text-[var(--ink-600)]">{service.description}</p>
                  <button
                    onClick={() => requestExactPrice(service.name)}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--ink-900)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--ink-900)] hover:text-white"
                  >
                    Get Exact Price
                    <ArrowRight size={14} />
                  </button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="service-enquiry" className="perf-section border-t border-[var(--line)] bg-[var(--bg-canvas)] py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <aside>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-600)]">Enquiry Form</p>
            <h2 className="mt-3 font-['Plus_Jakarta_Sans'] text-3xl font-extrabold tracking-tight text-[var(--ink-900)] sm:text-4xl">
              Get A Service Quote
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--ink-600)] sm:text-base">
              Tell us about your project and which services you need. We'll provide an initial assessment and next steps.
            </p>

            <div className="mt-8 space-y-4 text-sm text-[var(--ink-700)]">
              <p className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--brand-600)]" /> developmentsohaib@gmail.com
              </p>
              <p className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--brand-600)]" /> +44 7700 900 000
              </p>
              <p className="flex items-center gap-3">
                <MapPin size={16} className="text-[var(--brand-600)]" /> United Kingdom - Nationwide
              </p>
            </div>
          </aside>

          <form onSubmit={submitEnquiry} className="glass-card space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="field-wrap">
                <span>Full Name *</span>
                <input name="name" value={form.name} onChange={updateField} placeholder="Your full name" required />
              </label>
              <label className="field-wrap">
                <span>Company</span>
                <input name="company" value={form.company} onChange={updateField} placeholder="Your company" />
              </label>
              <label className="field-wrap">
                <span>Email *</span>
                <input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@company.com" required />
              </label>
              <label className="field-wrap">
                <span>Phone</span>
                <input name="phone" value={form.phone} onChange={updateField} placeholder="+44..." />
              </label>
              <label className="field-wrap sm:col-span-2">
                <span>Project Location</span>
                <input name="location" value={form.location} onChange={updateField} placeholder="City, region" />
              </label>
              <label className="field-wrap">
                <span>Service</span>
                <select name="service" value={form.service} onChange={updateField}>
                  <option value="">Select service</option>
                  {SERVICE_OPTIONS.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field-wrap">
                <span>Project Type</span>
                <select name="projectType" value={form.projectType} onChange={updateField}>
                  <option value="">Select type</option>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field-wrap sm:col-span-2">
                <span>Project Details *</span>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={updateField}
                  placeholder="Tell us what stage your project is at and what support you need."
                  rows={5}
                  required
                />
              </label>
            </div>

            {formMessage && <p className="rounded-lg bg-emerald-100 px-4 py-3 text-sm text-emerald-800">{formMessage}</p>}
            {formError && <p className="rounded-lg bg-rose-100 px-4 py-3 text-sm text-rose-700">{formError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--ink-900)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Enquiry"}
              {!isSubmitting && <ArrowRight size={15} />}
            </button>
          </form>
        </div>
      </section>

      <footer className="perf-section border-t border-[#1f2d28] bg-[#07140f] py-14 text-slate-300 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-500/40 bg-[#0c1d17] text-emerald-400">
                  <Sparkles size={14} />
                </span>
                <p className="font-['Plus_Jakarta_Sans'] text-lg font-extrabold text-white">APEX</p>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-slate-400">
                UK-based specialist consultancy providing environmental, sustainability, fire safety,
                and building compliance services nationwide.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white">Services</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {[
                  "Energy & Sustainability",
                  "Environmental Consultancy",
                  "Fire Engineering & Safety",
                  "Compliance & Building Regulations",
                  "Testing & Certification",
                ].map((service) => (
                  <li key={service}>
                    <a href="#" className="transition hover:text-emerald-300">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white">Navigation</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <a href="/" className="transition hover:text-emerald-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/services" className="transition hover:text-emerald-300">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/#sectors" className="transition hover:text-emerald-300">
                    Sectors
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2.5">
                  <Mail size={14} className="mt-0.5 text-emerald-400" />
                  <span>developmentsohaib@gmail.com</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone size={14} className="mt-0.5 text-emerald-400" />
                  <span>+44 7700 900 000</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin size={14} className="mt-0.5 text-emerald-400" />
                  <span>United Kingdom - Nationwide</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-[#1f2d28] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Apex Built Environment Consultancy Ltd. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#" className="transition hover:text-slate-300">
                Privacy Policy
              </a>
              <a href="#" className="transition hover:text-slate-300">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
