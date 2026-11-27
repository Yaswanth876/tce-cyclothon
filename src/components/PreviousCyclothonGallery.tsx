"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  ArrowUpRight,
  Sparkles,
  Maximize2,
  ChevronRight,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { GALLERY_PHOTOS, GalleryPhoto } from "@/data/galleryData";
import { GalleryLightbox } from "./GalleryLightbox";

interface PreviousCyclothonGalleryProps {
  isStandalonePage?: boolean;
}

export function PreviousCyclothonGallery({
  isStandalonePage = false,
}: PreviousCyclothonGalleryProps) {
  // Default expanded panel is the primary flag-off shot
  const [activeId, setActiveId] = useState<string>("flagoff-2024");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // On desktop, hover drives expansion (falling back to activeId if none hovered)
  // On mobile/tablet, tap sets activeId
  const currentExpandedId = isMobile ? activeId : hoveredId ?? activeId;

  return (
    <section
      id="gallery"
      className={cn(
        "relative overflow-hidden py-section transition-colors",
        isStandalonePage ? "bg-deep-green text-white" : "bg-deep-green text-white"
      )}
      aria-labelledby="gallery-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-site px-gutter">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-soft-mint/30 bg-soft-mint/10 px-3.5 py-1 text-xs font-semibold text-soft-mint mb-4 backdrop-blur-md">
              <Sparkles size={13} className="text-soft-mint animate-pulse" />
              <span>Historical Moments & Legacy</span>
            </div>

            <h2
              id="gallery-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-[1.1]"
            >
              Previous Cyclothon <span className="text-soft-mint">Gallery</span>
            </h2>

            <p className="mt-3.5 text-base sm:text-lg text-white/75 font-normal leading-relaxed">
              Real photographs and archival memories from previous TCE Cyclothon
              editions. Over 450+ riders united across Madurai to pedal for a
              greener, healthier tomorrow.
            </p>
          </div>

          {/* Action Button & Filter Pills */}
          <div className="flex flex-wrap items-center gap-3">
            {!isStandalonePage && (
              <Link
                href="#gallery"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold",
                  "bg-white/10 hover:bg-white/20 text-white border border-white/15",
                  "backdrop-blur-md transition-all duration-200 hover:scale-[1.02] shadow-sm"
                )}
              >
                <span>View Full Showcase</span>
                <ArrowUpRight size={16} />
              </Link>
            )}

            <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-xs font-medium text-white/70 backdrop-blur-md">
              <span className="px-3 py-1 rounded-full bg-soft-mint/15 text-soft-mint font-semibold">
                2024 · Season 2
              </span>
              <span className="px-3 py-1 rounded-full text-white/80">
                2020 · Inaugural
              </span>
            </div>
          </div>
        </div>

        {/* 
          HORIZONTAL EXPANDABLE PANELS (Inspired by kingsleey.com/designs)
          Desktop & Tablet: Horizontal expandable panels with custom cubic-bezier transitions.
          Mobile: Vertical or touch-expandable accordion with full tap interaction.
        */}
        <div className="hidden md:flex w-full h-[580px] lg:h-[620px] gap-3 lg:gap-4 p-3 rounded-card bg-forest-green/20 border border-white/10 shadow-card backdrop-blur-sm overflow-hidden">
          {GALLERY_PHOTOS.map((photo) => {
            const isExpanded = currentExpandedId === photo.id;

            return (
              <div
                key={photo.id}
                onMouseEnter={() => !isMobile && setHoveredId(photo.id)}
                onMouseLeave={() => !isMobile && setHoveredId(null)}
                onClick={() => setActiveId(photo.id)}
                className={cn(
                  "relative h-full rounded-2xl overflow-hidden cursor-pointer",
                  "border border-white/10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none",
                  isExpanded
                    ? "flex-[3.8] lg:flex-[4.2] shadow-card ring-1 ring-soft-mint/40"
                    : "flex-[0.8] lg:flex-[1.0] opacity-80 hover:opacity-100"
                )}
                style={{
                  minWidth: isExpanded ? "380px" : "80px",
                }}
              >
                {/* Background Image with Zoom */}
                <div className="absolute inset-0 overflow-hidden bg-deep-green">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={photo.id === "flagoff-2024"}
                    className={cn(
                      "object-cover transition-transform duration-700 ease-out",
                      isExpanded ? "scale-105" : "scale-100 brightness-[0.75] contrast-[1.05]"
                    )}
                    style={{ objectPosition: photo.objectPosition }}
                  />

                  {/* Editorial Gradient Scrim */}
                  <div
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500",
                      isExpanded
                        ? "bg-gradient-to-t from-deep-green/95 via-deep-green/45 to-deep-green/20"
                        : "bg-gradient-to-t from-deep-green/90 via-deep-green/65 to-deep-green/45"
                    )}
                  />
                </div>

                {/* Contracted State: Minimalist Vertical Spine Label */}
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-300",
                    isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
                  )}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-deep-green/80 border border-white/15 text-white/80 backdrop-blur-md">
                    <span className="text-[10px] font-mono font-bold">
                      {photo.year}
                    </span>
                  </div>

                  <div className="flex-1 flex items-center justify-center my-auto">
                    <span
                      className="text-xs font-semibold tracking-widest text-white/80 uppercase whitespace-nowrap"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {photo.title}
                    </span>
                  </div>

                  <div className="flex items-center justify-center text-[10px] font-mono text-white/70">
                    <Eye size={13} className="text-white/70" />
                  </div>
                </div>

                {/* Expanded State: Full Editorial Showcase Content */}
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col justify-between p-6 lg:p-8 transition-all duration-500",
                    isExpanded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  )}
                >
                  {/* Top Header inside card */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-green text-white font-mono text-xs font-bold px-3 py-1 shadow-sm">
                        <Calendar size={12} />
                        {photo.year}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-medium px-3 py-1">
                        {photo.edition}
                      </span>
                    </div>

                    {/* Lightbox / Zoom Action */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxPhoto(photo);
                      }}
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white backdrop-blur-md transition-all duration-200 hover:scale-110"
                      title="Inspect full image"
                      aria-label="Open image in full view"
                    >
                      <Maximize2 size={15} />
                    </button>
                  </div>

                  {/* Bottom Content & Editorial Caption */}
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 text-xs text-soft-mint font-light tracking-wide">
                      <MapPin size={12} />
                      <span>{photo.location}</span>
                    </div>

                    <h3 className="text-xl lg:text-2xl font-light text-white tracking-tight leading-tight">
                      {photo.title}
                    </h3>

                    <p className="text-xs lg:text-sm text-white/80 line-clamp-3 leading-relaxed max-w-xl">
                      {photo.caption}
                    </p>

                    {/* Metadata Pills Footer */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-mono text-white/80">
                      <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1 border border-white/10">
                        <Users size={11} className="text-soft-mint" />
                        {photo.turnout}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1 border border-white/10">
                        {photo.routeDistance}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-deep-green/80 px-2.5 py-1 text-white/70 border border-white/10">
                        Credit: {photo.photographer}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 
          MOBILE TOUCH-INTERACTIVE ACCORDION (< 768px)
          Smooth tap-to-expand behavior replaces hover.
        */}
        <div className="flex md:hidden flex-col gap-3">
          {GALLERY_PHOTOS.map((photo) => {
            const isExpanded = activeId === photo.id;

            return (
              <div
                key={photo.id}
                onClick={() => setActiveId(isExpanded ? "" : photo.id)}
                className={cn(
                  "relative rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 ease-out",
                  isExpanded
                    ? "h-[420px] ring-2 ring-primary/60 shadow-xl"
                    : "h-[90px] opacity-90"
                )}
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  sizes="100vw"
                  className={cn(
                    "object-cover transition-transform duration-700 ease-out",
                    isExpanded ? "scale-105" : "scale-100 brightness-[0.7]"
                  )}
                  style={{ objectPosition: photo.objectPosition }}
                />

                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isExpanded
                      ? "bg-gradient-to-t from-deep-green/95 via-deep-green/50 to-deep-green/25"
                      : "bg-deep-green/70"
                  )}
                />

                {/* Collapsed Mobile Bar */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-between px-4 transition-opacity duration-300",
                    isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-soft-mint/15 border border-soft-mint/30 px-2.5 py-0.5 text-xs font-mono font-bold text-soft-mint">
                      {photo.year}
                    </span>
                    <span className="font-semibold text-sm text-white line-clamp-1">
                      {photo.title}
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-white/70" />
                </div>

                {/* Expanded Mobile View */}
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col justify-between p-5 transition-all duration-300",
                    isExpanded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3 pointer-events-none"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-forest-green text-white px-2.5 py-0.5 text-xs font-bold font-mono">
                        {photo.year}
                      </span>
                      <span className="text-xs text-white/80 font-light">
                        {photo.edition}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxPhoto(photo);
                      }}
                      className="p-1.5 rounded-full bg-white/20 text-white"
                      aria-label="View photo in lightbox"
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs text-soft-mint font-light flex items-center gap-1">
                      <MapPin size={11} />
                      {photo.location}
                    </p>
                    <h3 className="text-base font-light text-white">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2">
                      {photo.caption}
                    </p>
                    <div className="flex items-center gap-2 pt-1 text-[10px] font-mono text-white/70">
                      <span>{photo.turnout}</span>
                      <span>•</span>
                      <span>{photo.routeDistance}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile quick dots navigation */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-4">
          {GALLERY_PHOTOS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                activeId === p.id ? "w-8 bg-soft-mint" : "w-2 bg-white/30"
              )}
              aria-label={`Select photo ${p.title}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <GalleryLightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
          onNavigate={(direction) => {
            const currentIndex = GALLERY_PHOTOS.findIndex(
              (p) => p.id === lightboxPhoto.id
            );
            if (currentIndex === -1) return;
            const nextIndex =
              direction === "next"
                ? (currentIndex + 1) % GALLERY_PHOTOS.length
                : (currentIndex - 1 + GALLERY_PHOTOS.length) %
                  GALLERY_PHOTOS.length;
            setLightboxPhoto(GALLERY_PHOTOS[nextIndex]);
          }}
        />
      )}
    </section>
  );
}
