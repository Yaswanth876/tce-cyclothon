"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Users,
  Maximize2,
  Camera,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { GALLERY_PHOTOS, GalleryPhoto } from "@/data/galleryData";
import { GalleryLightbox } from "./GalleryLightbox";

const FILTER_OPTIONS = [
  { id: "all", label: "All Photographs" },
  { id: "2024", label: "2024 · Season 2" },
  { id: "2020", label: "2020 · Inaugural" },
];

const INITIAL_VISIBLE_COUNT = 16;
const LOAD_MORE_INCREMENT = 12;

export function GalleryMasonry() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);
  const gridRef = useRef<HTMLDivElement>(null);

  // Filtered photos based on active category
  const filteredPhotos = useMemo(() => {
    if (activeFilter === "all") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((photo) => photo.year === activeFilter);
  }, [activeFilter]);

  // Progressive reveal / Load more
  const displayedPhotos = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, visibleCount]);

  const hasMore = visibleCount < filteredPhotos.length;
  const remainingCount = Math.max(0, filteredPhotos.length - visibleCount);

  // Lightbox index calculations
  const selectedIndex = useMemo(() => {
    if (!selectedPhoto) return -1;
    return filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
  }, [selectedPhoto, filteredPhotos]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Bidirectional Scroll "Insert Into Gap" Animation
  // Replicating iamkingsleey.com/designs scroll-fly mechanics:
  // - While NOT scrolling: All visible photos remain 100% calm and stable
  // - Scrolling down: newly appearing photos rise from below (+180px) into the gap
  // - Scrolling up: newly appearing photos drop from above (-180px) into the gap
  // - Observes STATIC wrapper (no transform oscillation feedback loop)
  // - Deep off-screen reset threshold (-120px) prevents boundary glitching
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let lastScrollY = window.scrollY;
    let scrollDir: "down" | "up" = "down";
    let hasUserScrolled = false;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY;
      if (Math.abs(diff) >= 2) {
        hasUserScrolled = true;
        scrollDir = diff > 0 ? "down" : "up";
        lastScrollY = currentY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track which wrappers are currently on-screen to avoid re-triggering
    const visibleWrappers = new WeakSet<HTMLElement>();

    // Mark wrappers that are ALREADY in the viewport on initial load
    // so they stay completely stable and never glitch while stationary
    const allWrappers = gridEl.querySelectorAll<HTMLElement>("[data-slot-wrapper='true']");
    allWrappers.forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      if (rect.top < window.innerHeight + 50 && rect.bottom > -50) {
        visibleWrappers.add(wrapper);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        // 1. Elements leaving the screen (past rootMargin buffer):
        entries.forEach((entry) => {
          const wrapper = entry.target as HTMLElement;
          if (!entry.isIntersecting && visibleWrappers.has(wrapper)) {
            visibleWrappers.delete(wrapper);
            const card = wrapper.querySelector<HTMLElement>(".gallery-slot-card");
            if (card) {
              card.classList.remove("slot-entering-down", "slot-entering-up");
            }
          }
        });

        // 2. Elements entering the screen:
        // Only trigger placement animation if the user has actually scrolled!
        if (!hasUserScrolled) return;

        const enteringWrappers = entries
          .filter(
            (entry) =>
              entry.isIntersecting &&
              !visibleWrappers.has(entry.target as HTMLElement)
          )
          .map((entry) => entry.target as HTMLElement);

        if (enteringWrappers.length === 0) return;

        // Sort in reading order according to scroll direction
        enteringWrappers.sort((a, b) => {
          const dirMult = scrollDir === "down" ? 1 : -1;
          return (a.offsetTop - b.offsetTop) * dirMult || a.offsetLeft - b.offsetLeft;
        });

        const width = window.innerWidth;
        const cols = width < 640 ? 1 : width < 1024 ? 2 : 4;
        const spread =
          cols === 4 ? [-70, -25, 25, 70] : cols === 2 ? [-30, 30] : [0];
        const baseY = width < 640 ? 140 : width < 1024 ? 160 : 180;

        enteringWrappers.forEach((wrapper, index) => {
          visibleWrappers.add(wrapper);
          const card = wrapper.querySelector<HTMLElement>(".gallery-slot-card");
          if (!card) return;

          const rect = wrapper.getBoundingClientRect();
          const gridRect = gridEl.getBoundingClientRect();
          const relX = rect.left - gridRect.left;
          const colIdx = Math.max(
            0,
            Math.min(cols - 1, Math.floor((relX / (gridRect.width || 1)) * cols))
          );

          const xSpread = spread[colIdx] || 0;
          const yOffset = scrollDir === "down" ? baseY : -baseY;
          const delay = Math.min(0.28, index * 0.05);
          const duration = 1.0 + (colIdx % 2) * 0.1;

          card.style.setProperty("--slot-x", `${xSpread}px`);
          card.style.setProperty("--slot-y", `${yOffset}px`);
          card.style.setProperty("--slot-scale", "1.12");
          card.style.setProperty("--slot-del", `${delay.toFixed(2)}s`);
          card.style.setProperty("--slot-dur", `${duration.toFixed(2)}s`);

          card.classList.remove("slot-entering-down", "slot-entering-up");
          requestAnimationFrame(() => {
            card.classList.add(
              scrollDir === "down" ? "slot-entering-down" : "slot-entering-up"
            );
          });
        });
      },
      {
        root: null,
        rootMargin: "40px 0px",
        threshold: 0,
      }
    );

    allWrappers.forEach((wrapper) => observer.observe(wrapper));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [displayedPhotos]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative w-full border-t border-white/10 bg-neutral-950 py-16 text-white md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-9 max-w-2xl">
          <p className="mb-3 text-sm font-semibold text-primary">
            TCE Cyclothon archive
          </p>
          <h2
            id="gallery-heading"
            className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            The rides that brought us here
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base">
            Browse 52 photographs from the 2020 and 2024 editions. Filter by
            year, then open any moment for the full story.
          </p>
        </header>

      {/* Filters and count bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {FILTER_OPTIONS.map((filter) => {
            const isSelected = activeFilter === filter.id;
            const count =
              filter.id === "all"
                ? GALLERY_PHOTOS.length
                : GALLERY_PHOTOS.filter((p) => p.year === filter.id).length;

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setVisibleCount(INITIAL_VISIBLE_COUNT);
                }}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200",
                  isSelected
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                    : "bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-white/10"
                )}
              >
                <span>{filter.label}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-mono",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-white/5 text-neutral-400"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Camera size={13} className="text-primary" />
          <span>
            Displaying {displayedPhotos.length} of {filteredPhotos.length} moments
          </span>
        </div>
      </div>

      {/* 
        STAGGERED MASONRY GRID WITH BIDIRECTIONAL SLOT-IN PLACEMENT ANIMATION
        Inspired by iamkingsleey.com/designs:
        Multi-column layout with consistent gaps, varying tile heights, 
        and smooth picture insertion into the gap on scroll up & down.
      */}
      <div
        ref={gridRef}
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 [column-fill:_balance]"
      >
        {displayedPhotos.map((photo) => {
          return (
            <div
              key={photo.id}
              data-slot-wrapper="true"
              className="gallery-slot-wrapper relative mb-4 sm:mb-5 break-inside-avoid"
            >
              <button
                type="button"
                aria-label={`Open ${photo.title} photo`}
                onClick={() => setSelectedPhoto(photo)}
                className={cn(
                  "gallery-slot-card group relative block w-full overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
                  "bg-neutral-900 border border-white/10 hover:border-primary/50",
                  "select-none transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10"
                )}
              >
                {/* Image Frame with intrinsic varying aspect ratio */}
                <div className={cn("relative w-full overflow-hidden", photo.aspectRatio)}>
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: photo.objectPosition }}
                  />

                  {/* Subtle vignette scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top badges (Always visible) */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-2.5 py-0.5 text-[10px] font-mono font-bold text-white shadow-sm">
                      <Calendar size={10} className="text-primary" />
                      {photo.year}
                    </span>

                    {/* Expand Icon Button (Revealed on hover) */}
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                      <Maximize2 size={12} />
                    </span>
                  </div>

                  {/* Default persistent minimal bottom info */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-300 pointer-events-none group-hover:opacity-0 group-focus-visible:opacity-0 transition-opacity duration-200">
                    <span className="truncate max-w-[70%] font-semibold text-white/90">
                      {photo.title}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {photo.edition}
                    </span>
                  </div>

                  {/* Hover Caption Overlay: Slides up smoothly on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 transition-all duration-300 pointer-events-none flex flex-col justify-end">
                    <div className="inline-flex items-center gap-1 text-[11px] text-primary font-medium mb-1">
                      <MapPin size={11} />
                      <span className="truncate">{photo.location}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white tracking-tight leading-snug">
                      {photo.title}
                    </h3>

                    <p className="mt-1 text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span className="inline-flex items-center gap-1">
                        <Users size={10} className="text-primary" />
                        {photo.turnout}
                      </span>
                      <span>{photo.routeDistance}</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Progressive Load More Controls */}
      <div className="mt-12 flex flex-col items-center justify-center gap-3">
        {hasMore ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((prev) =>
                  Math.min(prev + LOAD_MORE_INCREMENT, filteredPhotos.length)
                )
              }
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold",
                "bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20",
                "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              <span>
                Load More Moments (+{Math.min(LOAD_MORE_INCREMENT, remainingCount)})
              </span>
              <ChevronDown size={16} />
            </button>

            <button
              type="button"
              onClick={() => setVisibleCount(filteredPhotos.length)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold",
                "bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/15",
                "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md"
              )}
            >
              <span>Show All {filteredPhotos.length}</span>
            </button>
          </div>
        ) : filteredPhotos.length > INITIAL_VISIBLE_COUNT ? (
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-neutral-400">
              Showing all {filteredPhotos.length} archival photographs
            </span>
            <button
              type="button"
              onClick={() => setVisibleCount(INITIAL_VISIBLE_COUNT)}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/10 transition-colors"
            >
              <span>Show Fewer</span>
              <ChevronUp size={14} />
            </button>
          </div>
        ) : null}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <GalleryLightbox
          photo={selectedPhoto}
          currentIndex={selectedIndex}
          totalCount={filteredPhotos.length}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={(direction) => {
            const currentIndex = filteredPhotos.findIndex(
              (p) => p.id === selectedPhoto.id
            );
            if (currentIndex === -1) return;
            const nextIndex =
              direction === "next"
                ? (currentIndex + 1) % filteredPhotos.length
                : (currentIndex - 1 + filteredPhotos.length) %
                  filteredPhotos.length;
            setSelectedPhoto(filteredPhotos[nextIndex]);
          }}
        />
      )}
      </div>
    </section>
  );
}
