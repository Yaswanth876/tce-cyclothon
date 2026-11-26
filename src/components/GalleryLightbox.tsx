"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Users, Award, Camera } from "lucide-react";
import { GalleryPhoto } from "@/data/galleryData";

interface GalleryLightboxProps {
  photo: GalleryPhoto;
  currentIndex?: number;
  totalCount?: number;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export function GalleryLightbox({
  photo,
  currentIndex,
  totalCount,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const touchStartXRef = useRef<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNavigate]);

  // Lock background scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    // Minimum swipe distance of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left -> next
        onNavigate("next");
      } else {
        // Swiped right -> prev
        onNavigate("prev");
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Controls */}
      <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
        {/* Index counter */}
        {currentIndex !== undefined && totalCount !== undefined ? (
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 text-xs font-mono text-neutral-300 shadow-lg">
            <Camera size={13} className="text-primary" />
            <span>
              {currentIndex + 1} / {totalCount}
            </span>
          </div>
        ) : (
          <div />
        )}

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-all duration-200"
          aria-label="Close photo preview"
        >
          <X size={20} />
        </button>
      </div>

      {/* Prev / Next buttons */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate("prev");
        }}
        className="absolute left-3 sm:left-6 z-50 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-all duration-200"
        aria-label="Previous photo"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate("next");
        }}
        className="absolute right-3 sm:right-6 z-50 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-all duration-200"
        aria-label="Next photo"
      >
        <ChevronRight size={24} />
      </button>

      {/* Main Content Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col rounded-3xl overflow-hidden bg-neutral-900 border border-white/15 shadow-2xl"
      >
        {/* Image Frame */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] bg-black/70 overflow-hidden flex items-center justify-center">
          <Image
            src={photo.imageUrl}
            alt={photo.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
            priority
          />
        </div>

        {/* Editorial Information Bar */}
        <div className="p-5 sm:p-7 bg-neutral-900/95 border-t border-white/10 overflow-y-auto max-h-[35vh]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 border border-primary/40 px-3 py-0.5 text-xs font-mono font-bold text-primary">
                <Calendar size={12} />
                {photo.year} · {photo.edition}
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                {photo.theme}
              </span>
            </div>

            <span className="text-xs font-mono text-neutral-400">
              Photographer: {photo.photographer}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {photo.title}
          </h3>

          <p className="mt-1.5 text-sm sm:text-base text-neutral-300 leading-relaxed">
            {photo.caption}
          </p>

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-primary" />
              <span>{photo.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={13} className="text-primary" />
              <span>{photo.turnout}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award size={13} className="text-primary" />
              <span>{photo.routeDistance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
