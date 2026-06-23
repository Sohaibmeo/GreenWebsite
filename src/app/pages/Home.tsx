import { FormEvent, useState } from "react";
import { ArrowRight, Building2, ChartNoAxesCombined, CheckCircle2, Leaf, Linkedin, Mail, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router";

const REGULATORY_BADGES = [
  "Approved Document L",
  "Approved Document O",
  "Part B",
  "Part E",
  "Part F",
  "BREEAM",
  "BNG",
  "TM52",
  "TM59",
  "BS5837",
];

const CORE_COMPETENCIES = [
  "Planning Support",
  "Sustainability",
  "Fire Engineering",
  "Certification",
];

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

const SERVICE_CATEGORIES = [
  {
    title: "Energy & Sustainability",
    description: "Performance-led modelling and compliance strategy for planning and building control.",
    icon: ChartNoAxesCombined,
    items: ["SAP Calculations", "SBEM Modelling", "EPC Certificates", "Part L Compliance"],
  },
  {
    title: "Environmental Consultancy",
    description: "Technical assessments aligned to local authority and planning requirements.",
    icon: Leaf,
    items: ["Flood Risk Assessments", "BNG Assessments", "Ecology Surveys", "Air Quality Assessments"],
  },
  {
    title: "Fire Engineering & Safety",
    description: "Clear pathways for life safety design and fire-related regulatory approvals.",
    icon: ShieldCheck,
    items: ["Fire Strategy Reports", "Part B Compliance", "Means of Escape Analysis", "Smoke Ventilation Advice"],
  },
  {
    title: "Compliance & Building Regulations",
    description: "Targeted compliance support to reduce approval risk and keep submissions technically robust.",
    icon: CheckCircle2,
    items: ["Planning Compliance", "Part B, E, F and O Support", "Building Regulations Strategy", "Technical Submission Reviews"],
  },
  {
    title: "Testing & Certification",
    description: "Verification services and certification outputs that support sign-off confidence.",
    icon: Building2,
    items: ["Airtightness Testing", "Sound Testing", "TM44 Inspections", "Compliance Certification"],
  },
  {
    title: "Need Guidance?",
    description: "Not every development requires the same assessments or compliance pathway. Our consultants can review your project and identify the reports and approvals required.",
    icon: Sparkles,
    items: ["Early Project Triage", "Assessment Roadmap", "Approval Strategy", "Single Point Advice"],
  },
];

const SECTORS = [
  {
    title: "Residential Developments",
    description: "Homes, apartments, and mixed-tenure projects needing planning and regulatory confidence.",
    compliance: "SAP · PART L · BREEAM · FIRE SAFETY",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=640&h=420&fit=crop&auto=format",
  },
  {
    title: "Commercial Offices",
    description: "New and refurbished office schemes requiring sustainability and building compliance support.",
    compliance: "SBEM · BREEAM · EPC · PART B",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=640&h=420&fit=crop&auto=format",
  },
  {
    title: "Industrial Facilities",
    description: "Warehouse and manufacturing developments with specialist environmental and fire considerations.",
    compliance: "PART F · AIR QUALITY · FLOOD RISK",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=640&h=420&fit=crop&auto=format",
  },
  {
    title: "Healthcare",
    description: "Clinical and care environments requiring robust technical and life safety compliance pathways.",
    compliance: "HTM · FIRE ENGINEERING · TM52",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=640&h=420&fit=crop&auto=format",
  },
  {
    title: "Education",
    description: "Schools and campus buildings with strong requirements around comfort, safety, and efficiency.",
    compliance: "BB101 · BREEAM EDU · ACOUSTICS",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=640&h=420&fit=crop&auto=format",
  },
  {
    title: "Hospitality",
    description: "Hotels and leisure spaces balancing guest comfort, energy use, and regulatory obligations.",
    compliance: "FIRE SAFETY · ENERGY · BREEAM",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=640&h=420&fit=crop&auto=format",
  },
  {
    title: "Retail & Mixed Use",
    description: "Retail-led and mixed-use schemes requiring integrated planning, compliance, and fire support.",
    compliance: "FIRE STRATEGY · BREEAM · PART O",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=640&h=420&fit=crop&auto=format",
  },
  {
    title: "Infrastructure",
    description: "Public and strategic infrastructure projects with multi-disciplinary technical requirements.",
    compliance: "EIA · BNG · DRAINAGE · ECOLOGY",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=640&h=420&fit=crop&auto=format",
  },
];

const PROJECT_TYPES = [
  ...SECTORS.map((sector) => sector.title),
  "Other",
];

const SERVICE_OPTIONS = Array.from(
  new Set(SERVICE_CATEGORIES.flatMap((category) => [category.title, ...category.items]))
);

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

export function Home() {
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

  const focusContactForm = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectService = (serviceName: string, context?: string) => {
    setForm((prev) => ({
      ...prev,
      service: serviceName,
      details: prev.details || `I need support with ${context || serviceName}.`,
    }));
    focusContactForm();
  };

  const selectSector = (sectorName: string) => {
    setForm((prev) => ({
      ...prev,
      projectType: sectorName,
      details: prev.details || `My project is in the ${sectorName} sector and I need consultancy support.`,
    }));
    focusContactForm();
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
      <section className="relative perf-section">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 pb-16 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-14 lg:px-8 lg:pb-20">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-600)]">
              Premium Compliance and Sustainability Partner
            </p>
            <h1 className="font-['Plus_Jakarta_Sans'] text-4xl font-extrabold leading-[1.02] tracking-tight text-[var(--ink-900)] sm:text-5xl lg:text-6xl">
              Modern Technical Consultancy That Converts Projects Into Approvals.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-600)] sm:text-lg">
              We help developers, architects, and contractors secure planning confidence and
              regulatory certainty with fast, precise, multi-disciplinary reporting.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--ink-900)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-black"
              >
                Check Full List of Services <ArrowRight size={15} />
              </Link>
              <button
                type="button"
                onClick={focusContactForm}
                className="inline-flex items-center justify-center rounded-xl border border-[var(--line)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--brand-500)]"
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className="glass-card">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ink-500)]">
              Core Competencies
            </p>
            <div className="grid grid-cols-2 gap-3">
              {CORE_COMPETENCIES.map((item) => (
                <div key={item} className="rounded-xl border border-[var(--line)] bg-white/80 p-4">
                  <p className="font-['Plus_Jakarta_Sans'] text-base font-extrabold text-[var(--ink-900)]">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              End-to-end support across planning, Part L, fire strategy, and sustainability certifications.
            </div>
          </div>
        </div>
      </section>

      <section id="expertise" className="perf-section border-y border-[var(--line)] bg-[#0f1f1a] py-10 sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300">Regulatory Expertise</p>
          <div className="flex flex-wrap gap-2.5">
            {REGULATORY_BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-md border border-emerald-400/35 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-100"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="perf-section border-y border-[var(--line)] bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-600)]">Service Portfolio</p>
            <h1 className="mt-3 font-['Plus_Jakarta_Sans'] text-4xl font-extrabold tracking-tight sm:text-5xl">
              Everything Needed To De-Risk Delivery
            </h1>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CATEGORIES.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === SERVICE_CATEGORIES.length - 1;
              return (
                <article
                  key={item.title}
                  className="group snap-card flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--card-soft)] p-6 hover:border-emerald-300"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="mb-5 inline-flex rounded-xl bg-white p-3 text-[var(--brand-600)] shadow-sm">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[var(--ink-900)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-600)]">{item.description}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {item.items.map((serviceLine) => (
                      <li key={serviceLine}>
                        <button
                          type="button"
                          onClick={() => selectService(serviceLine, item.title)}
                          className="flex items-center gap-2 text-sm text-[var(--ink-700)] transition hover:text-[var(--brand-600)]"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {serviceLine}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-6 flex flex-col gap-3 ${isLast ? "sm:flex-row" : ""}`}>
                    <button
                      type="button"
                      onClick={() => selectService(item.title, item.title)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--ink-900)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--ink-900)] hover:text-white"
                    >
                      Discuss Your Project
                    </button>
                    {isLast && (
                      <Link
                        to="/services"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand-500)] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(22,163,74,0.35)] transition hover:translate-y-[-1px] hover:bg-[var(--brand-600)] hover:text-white"
                      >
                        View Full List
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="sectors" className="perf-section border-y border-[var(--line)] bg-[var(--bg-canvas)] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-600)]">Sectors We Support</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SECTORS.map((sector) => (
              <article key={sector.title} className="sector-card snap-card flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
                <div className="sector-image-wrap aspect-[16/10] overflow-hidden">
                  <img src={sector.image} alt={sector.title} className="sector-media h-full w-full object-cover" loading="lazy" />
                  <div className="sector-image-overlay" aria-hidden="true" />
                  <p className="sector-compliance">{sector.compliance}</p>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[var(--ink-900)]">{sector.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-600)]">{sector.description}</p>
                  <button
                    type="button"
                    onClick={() => selectSector(sector.title)}
                    className="mt-auto inline-flex h-9 items-center gap-2 self-start rounded-lg border border-[var(--ink-900)] bg-white px-3 text-xs font-semibold text-[var(--ink-900)] transition hover:bg-[var(--ink-900)] hover:text-white"
                  >
                    Select This Sector
                    <ArrowRight size={12} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="perf-section bg-[var(--ink-900)] py-16 text-white sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300">Why Teams Choose Us</p>
            <h2 className="mt-3 font-['Plus_Jakarta_Sans'] text-3xl font-extrabold tracking-tight sm:text-4xl">
              Professional enough to pitch. Practical enough to deliver.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
              Your consultancy presence should feel as premium as your service. This experience is built to improve trust,
              communicate authority fast, and convert high-intent project enquiries.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Clear conversion-focused journey",
              "Executive visual language",
              "Responsive on all breakpoints",
              "Fast and deployment friendly",
            ].map((point) => (
              <div key={point} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <div className="mb-2 inline-flex rounded-full bg-emerald-500/20 p-1.5 text-emerald-300">
                  <CheckCircle2 size={14} />
                </div>
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="perf-section bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-600)]">Project Workflow</p>
          <h2 className="mt-3 font-['Plus_Jakarta_Sans'] text-3xl font-extrabold tracking-tight sm:text-4xl">
            How We Support Your Project
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "1. Initial Consultation",
              "2. Project Scope Review",
              "3. Technical Assessment",
              "4. Report Preparation",
              "5. Submission Support",
              "6. Ongoing Compliance Advice",
            ].map((step) => (
              <div key={step} className="rounded-xl border border-[var(--line)] bg-[var(--card-soft)] p-5 text-sm font-medium text-[var(--ink-700)]">
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="perf-section border-t border-[var(--line)] bg-[var(--bg-canvas)] py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <aside>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-600)]">Enquiry Form</p>
            <h2 className="mt-3 font-['Plus_Jakarta_Sans'] text-3xl font-extrabold tracking-tight text-[var(--ink-900)] sm:text-4xl">
              Get A Service Quote
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--ink-600)] sm:text-base">
              Tell us about your project and which services you need. We will provide an initial assessment and next steps.
            </p>

            <div className="mt-8 space-y-4 text-sm text-[var(--ink-700)]">
              <p className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--brand-600)]" /> ops@excoms.com
              </p>
              <p className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--brand-600)]" /> +44 7519 666004
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
                  {/* Icon placeholder */}
                </span>
                <p className="font-['Plus_Jakarta_Sans'] text-lg font-extrabold text-white">APEX</p>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-slate-400">
                UK-based specialist consultancy providing environmental, sustainability, fire safety,
                and building compliance services nationwide.
              </p>
              <a
                href="#"
                className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-700 bg-[#10231c] text-slate-300 transition hover:border-emerald-500/50 hover:text-emerald-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
            </div>

            <div>
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white">Services</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {[
                  "SAP Calculations",
                  "SBEM Modelling",
                  "BREEAM Assessments",
                  "Fire Strategy Reports",
                  "Building Regulations Consultancy",
                ].map((service) => (
                  <li key={service}>
                    <Link to="/services" className="transition hover:text-emerald-300">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white">Sectors</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {[
                  "Residential Developments",
                  "Commercial Offices",
                  "Industrial Facilities",
                  "Retail & Mixed Use",
                  "Healthcare",
                  "Education",
                  "Infrastructure",
                ].map((sector) => (
                  <li key={sector}>
                    <a href="#sectors" className="transition hover:text-emerald-300">
                      {sector}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2.5">
                  <Mail size={14} className="mt-0.5 text-emerald-400" />
                  <span>ops@excoms.com</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone size={14} className="mt-0.5 text-emerald-400" />
                  <span>+44 7519 666004</span>
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
