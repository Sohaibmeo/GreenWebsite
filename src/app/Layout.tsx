import { ChevronRight, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const SERVICE_NAV = [
  {
    id: "energy-sustainability",
    label: "Energy & Sustainability Services",
    href: "/services#energy-sustainability",
    services: [
      { label: "SAP Calculations", href: "/services#sap-calculations" },
      { label: "SBEM Calculations", href: "/services#sbem-calculations" },
      { label: "EPC Certificates", href: "/services#epc-certificates" },
      { label: "BRUKL Reports", href: "/services#brukl-reports" },
      { label: "Part L Compliance", href: "/services#part-l-compliance-package" },
      { label: "Overheating Assessments (TM52/TM59)", href: "/services#overheating-assessments-tm52-tm59" },
      { label: "Thermal Modelling", href: "/services#thermal-modelling" },
      { label: "BREEAM Assessments", href: "/services#breeam-assessments" },
      { label: "Net Zero Carbon Consultancy", href: "/services#net-zero-carbon-consultancy" },
      { label: "Renewable Energy Assessments", href: "/services#renewable-energy-assessments" },
      { label: "U-Value Calculations", href: "/services#u-value-calculations" },
      { label: "Energy Statements", href: "/services#energy-statements" },
      { label: "Sustainability Statements", href: "/services#sustainability-statements" },
    ],
  },
  {
    id: "environmental-consultancy",
    label: "Environmental Consultancy",
    href: "/services#environmental-consultancy",
    services: [
      { label: "Air Quality Assessments", href: "/services#air-quality-assessments" },
      { label: "Noise Impact Assessments", href: "/services#noise-impact-assessments" },
      { label: "Acoustic Testing", href: "/services#acoustic-testing" },
      { label: "Flood Risk Assessments", href: "/services#flood-risk-assessments" },
      { label: "Drainage Strategy Reports", href: "/services#drainage-strategy-reports" },
      { label: "Environmental Impact Assessments (EIA)", href: "/services#environmental-impact-assessments-eia" },
      { label: "Contaminated Land Reports", href: "/services#contaminated-land-reports" },
      { label: "Ecology Surveys", href: "/services#ecology-surveys" },
      { label: "Biodiversity Net Gain (BNG)", href: "/services#biodiversity-net-gain-bng" },
      { label: "Arboricultural Surveys", href: "/services#arboricultural-surveys" },
      { label: "Waste Management Plans", href: "/services#waste-management-plans" },
    ],
  },
  {
    id: "fire-building-safety",
    label: "Fire & Building Safety",
    href: "/services#fire-building-safety",
    services: [
      { label: "Fire Risk Assessments", href: "/services#fire-risk-assessments" },
      { label: "Fire Strategy Reports", href: "/services#fire-strategy-reports" },
      { label: "Fire Engineering", href: "/services#fire-engineering" },
      { label: "Fire Compartmentation Surveys", href: "/services#fire-compartmentation-surveys" },
      { label: "EWS1 Assessments", href: "/services#ews1-assessments" },
      { label: "Smoke Ventilation Design", href: "/services#smoke-ventilation-design" },
      { label: "Means of Escape Analysis", href: "/services#means-of-escape-analysis" },
      { label: "Passive Fire Protection", href: "/services#passive-fire-protection" },
      { label: "Fire Door Inspections", href: "/services#fire-door-inspections" },
    ],
  },
  {
    id: "compliance-building-regulations",
    label: "Compliance & Building Regulations",
    href: "/services#compliance-building-regulations",
    services: [
      { label: "Building Regulations Consultancy", href: "/services#building-regulations-consultancy" },
      { label: "Part B Compliance", href: "/services#part-b-compliance" },
      { label: "Part E Acoustic Compliance", href: "/services#part-e-acoustic-compliance" },
      { label: "Part F Ventilation Compliance", href: "/services#part-f-ventilation-compliance" },
      { label: "Part O Overheating Compliance", href: "/services#part-o-overheating-compliance" },
      { label: "Planning Compliance Reports", href: "/services#planning-compliance-reports" },
      { label: "Building Control Support", href: "/services#building-control-support" },
      { label: "Technical Due Diligence", href: "/services#technical-due-diligence" },
      { label: "Construction Compliance Monitoring", href: "/services#construction-compliance-monitoring" },
    ],
  },
  {
    id: "testing-certification",
    label: "Testing & Certification",
    href: "/services#testing-certification",
    services: [
      { label: "Airtightness Testing", href: "/services#airtightness-testing" },
      { label: "Sound Insulation Testing", href: "/services#sound-insulation-testing" },
      { label: "Thermographic Surveys", href: "/services#thermographic-surveys" },
      { label: "Heat Loss Surveys", href: "/services#heat-loss-surveys" },
      { label: "Indoor Air Quality Testing", href: "/services#indoor-air-quality-testing" },
      { label: "TM44 Air Conditioning Inspections", href: "/services#tm44-air-conditioning-inspections" },
      { label: "Legionella Risk Assessments", href: "/services#legionella-risk-assessments" },
      { label: "Asbestos Surveys", href: "/services#asbestos-surveys" },
    ],
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(SERVICE_NAV[0].id);
  const location = useLocation();
  const navigate = useNavigate();
  const activeCategory = SERVICE_NAV.find((item) => item.id === activeCategoryId) || SERVICE_NAV[0];
  const toServiceSearchHref = (serviceLabel: string) =>
    `/services?search=${encodeURIComponent(serviceLabel)}`;
  const desktopNavItemClass =
    "inline-flex h-10 items-center text-sm font-semibold leading-none text-[var(--ink-600)] transition hover:text-[var(--ink-900)]";

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) {
      return false;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  };

  const goToSection = (sectionId: string) => {
    setMenuOpen(false);

    if (location.pathname === "/") {
      const scrolled = scrollToSection(sectionId);
      if (!scrolled) {
        navigate(`/#${sectionId}`);
      }
      return;
    }

    navigate(`/#${sectionId}`);
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 80);
  };

  return (
    <div className="site-shell bg-[var(--bg-canvas)] text-[var(--ink-900)] min-h-screen">
      <div className="ambient-layer" aria-hidden="true" />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/50 bg-[#f6fbf8]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="Apex Green home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--ink-900)] text-white">
              <Sparkles size={16} />
            </span>
            <div>
              <p className="font-['Plus_Jakarta_Sans'] text-base font-extrabold tracking-tight">Apex Green</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--ink-500)]">Consultancy</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className={desktopNavItemClass}>
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => {
                setServicesMenuOpen(true);
                setActiveCategoryId(SERVICE_NAV[0].id);
              }}
              onMouseLeave={() => setServicesMenuOpen(false)}
            >
              <button
                type="button"
                className={`${desktopNavItemClass} gap-2`}
              >
                Services
                <ChevronRight size={14} className={`transition ${servicesMenuOpen ? "rotate-90" : ""}`} />
              </button>

              {servicesMenuOpen && <div className="absolute left-0 top-full h-3 w-full" aria-hidden="true" />}

              {servicesMenuOpen && (
                <div className="absolute left-0 top-full z-50 mt-0 grid w-[760px] grid-cols-[320px_1fr] gap-0 overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-[0_18px_45px_rgba(10,30,20,0.18)]">
                  <div className="max-h-[70vh] overflow-y-auto border-r border-[var(--line)] bg-[var(--card-soft)] p-3">
                    {SERVICE_NAV.map((category) => (
                      <Link
                        key={category.id}
                        to={category.href}
                        onMouseEnter={() => setActiveCategoryId(category.id)}
                        className={`mb-1 flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition ${
                          activeCategoryId === category.id
                            ? "bg-white text-[var(--ink-900)]"
                            : "text-[var(--ink-600)] hover:bg-white hover:text-[var(--ink-900)]"
                        }`}
                      >
                        {category.label}
                        <ChevronRight size={13} />
                      </Link>
                    ))}
                  </div>

                  <div className="max-h-[70vh] overflow-y-auto p-4">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ink-500)]">
                      {activeCategory.label}
                    </p>
                    <div className="grid gap-1">
                      {activeCategory.services.map((service) => (
                        <Link
                          key={service.label}
                          to={toServiceSearchHref(service.label)}
                          className="rounded-md px-2 py-1.5 text-sm text-[var(--ink-700)] transition hover:bg-[var(--card-soft)] hover:text-[var(--ink-900)]"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button type="button" className={desktopNavItemClass} onClick={() => goToSection("sectors")}>
              Sectors
            </button>
            <button type="button" className={desktopNavItemClass} onClick={() => goToSection("why-us")}>
              Why Us
            </button>
            <button type="button" className={desktopNavItemClass} onClick={() => goToSection("contact")}>
              Contact Us
            </button>
          </nav>

          <Link
            to="/services"
            className="hidden rounded-xl bg-[var(--brand-500)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(22,163,74,0.35)] transition hover:translate-y-[-1px] hover:bg-[var(--brand-600)] md:inline-flex"
          >
            View Services
          </Link>

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
              <Link to="/" className="text-sm font-semibold text-[var(--ink-700)]" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <button
                type="button"
                className="text-left text-sm font-semibold text-[var(--ink-700)]"
                onClick={() => goToSection("sectors")}
              >
                Sectors
              </button>
              <button
                type="button"
                className="text-left text-sm font-semibold text-[var(--ink-700)]"
                onClick={() => goToSection("why-us")}
              >
                Why Us
              </button>
              <button
                type="button"
                className="text-left text-sm font-semibold text-[var(--ink-700)]"
                onClick={() => goToSection("contact")}
              >
                Contact Us
              </button>

              {SERVICE_NAV.map((category) => (
                <details key={category.id} className="rounded-lg border border-[var(--line)] bg-white p-2">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--ink-700)]">
                    <Link to={category.href} onClick={() => setMenuOpen(false)}>
                      {category.label}
                    </Link>
                  </summary>
                  <div className="mt-2 flex flex-col gap-2 border-t border-[var(--line)] pt-2">
                    {category.services.map((service) => (
                      <Link
                        key={service.label}
                        to={toServiceSearchHref(service.label)}
                        className="text-xs font-medium text-[var(--ink-600)]"
                        onClick={() => setMenuOpen(false)}
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}

              <Link
                to="/services"
                className="mt-2 inline-flex w-fit rounded-lg bg-[var(--brand-500)] px-4 py-2 text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                View Services
              </Link>
            </div>
          </div>
        )}
      </header>

      <main id="top" className="snap-flow pt-18">
        {children}
      </main>
    </div>
  );
}
