import { useState } from "react";
import {
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  Linkedin,
  ChevronRight,
  Flame,
  ClipboardCheck,
  Shield,
  BarChart3,
  MapPin,
  Clock,
  Users,
  FlaskConical,
  TreePine,
  Compass,
} from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────

const COMPLIANCE_BADGES = [
  "Approved Document L",
  "Approved Document O",
  "BREEAM",
  "BNG",
  "BS5837",
  "TM52",
  "TM59",
  "Part B",
  "Part E",
  "Part F",
];

const PROCESS_STEPS = [
  "Planning",
  "Design",
  "Assessment",
  "Approval",
  "Construction",
  "Certification",
];

const SERVICE_PILLARS = [
  {
    Icon: BarChart3,
    title: "Energy & Sustainability",
    tag: "01",
    services: [
      "SAP Calculations",
      "SBEM Calculations",
      "EPC Certificates",
      "BRUKL Reports",
      "Part L Compliance",
      "BREEAM Assessments",
      "Net Zero Consultancy",
      "Renewable Energy Assessments",
    ],
  },
  {
    Icon: TreePine,
    title: "Environmental Consultancy",
    tag: "02",
    services: [
      "Air Quality Assessments",
      "Noise Impact Assessments",
      "Flood Risk Assessments",
      "Drainage Strategies",
      "Ecology Surveys",
      "Biodiversity Net Gain",
      "Arboricultural Surveys",
      "Contaminated Land Reports",
    ],
  },
  {
    Icon: Flame,
    title: "Fire & Building Safety",
    tag: "03",
    services: [
      "Fire Risk Assessments",
      "Fire Strategy Reports",
      "Fire Engineering",
      "EWS1 Assessments",
      "Smoke Ventilation Design",
      "Means of Escape Analysis",
      "Fire Door Inspections",
      "Compartmentation Surveys",
    ],
  },
  {
    Icon: ClipboardCheck,
    title: "Compliance & Building Regulations",
    tag: "04",
    services: [
      "Building Regulations Consultancy",
      "Part B Compliance",
      "Part E Compliance",
      "Part F Compliance",
      "Part O Compliance",
      "Planning Compliance Reports",
      "Technical Due Diligence",
      "Building Control Support",
    ],
  },
  {
    Icon: FlaskConical,
    title: "Testing & Certification",
    tag: "05",
    services: [
      "Airtightness Testing",
      "Sound Insulation Testing",
      "Thermographic Surveys",
      "Heat Loss Surveys",
      "TM44 Inspections",
      "Indoor Air Quality Testing",
      "Legionella Assessments",
      "Asbestos Surveys",
    ],
  },
];

const SECTORS = [
  {
    title: "Residential Developments",
    desc: "New build homes, apartment schemes, and housing developments across all tenures.",
    compliance: "SAP · Part L · BREEAM · Fire Safety",
    img: "photo-1560518883-ce09059eeffa",
  },
  {
    title: "Commercial Offices",
    desc: "Office buildings and business parks requiring full sustainability and compliance assessment.",
    compliance: "SBEM · BREEAM · EPC · Part B",
    img: "photo-1497366216548-37526070297c",
  },
  {
    title: "Industrial Facilities",
    desc: "Warehouses, logistics centres, and manufacturing units with specialist compliance needs.",
    compliance: "Part F · Air Quality · Flood Risk",
    img: "photo-1581094794329-c8112a89af12",
  },
  {
    title: "Retail & Mixed Use",
    desc: "Retail units, shopping centres, and mixed-use schemes with complex regulatory requirements.",
    compliance: "Fire Strategy · BREEAM · Part O",
    img: "photo-1441984904996-e0b6ba687e04",
  },
  {
    title: "Healthcare",
    desc: "Hospitals, clinics, and care facilities with specialist environmental and fire requirements.",
    compliance: "HTM · Fire Engineering · TM52",
    img: "photo-1519494026892-80bbd2d6fd0d",
  },
  {
    title: "Education",
    desc: "Schools, colleges, and universities requiring acoustic, energy, and environmental assessments.",
    compliance: "BB101 · BREEAM Edu · Acoustics",
    img: "photo-1580582932707-520aed937b7b",
  },
  {
    title: "Hospitality",
    desc: "Hotels, restaurants, and leisure facilities with fire safety and energy compliance needs.",
    compliance: "Fire Safety · Energy · BREEAM",
    img: "photo-1566073771259-6a8506099945",
  },
  {
    title: "Infrastructure",
    desc: "Transport hubs, utilities, and public sector projects requiring multi-disciplinary assessment.",
    compliance: "EIA · BNG · Drainage · Ecology",
    img: "photo-1545558014-8692077e9b5c",
  },
];

const TESTIMONIALS = [
  {
    name: "James Thornton",
    company: "Thornton Developments Ltd",
    role: "Managing Director",
    project: "250-unit residential scheme, West Midlands",
    quote:
      "Exceptional technical support throughout planning and building regulations. Their team coordinated SAP, BREEAM, and fire strategy seamlessly — removing significant programme risk from our project.",
  },
  {
    name: "Sarah Lawson",
    company: "Lawson Architects",
    role: "Partner",
    project: "Mixed-use commercial development, Manchester",
    quote:
      "Our go-to consultancy for environmental and sustainability assessments. Consistently reliable, technically precise, and responsive to our programme requirements.",
  },
  {
    name: "David Chen",
    company: "Urban Commercial Properties",
    role: "Head of Development",
    project: "Office refurbishment portfolio, London",
    quote:
      "A trusted single-point consultancy covering energy, fire, and compliance across our entire portfolio. Their reports have been instrumental in securing planning approvals on time.",
  },
];

const DELIVERY_STEPS = [
  {
    num: "01",
    title: "Initial Consultation",
    desc: "Review of project requirements, scope, and compliance obligations to define the assessment brief.",
  },
  {
    num: "02",
    title: "Project Review",
    desc: "Technical analysis of drawings, planning conditions, and applicable regulatory framework.",
  },
  {
    num: "03",
    title: "Technical Assessment",
    desc: "Specialist assessment, modelling, and site survey work carried out by accredited consultants.",
  },
  {
    num: "04",
    title: "Report Preparation",
    desc: "Production of detailed technical reports, calculations, and certification documentation.",
  },
  {
    num: "05",
    title: "Compliance Support",
    desc: "Ongoing support through building control, planning authority, and construction stages.",
  },
];

const PROJECT_CATEGORIES = [
  {
    title: "Residential Developments",
    items: ["Extensions", "New Build Homes", "Apartment Schemes", "Housing Developments"],
  },
  {
    title: "Commercial Developments",
    items: ["Office Buildings", "Retail Units", "Mixed-Use Schemes", "Industrial Facilities"],
  },
  {
    title: "Specialist Projects",
    items: ["Healthcare Facilities", "Educational Buildings", "Hospitality & Leisure", "Public Sector Projects"],
  },
  {
    title: "Large Scale Developments",
    items: ["Multi-Phase Developments", "BREEAM Projects", "Net Zero Strategies", "Environmental Impact Assessments"],
  },
];

const SERVICE_OPTIONS = [
  "Energy & Sustainability",
  "Environmental Consultancy",
  "Fire & Building Safety",
  "Compliance & Building Regulations",
  "Testing & Certification",
  "Multiple Services",
];

const PROJECT_TYPE_OPTIONS = [
  "Residential",
  "Commercial",
  "Industrial",
  "Mixed Use",
  "Healthcare",
  "Education",
  "Other",
];

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    location: "",
    service: "",
    projectType: "",
    details: "",
  });

  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className="bg-[#F8FAFC] text-[#0F172A] min-h-screen overflow-x-clip"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── NAVIGATION ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0F172A] flex items-center justify-center flex-shrink-0">
                <div className="w-3.5 h-3.5 border-2 border-[#22C55E]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-[#0F172A] font-extrabold text-base tracking-tight"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  APEX
                </span>
                <span className="text-[#94A3B8] text-[10px] font-semibold tracking-[0.18em] uppercase hidden sm:block">
                  Built Environment
                </span>
              </div>
            </div>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {["Home", "Services", "Sectors", "About", "Contact"].map((link) => (
                <a
                  key={link}
                  href={link === "Services" ? "#services" : link === "Sectors" ? "#sectors" : link === "Contact" ? "#contact" : "#"}
                  className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors font-medium"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <a
                href="#contact"
                className="flex items-center gap-2 bg-[#22C55E] text-white text-sm font-semibold px-5 py-2.5 hover:bg-[#16A34A] transition-colors"
              >
                Discuss Your Project <ArrowRight size={14} />
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-[#0F172A]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[#E2E8F0] px-4 sm:px-6 py-5 space-y-4">
            {["Home", "Services", "Sectors", "About", "Contact"].map((link) => (
              <a
                key={link}
                href={link === "Services" ? "#services" : link === "Sectors" ? "#sectors" : link === "Contact" ? "#contact" : "#"}
                className="block text-sm text-[#475569] hover:text-[#0F172A] font-medium py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              className="flex items-center gap-2 bg-[#22C55E] text-white text-sm font-semibold px-5 py-2.5 w-fit hover:bg-[#16A34A] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Discuss Your Project <ArrowRight size={14} />
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.22em] text-[#22C55E] uppercase mb-6">
                UK Environmental, Energy &amp; Building Compliance Consultancy
              </p>
              <h1
                className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold text-[#0F172A] leading-[1.08] tracking-tight mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                De-risk Your Project.<br />Accelerate Compliance.
              </h1>
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-8 max-w-[480px]">
                Specialist consultancy supporting planning applications, sustainability strategies,
                building regulations, environmental assessments, fire safety, and certification
                requirements across residential and commercial developments.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="#contact"
                  className="flex w-full sm:w-auto justify-center items-center gap-2 bg-[#22C55E] text-white font-semibold px-7 py-3.5 hover:bg-[#16A34A] transition-colors text-sm"
                >
                  Discuss Your Project <ArrowRight size={15} />
                </a>
                <a
                  href="#services"
                  className="flex w-full sm:w-auto justify-center items-center gap-2 border border-[#E2E8F0] text-[#0F172A] font-semibold px-7 py-3.5 hover:bg-[#F8FAFC] transition-colors text-sm"
                >
                  Explore Services
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Residential & Commercial Expertise",
                  "UK Regulatory Compliance",
                  "Multi-Disciplinary Consultancy",
                  "Planning & Building Regulations Support",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="mt-0.5 w-4 h-4 bg-[#22C55E]/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-[#22C55E]" />
                    </div>
                    <span className="text-sm text-[#475569] font-medium leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — technical visual */}
            <div className="relative">
              <div className="relative aspect-[4/3] bg-[#0F172A] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop&auto=format"
                  alt="Modern commercial development"
                  className="w-full h-full object-cover opacity-55 mix-blend-luminosity"
                />
                {/* Technical overlay */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 800 600"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <pattern id="techgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="800" height="600" fill="url(#techgrid)" />
                  {/* Dimension lines */}
                  <line x1="80" y1="530" x2="720" y2="530" stroke="#22C55E" strokeWidth="0.75" opacity="0.55" />
                  <line x1="80" y1="524" x2="80" y2="536" stroke="#22C55E" strokeWidth="0.75" opacity="0.55" />
                  <line x1="720" y1="524" x2="720" y2="536" stroke="#22C55E" strokeWidth="0.75" opacity="0.55" />
                  <text x="400" y="548" fill="#22C55E" fontSize="8" textAnchor="middle" fontFamily="monospace" opacity="0.75">
                    BUILDING ENVELOPE — 640m FRONTAGE
                  </text>
                  <line x1="748" y1="70" x2="748" y2="510" stroke="#22C55E" strokeWidth="0.75" opacity="0.55" />
                  <line x1="742" y1="70" x2="754" y2="70" stroke="#22C55E" strokeWidth="0.75" opacity="0.55" />
                  <line x1="742" y1="510" x2="754" y2="510" stroke="#22C55E" strokeWidth="0.75" opacity="0.55" />
                  {/* Corner registration marks */}
                  <path d="M 55 55 L 55 85 L 85 85" fill="none" stroke="#22C55E" strokeWidth="1" opacity="0.45" />
                  <path d="M 745 55 L 745 85 L 715 85" fill="none" stroke="#22C55E" strokeWidth="1" opacity="0.45" />
                  <path d="M 55 545 L 55 515 L 85 515" fill="none" stroke="#22C55E" strokeWidth="1" opacity="0.45" />
                  {/* Title block */}
                  <rect x="16" y="16" width="128" height="20" fill="none" stroke="#22C55E" strokeWidth="0.5" opacity="0.4" />
                  <text x="26" y="30" fill="#22C55E" fontSize="7.5" fontFamily="monospace" opacity="0.85">
                    APEX — REF: AX-2024-047
                  </text>
                  <rect x="16" y="38" width="96" height="14" fill="none" stroke="#22C55E" strokeWidth="0.5" opacity="0.35" />
                  <text x="26" y="48" fill="#22C55E" fontSize="6.5" fontFamily="monospace" opacity="0.7">
                    ENERGY COMPLIANCE
                  </text>
                  {/* Callout annotations */}
                  <circle cx="280" cy="210" r="3.5" fill="none" stroke="#22C55E" strokeWidth="1" opacity="0.65" />
                  <line x1="284" y1="207" x2="340" y2="175" stroke="#22C55E" strokeWidth="0.5" opacity="0.5" />
                  <text x="344" y="172" fill="#22C55E" fontSize="7" fontFamily="monospace" opacity="0.8">
                    U-VALUE 0.18 W/m²K
                  </text>
                  <circle cx="490" cy="340" r="3.5" fill="none" stroke="#22C55E" strokeWidth="1" opacity="0.65" />
                  <line x1="494" y1="337" x2="548" y2="305" stroke="#22C55E" strokeWidth="0.5" opacity="0.5" />
                  <text x="552" y="302" fill="#22C55E" fontSize="7" fontFamily="monospace" opacity="0.8">
                    SAP SCORE 89+
                  </text>
                  <circle cx="180" cy="380" r="3.5" fill="none" stroke="#22C55E" strokeWidth="1" opacity="0.65" />
                  <line x1="184" y1="377" x2="230" y2="348" stroke="#22C55E" strokeWidth="0.5" opacity="0.5" />
                  <text x="234" y="345" fill="#22C55E" fontSize="7" fontFamily="monospace" opacity="0.8">
                    PART L COMPLIANT
                  </text>
                </svg>
                {/* Info strip */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#0F172A]/85 backdrop-blur-sm px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 justify-between">
                  <div>
                    <p className="text-white text-[10px] font-bold tracking-[0.18em] uppercase">
                      Multi-Disciplinary Assessment
                    </p>
                    <p className="text-[#94A3B8] text-[10px] mt-0.5">
                      Energy · Fire · Environment · Compliance
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#22C55E] text-[10px] font-mono tracking-wider">PART L COMPLIANT</p>
                    <p className="text-[#475569] text-[9px] font-mono mt-0.5">REV 03 · 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE BAR ─────────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 justify-center lg:justify-between">
            <p className="text-[#475569] text-[10px] font-semibold tracking-[0.2em] uppercase hidden lg:block">
              Compliance Standards
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {COMPLIANCE_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="text-[10px] font-mono text-[#22C55E] border border-[#22C55E]/25 px-3 py-1.5 tracking-wider bg-[#22C55E]/5"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPANY INTRO ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <p className="text-[10px] font-bold tracking-[0.22em] text-[#22C55E] uppercase mb-4">
              About Our Practice
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] leading-tight tracking-tight mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              A Single Consultancy Partner Throughout The Development Lifecycle.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              We help developers, architects, contractors, and property professionals navigate
              increasingly complex planning, environmental, sustainability, fire safety, and
              building regulation requirements.
            </p>
          </div>

          {/* Process graphic */}
          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-[calc(8.33%+28px)] right-[calc(8.33%+28px)] h-px bg-[#E2E8F0]" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 w-14 h-14 bg-white border-2 border-[#E2E8F0] flex items-center justify-center mb-4 hover:border-[#22C55E] transition-colors">
                    <span
                      className="text-xs font-bold text-[#22C55E]"
                      style={{ fontFamily: "monospace" }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#0F172A]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE PILLARS ────────────────────────────────────────────────── */}
      <section id="services" className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-28 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[10px] font-bold tracking-[0.22em] text-[#22C55E] uppercase mb-4">
              Our Services
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Five Service Pillars
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E2E8F0]">
            {SERVICE_PILLARS.map(({ Icon, title, tag, services }) => (
              <div
                key={title}
                className="bg-white p-6 flex flex-col hover:bg-[#F8FAFC] transition-colors group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 bg-[#22C55E]/10 flex items-center justify-center">
                    <Icon size={18} className="text-[#22C55E]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#CBD5E1] tracking-wider">{tag}</span>
                </div>
                <h3
                  className="text-sm font-bold text-[#0F172A] mb-4 leading-tight"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {title}
                </h3>
                <ul className="space-y-2 flex-1">
                  {services.map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <ChevronRight
                        size={11}
                        className="text-[#22C55E] mt-0.5 flex-shrink-0"
                      />
                      <span className="text-xs text-[#475569]">{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                  <a
                    href="#contact"
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#22C55E] group-hover:gap-2.5 transition-all"
                  >
                    Enquire <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            ))}

            {/* Consultation conversion card */}
            <div
              className="relative bg-[#0F172A] p-6 flex flex-col overflow-hidden group cursor-pointer
                transition-all duration-300
                hover:shadow-[0_0_0_1px_#22C55E,0_8px_32px_rgba(34,197,94,0.18)]
                hover:-translate-y-px"
            >
              {/* Background grid texture */}
              <svg
                className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
                viewBox="0 0 280 400"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <pattern id="cg" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#22C55E" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="280" height="400" fill="url(#cg)" />
              </svg>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-px h-10 bg-[#22C55E]/30 group-hover:bg-[#22C55E]/60 transition-colors" />
                <div className="absolute top-0 right-0 w-10 h-px bg-[#22C55E]/30 group-hover:bg-[#22C55E]/60 transition-colors" />
              </div>

              {/* Icon */}
              <div className="relative flex items-start justify-between mb-5">
                <div className="w-10 h-10 bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center group-hover:bg-[#22C55E]/20 transition-colors">
                  <Compass size={18} className="text-[#22C55E]" />
                </div>
                <span className="text-[10px] font-mono text-[#22C55E]/30 tracking-wider">06</span>
              </div>

              {/* Content */}
              <h3
                className="relative text-sm font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Need Guidance?
              </h3>
              <p className="relative text-xs text-[#94A3B8] leading-relaxed flex-1 mb-6">
                Not every project fits neatly into a single service category. Our consultants
                can review your development and identify the assessments, compliance
                requirements, and technical reports needed to support your project.
              </p>

              {/* Supporting text */}
              <p className="relative text-[10px] text-[#22C55E]/70 font-medium tracking-wide mb-5 leading-snug">
                Expert advice tailored to your development requirements.
              </p>

              {/* Divider */}
              <div className="relative border-t border-white/10 pt-4">
                <a
                  href="#contact"
                  className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#22C55E] group-hover:gap-3 transition-all duration-200"
                >
                  Discuss Your Project <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTORS ────────────────────────────────────────────────────────── */}
      <section id="sectors" className="bg-white py-20 lg:py-28 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[10px] font-bold tracking-[0.22em] text-[#22C55E] uppercase mb-4">
              Sectors We Support
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Built Across All Sectors
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E2E8F0]">
            {SECTORS.map(({ title, desc, compliance, img }) => (
              <div key={title} className="bg-white group overflow-hidden">
                <div className="aspect-[4/3] bg-[#0F172A] overflow-hidden relative">
                  <img
                    src={`https://images.unsplash.com/${img}?w=400&h=300&fit=crop&auto=format`}
                    alt={title}
                    className="w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-[1.04] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/75 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[9px] font-mono text-[#22C55E] tracking-wider uppercase leading-relaxed">
                      {compliance}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-[#0F172A] mb-2">{title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-28 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[10px] font-bold tracking-[0.22em] text-[#22C55E] uppercase mb-4">
              Why Clients Choose Us
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Built On Technical Authority
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[#E2E8F0]">
            {[
              {
                Icon: Clock,
                title: "Rapid Turnaround",
                desc: "Delivering assessments and reports efficiently to support project programmes and planning timelines.",
              },
              {
                Icon: Users,
                title: "Multi-Disciplinary Expertise",
                desc: "Environmental, energy, sustainability, fire safety, and compliance services delivered through a single consultancy partner.",
              },
              {
                Icon: Shield,
                title: "Regulatory Confidence",
                desc: "Technical reports and assessments aligned with current UK planning and building regulation requirements.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white p-6 sm:p-8 lg:p-10">
                <div className="w-12 h-12 bg-[#0F172A] flex items-center justify-center mb-6">
                  <Icon size={20} className="text-[#22C55E]" />
                </div>
                <h3
                  className="text-lg sm:text-xl font-bold text-[#0F172A] mb-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {title}
                </h3>
                <p className="text-[#475569] leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT TYPES ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-[10px] font-bold tracking-[0.22em] text-[#22C55E] uppercase mb-4">
                Project Scale
              </p>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Supporting Developments Of Every Scale.
              </h2>
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-8">
                Whether supporting an individual residential project or a large multi-disciplinary
                development, our consultants provide technical expertise throughout planning,
                design, compliance, construction, and certification stages.
              </p>
              <a
                href="#contact"
                className="flex items-center gap-2 bg-[#22C55E] text-white font-semibold px-7 py-3.5 w-fit hover:bg-[#16A34A] transition-colors text-sm"
              >
                Discuss Your Project <ArrowRight size={15} />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECT_CATEGORIES.map(({ title, items }) => (
                <div key={title} className="border border-[#E2E8F0] p-5">
                  <h4
                    className="text-xs font-bold text-[#0F172A] mb-3 uppercase tracking-wider"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {title}
                  </h4>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-[#22C55E] flex-shrink-0" />
                        <span className="text-xs text-[#475569]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DELIVERY PROCESS ───────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-28 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[10px] font-bold tracking-[0.22em] text-[#22C55E] uppercase mb-4">
              How We Work
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Project Delivery Process
            </h2>
          </div>
          <div className="border border-[#E2E8F0]">
            {DELIVERY_STEPS.map(({ num, title, desc }, i) => (
              <div
                key={num}
                className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-6 lg:gap-10 bg-white px-5 sm:px-6 lg:px-10 py-7 hover:bg-[#F8FAFC] transition-colors group${i < DELIVERY_STEPS.length - 1 ? " border-b border-[#E2E8F0]" : ""}`}
              >
                <div className="flex-shrink-0 w-12 h-12 border border-[#E2E8F0] flex items-center justify-center group-hover:border-[#22C55E] transition-colors">
                  <span className="text-xs font-bold font-mono text-[#22C55E]">{num}</span>
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3
                    className="text-base font-bold text-[#0F172A] mb-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{desc}</p>
                </div>
                <div className="hidden lg:flex items-center pt-3.5">
                  <span className="text-[10px] font-mono text-[#CBD5E1] tracking-widest uppercase">
                    Stage {i + 1}/{DELIVERY_STEPS.length}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 lg:py-28 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[10px] font-bold tracking-[0.22em] text-[#22C55E] uppercase mb-4">
              Client Outcomes
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Trusted By Development Professionals
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {TESTIMONIALS.map(({ name, company, role, project, quote }) => (
              <div key={name} className="border border-[#E2E8F0] p-5 sm:p-7 flex flex-col">
                <div className="text-[#22C55E] text-4xl font-bold leading-none mb-5 select-none">
                  &ldquo;
                </div>
                <p className="text-[#0F172A] text-sm leading-relaxed flex-1 mb-7">{quote}</p>
                <div className="border-t border-[#E2E8F0] pt-5">
                  <p
                    className="text-sm font-bold text-[#0F172A]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {name}
                  </p>
                  <p className="text-xs text-[#22C55E] font-medium mt-0.5">
                    {role}, {company}
                  </p>
                  <p className="text-[9px] text-[#94A3B8] font-mono mt-1.5 uppercase tracking-wider">
                    {project}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E2E8F0]">
            {[
              { stat: "500+", label: "Projects Completed" },
              { stat: "24hr", label: "Response Time" },
              { stat: "UK-Wide", label: "Project Coverage" },
              { stat: "5", label: "Service Disciplines" },
            ].map(({ stat, label }) => (
              <div key={label} className="bg-white px-4 sm:px-8 py-6 sm:py-7 text-center">
                <p
                  className="text-2xl font-extrabold text-[#0F172A] mb-1"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {stat}
                </p>
                <p className="text-[10px] text-[#475569] tracking-[0.15em] uppercase font-semibold">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#0F172A] py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20">
            {/* Left */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.22em] text-[#22C55E] uppercase mb-4">
                Get In Touch
              </p>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-8"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Ready To Move Your Project Forward?
              </h2>
              <ul className="space-y-4 mb-10">
                {[
                  "Response within 24 hours",
                  "Direct access to consultants",
                  "UK-wide project support",
                  "Residential and commercial expertise",
                  "Multi-disciplinary technical advice",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-[#22C55E]" />
                    </div>
                    <span className="text-[#CBD5E1] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-4 pt-8 border-t border-[#1E293B]">
                <div className="flex items-center gap-3">
                  <Mail size={15} className="text-[#22C55E] flex-shrink-0" />
                  <span className="text-[#94A3B8] text-sm">enquiries@apexbuilt.co.uk</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={15} className="text-[#22C55E] flex-shrink-0" />
                  <span className="text-[#94A3B8] text-sm">0800 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={15} className="text-[#22C55E] flex-shrink-0" />
                  <span className="text-[#94A3B8] text-sm">United Kingdom — Nationwide Coverage</span>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-white/5 border border-white/10 p-5 sm:p-7 lg:p-10">
              <h3
                className="text-white font-bold text-lg mb-7"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Project Enquiry
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {(
                  [
                    { name: "name", label: "Full Name", type: "text", placeholder: "James Thornton", col: 1 },
                    { name: "company", label: "Company Name", type: "text", placeholder: "Thornton Developments Ltd", col: 1 },
                    { name: "email", label: "Email Address", type: "email", placeholder: "james@thorntondev.co.uk", col: 1 },
                    { name: "phone", label: "Phone Number", type: "tel", placeholder: "+44 7700 900 000", col: 1 },
                    { name: "location", label: "Project Location", type: "text", placeholder: "Birmingham, West Midlands", col: 2 },
                  ] as { name: keyof typeof form; label: string; type: string; placeholder: string; col: number }[]
                ).map((field) => (
                  <div key={field.name} className={field.col === 2 ? "md:col-span-2" : ""}>
                    <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.16em] mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleForm}
                      placeholder={field.placeholder}
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-[#334155] px-4 py-3 text-sm focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.16em] mb-2">
                    Service Required
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleForm}
                    className="w-full bg-[#0F172A] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#22C55E]/60 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.16em] mb-2">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleForm}
                    className="w-full bg-[#0F172A] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#22C55E]/60 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select project type</option>
                    {PROJECT_TYPE_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.16em] mb-2">
                    Project Details
                  </label>
                  <textarea
                    name="details"
                    value={form.details}
                    onChange={handleForm}
                    rows={4}
                    placeholder="Please describe your project requirements and any specific compliance needs..."
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-[#334155] px-4 py-3 text-sm focus:outline-none focus:border-[#22C55E]/60 transition-colors resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 bg-[#22C55E] text-white font-semibold px-8 py-4 hover:bg-[#16A34A] transition-colors w-full text-sm"
                  >
                    Discuss Your Project <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0A0F1A] border-t border-[#1E293B] py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 bg-[#0F172A] border border-[#1E293B] flex items-center justify-center">
                  <div className="w-3 h-3 border border-[#22C55E]" />
                </div>
                <span
                  className="text-white font-extrabold tracking-tight"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  APEX
                </span>
              </div>
              <p className="text-[#475569] text-sm leading-relaxed mb-6">
                UK-based specialist consultancy providing environmental, energy, sustainability,
                fire safety, and building compliance services nationwide.
              </p>
              <a
                href="#"
                className="w-8 h-8 bg-[#1E293B] flex items-center justify-center hover:bg-[#22C55E]/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} className="text-[#94A3B8]" />
              </a>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
                Services
              </h4>
              <ul className="space-y-3">
                {[
                  "Energy & Sustainability",
                  "Environmental Consultancy",
                  "Fire & Building Safety",
                  "Compliance & Regulations",
                  "Testing & Certification",
                ].map((s) => (
                  <li key={s}>
                    <a
                      href="#services"
                      className="text-[#475569] text-sm hover:text-[#22C55E] transition-colors"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sectors */}
            <div>
              <h4 className="text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
                Sectors
              </h4>
              <ul className="space-y-3">
                {[
                  "Residential Developments",
                  "Commercial Offices",
                  "Industrial Facilities",
                  "Healthcare",
                  "Education",
                  "Infrastructure",
                ].map((s) => (
                  <li key={s}>
                    <a
                      href="#sectors"
                      className="text-[#475569] text-sm hover:text-[#22C55E] transition-colors"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-2.5">
                  <Mail size={13} className="text-[#22C55E] mt-0.5 flex-shrink-0" />
                  <span className="text-[#475569] text-sm">enquiries@apexbuilt.co.uk</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone size={13} className="text-[#22C55E] mt-0.5 flex-shrink-0" />
                  <span className="text-[#475569] text-sm">0800 123 4567</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin size={13} className="text-[#22C55E] mt-0.5 flex-shrink-0" />
                  <span className="text-[#475569] text-sm">United Kingdom — Nationwide</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1E293B] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[#334155] text-xs">
              &copy; 2024 Apex Built Environment Consultancy Ltd. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <a href="#" className="text-[#334155] text-xs hover:text-[#94A3B8] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[#334155] text-xs hover:text-[#94A3B8] transition-colors">
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
