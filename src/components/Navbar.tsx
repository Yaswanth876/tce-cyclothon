"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface NavLinkItem {
  label: string;
  href: `#${string}` | string;
}

export interface BrandLogoItem {
  src: string;
  alt: string;
  visibilityClass?: string;
}

export interface NavbarProps {
  registerHref?: string;
  onRegisterClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  navLinks?: NavLinkItem[];
}

export const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  { label: "Mission", href: "#mission" },
  { label: "Route", href: "#route" },
  { label: "Rider Kit", href: "#kit" },
  { label: "Gallery", href: "#gallery" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
];

export const DEFAULT_BRAND_LOGOS: BrandLogoItem[] = [
  {
    src: "/images/tce-logo.png",
    alt: "Thiagarajar College of Engineering",
  },
];

const DEFAULT_REGISTER_HREF = "#register";

export function Navbar({
  registerHref = DEFAULT_REGISTER_HREF,
  onRegisterClick,
  navLinks = DEFAULT_NAV_LINKS,
}: NavbarProps = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const updateScrollState = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 12);
      setScrollProgress(
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
      );
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionIds = navLinks
      .filter(({ href }) => href.startsWith("#"))
      .map(({ href }) => href.slice(1));

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [navLinks]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const handleRegisterClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onRegisterClick?.(event);
  };

  const handleMobileLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) {
      setMenuOpen(false);
      return;
    }

    event.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => {
      const target = document.getElementById(href.slice(1));
      if (!target) return;

      if (window.location.hash !== href) {
        window.history.pushState(null, "", href);
      }

      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }, 0);
  };

  const renderLinks = (mobile = false) =>
    navLinks.map(({ label, href }) => {
      const current = href.startsWith("#") && activeSection === href.slice(1);
      return (
        <li key={href}>
          <Link
            href={href}
            onClick={
              mobile
                ? (event) => handleMobileLinkClick(event, href)
                : undefined
            }
            aria-current={current ? "location" : undefined}
            className={cn(
              mobile
                ? "flex min-h-12 w-full items-center rounded-xl px-3 py-3 text-[15px] font-semibold transition-colors hover:bg-[#F4F8F2] hover:text-[#3B7E2B] focus-visible:outline-none focus-visible:bg-[#F4F8F2]"
                : "rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-foreground",
              current
                ? "bg-[#EBF6E8] text-[#3B7E2B]"
                : mobile
                  ? "text-neutral-800"
                  : "text-foreground/70"
            )}
          >
            {label}
          </Link>
        </li>
      );
    });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,box-shadow,border-color] duration-300 motion-reduce:transition-none",
        scrolled
          ? "border-neutral-200/80 bg-white/95 shadow-[0_8px_28px_-20px_rgba(17,24,39,0.45)] backdrop-blur-md"
          : "border-neutral-100 bg-white"
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px] origin-left bg-[#4C9F38] transition-transform duration-100 motion-reduce:transition-none"
        style={{ transform: `scaleX(${Math.min(1, Math.max(0, scrollProgress))})` }}
      />

      <div
        className={cn(
          "mx-auto flex max-w-[1440px] items-center justify-between px-4 transition-[height] duration-300 sm:px-8 lg:px-16",
          scrolled ? "h-16 lg:h-[76px]" : "h-[72px] lg:h-24"
        )}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="TCE Cyclothon home"
        >
          {DEFAULT_BRAND_LOGOS.map((logo, index) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={1891}
              height={241}
              preload={index === 0}
              className={cn(
                "h-10 w-auto max-w-[calc(100vw-100px)] object-contain transition-[height,transform] duration-300 sm:h-12 sm:max-w-[340px] lg:h-14",
                scrolled && "lg:h-12",
                logo.visibilityClass
              )}
            />
          ))}
        </Link>

        <nav aria-label="Main navigation" className="hidden xl:block">
          <ul className="flex items-center gap-1" role="list">
            {renderLinks()}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={registerHref}
            onClick={handleRegisterClick}
            className="hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-[#4C9F38] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3B7E2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B7E2B] focus-visible:ring-offset-2 motion-reduce:transition-none xl:inline-flex"
          >
            Join the track <span aria-hidden="true">↗</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full text-neutral-800 transition-[background-color,transform] hover:bg-[#EBF6E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4C9F38] focus-visible:ring-offset-2 active:scale-95 xl:hidden",
              menuOpen && "rotate-90"
            )}
          >
            {menuOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav-drawer"
        hidden={!menuOpen}
        className={cn(
          "absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-neutral-100 bg-white shadow-[0_18px_30px_-24px_rgba(17,24,39,0.45)] xl:hidden",
          menuOpen && "nav-menu-enter"
        )}
      >
        <nav aria-label="Mobile navigation">
          <ul
            className="mx-auto flex max-w-[1440px] flex-col gap-1 px-4 py-4 sm:px-8"
            role="list"
          >
            {renderLinks(true)}
          </ul>
          <div className="mx-auto max-w-[1440px] px-4 pb-5 sm:px-8">
            <a
              href={registerHref}
              onClick={(event) => {
                handleRegisterClick(event);
                setMenuOpen(false);
              }}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#4C9F38] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3B7E2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B7E2B] focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              Join the track <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
