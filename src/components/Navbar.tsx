"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { RegisterButton } from "./RegisterButton";

const NAV_LINKS = [
  { href: "#mission", label: "Mission" },
  { href: "/gallery", label: "Gallery" },
  { href: "#route", label: "Route" },
  { href: "#kit", label: "Rider Kit" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(pathname === "/gallery" ? "gallery" : "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for active link highlighting on homepage
  useEffect(() => {
    if (!isHomePage) {
      if (pathname === "/gallery") setActiveSection("gallery");
      return;
    }

    const sectionIds = NAV_LINKS.filter((l) => l.href.startsWith("#")).map((l) =>
      l.href.replace("#", "")
    );
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHomePage, pathname]);

  const resolveHref = (href: string) => {
    if (href.startsWith("/")) return href;
    if (isHomePage) return href;
    return `/${href}`;
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl",
          "rounded-full border border-border",
          "motion-safe:transition-all motion-safe:duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5"
            : "bg-white/70 backdrop-blur-md"
        )}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-4 py-2.5 md:px-6">
          {/* Logo + SDG badge */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="TCE Cyclothon home"
          >
            <div className="flex flex-col leading-none">
              <span className="font-black text-sm md:text-base text-carbon tracking-tight">
                TCE Cyclothon
              </span>
              <span className="text-[10px] text-muted hidden md:block">
                Pedal to No Drug
              </span>
            </div>
            <span className="hidden sm:inline-flex items-center rounded-full bg-primary-tint text-primary text-[10px] font-semibold px-2 py-0.5 border border-sdg-green/20 whitespace-nowrap">
              SDG 3 · Target 3.5
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.replace("#", "");
              const isCurrent =
                href === "/gallery"
                  ? pathname === "/gallery"
                  : isHomePage && activeSection === id;
              const targetUrl = resolveHref(href);

              return (
                <li key={href}>
                  <Link
                    href={targetUrl}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-sm font-medium",
                      "motion-safe:transition-colors motion-safe:duration-150",
                      isCurrent
                        ? "bg-primary-tint text-primary"
                        : "text-foreground/70 hover:text-foreground hover:bg-zinc-100"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right: Register + hamburger */}
          <div className="flex items-center gap-2">
            <RegisterButton size="sm" className="hidden sm:inline-flex" />
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-zinc-100 text-foreground hover:bg-zinc-200 motion-safe:transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu sheet */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-40 bg-white/95 backdrop-blur-xl pt-20 pb-8 px-6",
          "border-b border-border shadow-xl",
          "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out",
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col gap-1 mb-6" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={resolveHref(href)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-primary-tint hover:text-primary motion-safe:transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <RegisterButton size="lg" className="w-full text-center" />
      </div>
    </>
  );
}
