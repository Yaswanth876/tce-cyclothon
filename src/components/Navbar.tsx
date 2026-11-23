"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

/** A single navigation link in the header. */
export interface NavLinkItem {
  /** Display label rendered in the `<a>` tag. */
  label: string;
  /** Hash anchor or any valid URL string. */
  href: `#${string}` | string;
}

/**
 * A brand / accreditation logo slot.
 * `visibilityClass` is a Tailwind responsive class that shows/hides the slot
 * (e.g. `"hidden sm:block"`). An empty string means always visible.
 */
export interface BrandLogoItem {
  src: string;
  alt: string;
  /** Tailwind visibility class(es). Defaults to `""` (always visible). */
  visibilityClass?: string;
}

/** Props accepted by the `<Navbar>` component. */
export interface NavbarProps {
  /**
   * Override the registration / CTA link href.
   * Defaults to `"#register"`.
   */
  registerHref?: string;
  /**
   * Optional click handler for the "Join the track" CTA button.
   * When provided, the anchor still navigates to `registerHref` but this
   * callback fires first (useful for analytics or modal triggers).
   */
  onRegisterClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /**
   * Override the default six navigation links.
   * When omitted, `DEFAULT_NAV_LINKS` is used.
   */
  navLinks?: NavLinkItem[];
}

// ── Default constants ─────────────────────────────────────────────────────────

export const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  { label: "About",    href: "#about" },
  { label: "Event",    href: "#event" },
  { label: "Prizes",   href: "#prizes" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact",  href: "#contact" },
];

export const DEFAULT_BRAND_LOGOS: BrandLogoItem[] = [
  {
    src: "/images/tce-logo.png",
    alt: "Thiagarajar College of Engineering",
    visibilityClass: "",              // always visible
  },
];

const DEFAULT_REGISTER_HREF = "#register"; // TODO: UPDATE WITH OFFICIAL TCE DATA

// ── Component ─────────────────────────────────────────────────────────────────

export function Navbar({
  registerHref = DEFAULT_REGISTER_HREF,
  onRegisterClick,
  navLinks = DEFAULT_NAV_LINKS,
}: NavbarProps = {}) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // ── Side-effects ────────────────────────────────────────────────────────────

  /** Close mobile drawer on Escape key press. */
  const handleEscKey = useCallback((e: KeyboardEvent): void => {
    if (e.key === "Escape") setMenuOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [handleEscKey]);

  useEffect(() => {
    const updateScrollState = (): void => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 12);
      setScrollProgress(scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0);
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  /** Lock body scroll while mobile drawer is open. */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const toggleMenu = (): void => setMenuOpen((prev) => !prev);

  const closeMenu = (): void => setMenuOpen(false);

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    onRegisterClick?.(e);
  };

  const handleHamburgerClick = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    toggleMenu();
  };

  const handleMobileLinkClick = (_e: React.MouseEvent<HTMLAnchorElement>): void => {
    closeMenu();
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-[background-color,box-shadow,border-color] duration-300 motion-reduce:transition-none ${scrolled ? "border-neutral-200/80 bg-white/95 shadow-[0_8px_28px_-20px_rgba(17,24,39,0.45)] backdrop-blur-md" : "border-neutral-100 bg-white"}`}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px] origin-left bg-[#4C9F38] shadow-[0_0_8px_rgba(76,159,56,0.45)] transition-transform duration-100 ease-out motion-reduce:transition-none"
        style={{ transform: `scaleX(${Math.min(1, Math.max(0, scrollProgress))})` }}
      />

      {/* ── MAIN BAR ──────────────────────────────────────────────────────── */}
      <div className={`mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-16 transition-[height] duration-300 motion-reduce:transition-none ${scrolled ? "h-16 lg:h-[76px]" : "h-[72px] lg:h-24"}`}>

        {/* LEFT — Brand & institutional logos */}
        <div
          className="flex items-center gap-3 sm:gap-4 lg:gap-5"
          role="group"
          aria-label="Institutional logos"
        >
          {DEFAULT_BRAND_LOGOS.map((logo, index) => (
            <div
              key={logo.src}
              className={`flex items-center gap-3 sm:gap-4 lg:gap-5 ${logo.visibilityClass ?? ""}`}
            >
              {/* Thin vertical divider before every logo except the first */}
              {index > 0 && (
                <span
                  className="h-8 sm:h-10 lg:h-12 w-[1px] bg-neutral-300"
                  aria-hidden="true"
                />
              )}
              <Image
                src={logo.src}
                alt={logo.alt}
                width={1891}
                height={241}
                className={`w-auto object-contain max-w-[calc(100vw-88px)] sm:max-w-[340px] md:max-w-none transition-[height,transform] duration-300 hover:scale-[1.02] motion-reduce:transition-none ${scrolled ? "h-10 sm:h-11 md:h-12 lg:h-13" : "h-12 sm:h-13 md:h-14 lg:h-16"}`}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* CENTER — Desktop navigation links */}
        <nav aria-label="Main navigation" className="hidden xl:block">
          <ul className="flex items-center gap-8" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="group relative py-3 text-[14px] font-semibold tracking-[0.01em] text-neutral-700 transition-colors duration-200 hover:text-[#3B7E2B] focus-visible:outline-none focus-visible:text-[#3B7E2B] motion-reduce:transition-none"
                >
                  {label}<span aria-hidden="true" className="absolute inset-x-0 bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-[#4C9F38] transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT — CTA pill + mobile toggle */}
        <div className="flex items-center gap-3">
          {/* "Join the track" pill */}
          <a
            href={registerHref}
            onClick={handleRegisterClick}
            className="group hidden min-h-11 items-center gap-2 rounded-full bg-[#4C9F38] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_-7px_rgba(76,159,56,0.9)] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#3B7E2B] hover:shadow-[0_8px_18px_-8px_rgba(76,159,56,0.75)] active:translate-y-0 active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B7E2B] focus-visible:ring-offset-2 motion-reduce:transition-none xl:inline-flex"
          >
            Join the track<span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none">↗</span>
          </a>

          {/* Hamburger / Close toggle — visible below xl breakpoint */}
          <button
            type="button"
            onClick={handleHamburgerClick}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            className="xl:hidden inline-flex size-11 items-center justify-center rounded-full text-neutral-800 transition-[background-color,transform] duration-200 hover:rotate-3 hover:bg-[#EBF6E8] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4C9F38] focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            {menuOpen
              ? <X size={22} aria-hidden="true" />
              : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* ── MOBILE DRAWER ─────────────────────────────────────────────────── */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        // `hidden` removes element from the accessibility tree when closed
        {...(!menuOpen ? { hidden: true } : {})}
        className={[
          "xl:hidden w-full origin-top border-t border-neutral-100 bg-white/98 shadow-[0_18px_30px_-24px_rgba(17,24,39,0.45)] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <nav aria-label="Mobile navigation">
          <ul
            className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 flex flex-col gap-1"
            role="list"
          >
            {navLinks.map(({ label, href }, index) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={handleMobileLinkClick}
                  style={{ transitionDelay: menuOpen ? `${index * 35}ms` : "0ms" }}
                  className="group flex min-h-12 w-full items-center justify-between rounded-xl px-3 py-3 text-[15px] font-semibold text-neutral-800 transition-[background-color,color,transform] duration-200 hover:translate-x-1 hover:bg-[#F4F8F2] hover:text-[#3B7E2B] focus-visible:outline-none focus-visible:bg-[#F4F8F2] motion-reduce:transition-none"
                >
                  {label}<span aria-hidden="true" className="text-[#4C9F38] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pb-5">
            <a
              href={registerHref}
              onClick={(event) => {
                handleRegisterClick(event);
                closeMenu();
              }}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#4C9F38] px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_-7px_rgba(76,159,56,0.9)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#3B7E2B] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B7E2B] focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              Join the track<span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none">↗</span>
            </a>
          </div>
        </nav>
      </div>

    </header>
  );
}

export default Navbar;
