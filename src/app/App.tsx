import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

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

const NAV_LINKS = [
  { label: "Expertise", href: "#expertise" },
  { label: "Services", href: "#services" },
  { label: "Sectors", href: "#sectors" },
  { label: "Why Us", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

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

const SERVICES = [
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
    items: [
      "Flood Risk Assessments",
      "BNG Assessments",
      "Ecology Surveys",
      "Air Quality Assessments",
    ],
  },
  {
    title: "Fire Engineering & Safety",
    description: "Clear pathways for life safety design and fire-related regulatory approvals.",
    icon: ShieldCheck,
    items: [
      "Fire Strategy Reports",
      "Part B Compliance",
      "Means of Escape Analysis",
      "Smoke Ventilation Advice",
    ],
  },
  {
    title: "Compliance & Building Regulations",
    description: "Targeted compliance support to reduce approval risk and keep submissions technically robust.",
    icon: CheckCircle2,
    items: [
      "Planning Compliance",
      "Part B, E, F and O Support",
      "Building Regulations Strategy",
      "Technical Submission Reviews",
    ],
  },
  {
    title: "Testing & Certification",
    description: "Verification services and certification outputs that support sign-off confidence.",
    icon: Building2,
    items: [
      "Airtightness Testing",
      "Sound Testing",
      "TM44 Inspections",
      "Compliance Certification",
    ],
  },
  {
    title: "Need Guidance?",
    description:
      "Not every development requires the same assessments or compliance pathway. Our consultants can review your project and identify the reports and approvals required.",
    icon: Sparkles,
    items: [
      "Early Project Triage",
      "Assessment Roadmap",
      "Approval Strategy",
      "Single Point Advice",
    ],
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
  "Residential",
  "Commercial",
  "Industrial",
  "Mixed Use",
  "Healthcare",
  "Education",
  "Other",
];

const SERVICE_OPTIONS = [
  "Energy & Sustainability",
  "Environmental Consultancy",
  "Fire Engineering & Safety",
  "Compliance & Building Regulations",
  "Testing & Certification",
  "Need Guidance",
  "Multiple Services",
];

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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <div className="site-shell bg-[var(--bg-canvas)] text-[var(--ink-900)] min-h-screen overflow-x-hidden">
      <div className="ambient-layer" aria-hidden="true" />

      <header className="sticky top-0 z-50 border-b border-white/50 bg-[#f6fbf8]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Apex Green home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--ink-900)] text-white">
              <Sparkles size={16} />
            </span>
            <div>
              <p className="font-['Plus_Jakarta_Sans'] text-base font-extrabold tracking-tight">Apex Green</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--ink-500)]">Consultancy</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-semibold text-[var(--ink-600)] transition hover:text-[var(--ink-900)]">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden rounded-xl bg-[var(--brand-500)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(22,163,74,0.35)] transition hover:translate-y-[-1px] hover:bg-[var(--brand-600)] md:inline-flex"
          >
            Start a Project
          </a>

          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-[var(--ink-800)] md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/50 bg-[#f6fbf8] px-4 py-4 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-[var(--ink-700)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 inline-flex w-fit rounded-lg bg-[var(--brand-500)] px-4 py-2 text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Start a Project
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="top" className="snap-flow">
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
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--ink-900)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-black"
                >
                  Discuss Your Project <ArrowRight size={15} />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--line)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--brand-500)]"
                >
                  Explore Services
                </a>
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
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-600)]">Service Portfolio</p>
                <h2 className="mt-3 font-['Plus_Jakarta_Sans'] text-3xl font-extrabold tracking-tight sm:text-4xl">Everything Needed To De-Risk Delivery</h2>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="group snap-card rounded-2xl border border-[var(--line)] bg-[var(--card-soft)] p-6 hover:border-emerald-300"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="mb-5 inline-flex rounded-xl bg-white p-3 text-[var(--brand-600)] shadow-sm">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[var(--ink-900)]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-600)]">{item.description}</p>
                    <ul className="mt-4 space-y-2">
                      {item.items.map((serviceLine) => (
                        <li key={serviceLine} className="flex items-center gap-2 text-sm text-[var(--ink-700)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {serviceLine}
                        </li>
                      ))}
                    </ul>
                    {item.title === "Need Guidance?" && (
                      <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-600)]">
                        Discuss Your Project <ArrowRight size={14} />
                      </a>
                    )}
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
                <article key={sector.title} className="sector-card snap-card overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
                  <div className="sector-image-wrap aspect-[16/10] overflow-hidden">
                    <img src={sector.image} alt={sector.title} className="sector-media h-full w-full object-cover" loading="lazy" />
                    <div className="sector-image-overlay" aria-hidden="true" />
                    <p className="sector-compliance">{sector.compliance}</p>
                  </div>
                  <div className="p-5">
                    <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[var(--ink-900)]">{sector.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-600)]">{sector.description}</p>
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
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-600)]">Contact</p>
              <h2 className="mt-3 font-['Plus_Jakarta_Sans'] text-3xl font-extrabold tracking-tight text-[var(--ink-900)] sm:text-4xl">
                Start A Project Conversation
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-600)] sm:text-base">
                Fill in your requirements and we will deliver an initial response with next-step guidance.
              </p>

              <div className="mt-8 space-y-4 text-sm text-[var(--ink-700)]">
                <p className="flex items-center gap-3">
                  <Mail size={16} className="text-[var(--brand-600)]" /> sohaibmayo12@gmail.com
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
      </main>
    </div>
  );
}
