import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Sectors", href: "/#sectors" },
  { label: "Why Us", href: "/#why-us" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-semibold text-[var(--ink-600)] transition hover:text-[var(--ink-900)]"
              >
                {item.label}
              </Link>
            ))}
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
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm font-semibold text-[var(--ink-700)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
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
