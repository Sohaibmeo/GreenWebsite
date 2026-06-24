import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Mail, MapPin, Phone, Sparkles, X } from "lucide-react";
import { useLocation } from "react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

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
    category: "Energy & Sustainability Services",
    description: "Dwelling energy assessments and compliance outputs for planning and Part L submissions.",
    feeRange: "GBP 150 - 350",
  },
  {
    name: "EPC Certificates",
    category: "Energy & Sustainability Services",
    description: "Energy Performance Certificate for domestic properties and compliance documentation.",
    feeRange: "GBP 60 - 150",
  },
  {
    name: "Part L Compliance Package",
    category: "Energy & Sustainability Services",
    description: "Combined modelling, documentation, and compliance package for Part L submissions.",
    feeRange: "GBP 500 - 2,000",
  },
  {
    name: "Overheating Assessments (TM52/TM59)",
    category: "Energy & Sustainability Services",
    description: "Overheating risk assessment using TM52 and TM59 methodologies, including dynamic simulation where required.",
    feeRange: "GBP 750 - 2,500",
  },
  {
    name: "U-Value Calculations",
    category: "Energy & Sustainability Services",
    description: "Element-level thermal transmittance calculations for fabric compliance checks.",
    feeRange: "GBP 50 - 250",
  },
  {
    name: "SBEM Calculations",
    category: "Energy & Sustainability Services",
    description: "Commercial building energy model for Part L2 non-domestic compliance.",
    feeRange: "GBP 750 - 5,000+",
  },
  {
    name: "BRUKL Reports",
    category: "Energy & Sustainability Services",
    description: "BRUKL outputs and compliance reports for commercial energy assessments.",
    feeRange: "GBP 500 - 3,500+",
  },
  {
    name: "Thermal Modelling",
    category: "Energy & Sustainability Services",
    description: "Dynamic thermal simulation modelling for comfort, overheating, and energy optimization.",
    feeRange: "GBP 3,000 - 25,000+",
  },
  {
    name: "BREEAM Assessments",
    category: "Energy & Sustainability Services",
    description: "Assessor-led strategy, credits management, and evidence coordination.",
    feeRange: "GBP 5,000 - 50,000+",
  },
  {
    name: "Net Zero Carbon Consultancy",
    category: "Energy & Sustainability Services",
    description: "Net zero pathway planning including fabric, systems, renewables, and offset strategy.",
    feeRange: "GBP 10,000 - 100,000+",
  },
  {
    name: "Renewable Energy Assessments",
    category: "Energy & Sustainability Services",
    description: "Renewables feasibility and system integration assessment for planning and operational performance.",
    feeRange: "GBP 1,500 - 20,000+",
  },
  {
    name: "Energy Statements",
    category: "Energy & Sustainability Services",
    description: "Policy-aligned energy statements for planning submissions and local authority requirements.",
    feeRange: "GBP 1,000 - 8,000+",
  },
  {
    name: "Sustainability Statements",
    category: "Energy & Sustainability Services",
    description: "Planning-stage sustainability narrative aligned to local policy and development targets.",
    feeRange: "GBP 2,000 - 15,000+",
  },
  {
    name: "Air Quality Assessments",
    category: "Environmental Consultancy",
    description: "Planning-stage air quality modelling and mitigation strategy.",
    feeRange: "GBP 1,000 - 10,000+",
  },
  {
    name: "Noise Impact Assessments",
    category: "Environmental Consultancy",
    description: "BS4142 and planning-focused acoustic impact studies.",
    feeRange: "GBP 1,000 - 8,000",
  },
  {
    name: "Acoustic Testing",
    category: "Environmental Consultancy",
    description: "On-site acoustic testing for residential and commercial compliance requirements.",
    feeRange: "GBP 300 - 3,000",
  },
  {
    name: "Flood Risk Assessments",
    category: "Environmental Consultancy",
    description: "Flood risk analysis with planning-ready mitigation recommendations.",
    feeRange: "GBP 750 - 7,500+",
  },
  {
    name: "Drainage Strategy Reports",
    category: "Environmental Consultancy",
    description: "Surface water strategy and SuDS reporting for planning support.",
    feeRange: "GBP 1,500 - 10,000+",
  },
  {
    name: "Environmental Impact Assessments (EIA)",
    category: "Environmental Consultancy",
    description: "Full multidisciplinary EIA coordination and reporting for major schemes.",
    feeRange: "GBP 10,000 - 250,000+",
  },
  {
    name: "Contaminated Land Reports",
    category: "Environmental Consultancy",
    description: "Phase 1 and Phase 2 land contamination assessments and risk reporting.",
    feeRange: "GBP 1,000 - 15,000+",
  },
  {
    name: "Ecology Surveys",
    category: "Environmental Consultancy",
    description: "Ecological appraisal and protected species survey packages.",
    feeRange: "GBP 500 - 15,000+",
  },
  {
    name: "Biodiversity Net Gain (BNG)",
    category: "Environmental Consultancy",
    description: "Habitat baseline, uplift calculations, and management planning for BNG.",
    feeRange: "GBP 1,500 - 20,000+",
  },
  {
    name: "Arboricultural Surveys",
    category: "Environmental Consultancy",
    description: "BS5837 tree surveys and arboricultural planning support.",
    feeRange: "GBP 350 - 5,000",
  },
  {
    name: "Waste Management Plans",
    category: "Environmental Consultancy",
    description: "Construction and operational waste strategy reports.",
    feeRange: "GBP 500 - 5,000",
  },
  {
    name: "Fire Risk Assessments",
    category: "Fire & Building Safety",
    description: "Risk-led fire safety review for occupied buildings and dutyholder compliance.",
    feeRange: "GBP 250 - 5,000+",
  },
  {
    name: "Fire Strategy Reports",
    category: "Fire & Building Safety",
    description: "Comprehensive fire design strategy for planning, building control, and sign-off.",
    feeRange: "GBP 1,500 - 15,000+",
  },
  {
    name: "Fire Engineering",
    category: "Fire & Building Safety",
    description: "Performance-based fire engineering and advanced modelling support.",
    feeRange: "GBP 3,000 - 50,000+",
  },
  {
    name: "Fire Compartmentation Surveys",
    category: "Fire & Building Safety",
    description: "Compartmentation integrity surveys with intrusive inspection where needed.",
    feeRange: "GBP 750 - 10,000+",
  },
  {
    name: "EWS1 Assessments",
    category: "Fire & Building Safety",
    description: "External wall fire risk review and EWS1 support for residential blocks.",
    feeRange: "GBP 5,000 - 30,000+",
  },
  {
    name: "Smoke Ventilation Design",
    category: "Fire & Building Safety",
    description: "Smoke control strategy and ventilation design including complex modelling.",
    feeRange: "GBP 1,500 - 12,000+",
  },
  {
    name: "Means of Escape Analysis",
    category: "Fire & Building Safety",
    description: "Occupancy and evacuation strategy analysis for compliance and safety.",
    feeRange: "GBP 750 - 7,500",
  },
  {
    name: "Passive Fire Protection",
    category: "Fire & Building Safety",
    description: "Passive fire protection survey, specification, and compliance inspections.",
    feeRange: "GBP 500 - 20,000+",
  },
  {
    name: "Fire Door Inspections",
    category: "Fire & Building Safety",
    description: "Door-by-door inspections and remediation recommendations for portfolios and single assets.",
    feeRange: "GBP 15 - 80 per door",
  },
  {
    name: "Building Regulations Consultancy",
    category: "Compliance & Regulations",
    description: "End-to-end building regulations advisory support from design through completion.",
    feeRange: "GBP 1,500 - 10,000+",
  },
  {
    name: "Part B Compliance",
    category: "Compliance & Regulations",
    description: "Fire compliance support aligned to Approved Document B.",
    feeRange: "GBP 750 - 5,000",
  },
  {
    name: "Part E Acoustic Compliance",
    category: "Compliance & Regulations",
    description: "Acoustic design, testing coordination, and compliance reporting.",
    feeRange: "GBP 500 - 3,500",
  },
  {
    name: "Part F Ventilation Compliance",
    category: "Compliance & Regulations",
    description: "Ventilation strategy and calculations for regulatory sign-off.",
    feeRange: "GBP 400 - 2,500",
  },
  {
    name: "Part O Overheating Compliance",
    category: "Compliance & Regulations",
    description: "Overheating compliance studies including dynamic thermal modelling when needed.",
    feeRange: "GBP 750 - 4,000",
  },
  {
    name: "Planning Compliance Reports",
    category: "Compliance & Regulations",
    description: "Planning compliance documentation and supporting statements.",
    feeRange: "GBP 500 - 3,000",
  },
  {
    name: "Building Control Support",
    category: "Compliance & Regulations",
    description: "Coordination and liaison with approved inspectors and building control bodies.",
    feeRange: "GBP 750 - 5,000",
  },
  {
    name: "Technical Due Diligence",
    category: "Compliance & Regulations",
    description: "Acquisition and development due diligence review for technical and compliance risk.",
    feeRange: "GBP 2,000 - 20,000+",
  },
  {
    name: "Construction Compliance Monitoring",
    category: "Compliance & Regulations",
    description: "Inspection-led compliance monitoring during construction and handover stages.",
    feeRange: "GBP 1,000 - 15,000+",
  },
  {
    name: "Airtightness Testing",
    category: "Testing & Certification",
    description: "On-site air permeability testing with certification accepted for compliance submission.",
    feeRange: "GBP 200 - 800",
  },
  {
    name: "Sound Insulation Testing",
    category: "Testing & Certification",
    description: "Pre-completion acoustic testing for separating elements and regulatory compliance.",
    feeRange: "GBP 300 - 1,500",
  },
  {
    name: "Thermographic Surveys",
    category: "Testing & Certification",
    description: "Thermal imaging inspections for heat defects and building performance diagnostics.",
    feeRange: "GBP 250 - 2,500",
  },
  {
    name: "Heat Loss Surveys",
    category: "Testing & Certification",
    description: "Heat loss identification and performance analysis for retrofit or new-build checks.",
    feeRange: "GBP 250 - 1,500",
  },
  {
    name: "Indoor Air Quality Testing",
    category: "Testing & Certification",
    description: "IAQ testing covering VOCs, particulates, CO2, and indoor environmental indicators.",
    feeRange: "GBP 300 - 3,000",
  },
  {
    name: "TM44 Air Conditioning Inspections",
    category: "Testing & Certification",
    description: "TM44 inspections for air-conditioning systems with certification reports.",
    feeRange: "GBP 200 - 1,200",
  },
  {
    name: "Legionella Risk Assessments",
    category: "Testing & Certification",
    description: "Water-system Legionella risk assessment for domestic and commercial premises.",
    feeRange: "GBP 150 - 2,500",
  },
  {
    name: "Asbestos Surveys",
    category: "Testing & Certification",
    description: "Management, refurbishment, and demolition survey services with compliant reporting.",
    feeRange: "GBP 195 - 2,000+",
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

const CATEGORY_ANCHORS: Record<string, string> = {
  "Energy & Sustainability Services": "energy-sustainability",
  "Environmental Consultancy": "environmental-consultancy",
  "Fire & Building Safety": "fire-building-safety",
  "Compliance & Regulations": "compliance-building-regulations",
  "Testing & Certification": "testing-certification",
};

const toAnchor = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

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
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchFromNav = params.get("search") || "";
    setSearchQuery(searchFromNav);
  }, [location.search]);

  const filteredServices = SERVICES.filter((service) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return true;
    }

    return (
      service.name.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query)
    );
  });

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

          <div className="mb-6">
            <label className="field-wrap">
              <span>Search Services</span>
              <div className="relative">
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Type a service, category, or keyword"
                  className="pr-10"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[var(--ink-500)] transition hover:bg-[var(--card-soft)] hover:text-[var(--ink-900)]"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </label>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {filteredServices.map((service, index) => {
              const isFirstInCategory =
                filteredServices.findIndex((item) => item.category === service.category) === index;

              return (
                <div key={service.name}>
                  {isFirstInCategory && (
                    <div id={CATEGORY_ANCHORS[service.category]} className="scroll-mt-24 pb-2 pt-1">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--brand-600)]">
                        {service.category}
                      </p>
                    </div>
                  )}

                  <AccordionItem
                    id={toAnchor(service.name)}
                    value={service.name}
                    className="scroll-mt-24 rounded-2xl border border-[var(--line)] bg-[var(--card-soft)] px-5"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex w-full flex-col items-start gap-2 pr-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[var(--ink-900)]">{service.name}</p>
                          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ink-500)]">
                            {service.category}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <div className="mb-3">
                        <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                          {service.feeRange}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--ink-600)]">{service.description}</p>
                      <button
                        onClick={() => requestExactPrice(service.name)}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--ink-900)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-900)] transition hover:border-[var(--brand-dark)] hover:bg-[var(--brand-dark)] hover:text-white"
                      >
                        Get Exact Price
                        <ArrowRight size={14} />
                      </button>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              );
            })}
          </Accordion>

          {filteredServices.length === 0 && (
            <p className="mt-4 rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink-600)]">
              No services match your search. Try another keyword.
            </p>
          )}
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--ink-900)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-dark)] disabled:cursor-not-allowed disabled:opacity-60"
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
                <p className="font-['Plus_Jakarta_Sans'] text-lg font-extrabold text-white">Apex Consultancy</p>
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
