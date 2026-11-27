"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Users,
  Maximize2,
  Filter,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { GALLERY_PHOTOS, GalleryPhoto } from "@/data/galleryData";
import { GalleryLightbox } from "./GalleryLightbox";

const FILTER_TABS = [
  { id: "all", label: "All Photographs" },
  { id: "2024", label: "2024 · Season 2" },
  { id: "2020", label: "2020 · Inaugural" },
];

export function GalleryArchiveGrid() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos =
    selectedFilter === "all"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.year === selectedFilter);

  return (
    <section className="bg-deep-green py-section text-white border-t border-white/10">
      <div className="mx-auto max-w-site px-gutter">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-forest-green uppercase tracking-widest font-bold mb-1">
              <Camera size={14} />
              <span>Full Archive Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Archival Photography Records
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200",
                      selectedFilter === tab.id
                        ? "bg-forest-green text-white shadow-sm"
                        : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Multi-column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo) => (
            <article
              key={photo.id}
              onClick={() => setLightboxPhoto(photo)}
              className="group cursor-pointer rounded-card overflow-hidden bg-forest-green/20 border border-white/10 hover:border-soft-mint/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-card flex flex-col justify-between"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-deep-green">
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ objectPosition: photo.objectPosition }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-deep-green/90 via-transparent to-deep-green/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Badges on Top */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1 rounded-full bg-deep-green/80 backdrop-blur-md border border-white/15 px-2.5 py-1 text-[11px] font-mono font-bold text-white">
                    <Calendar size={11} className="text-soft-mint" />
                    {photo.year}
                  </span>

                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-deep-green/80 backdrop-blur-md border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={13} />
                  </span>
                </div>

                {/* Bottom Pill */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/80 pointer-events-none">
                  <span className="truncate max-w-[200px]">
                    {photo.location}
                  </span>
                  <span>{photo.turnout}</span>
                </div>
              </div>

              {/* Editorial Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-soft-mint font-light mb-1.5">
                    <MapPin size={12} />
                    <span>{photo.location}</span>
                  </div>

                  <h3 className="text-lg font-light text-white tracking-tight group-hover:text-soft-mint transition-colors">
                    {photo.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-white/75 line-clamp-3 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/70">
                  <span>{photo.routeDistance}</span>
                  <span className="text-white/70">
                    {photo.photographer}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <GalleryLightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
          onNavigate={(direction) => {
            const currentIndex = filteredPhotos.findIndex(
              (p) => p.id === lightboxPhoto.id
            );
            if (currentIndex === -1) return;
            const nextIndex =
              direction === "next"
                ? (currentIndex + 1) % filteredPhotos.length
                : (currentIndex - 1 + filteredPhotos.length) %
                  filteredPhotos.length;
            setLightboxPhoto(filteredPhotos[nextIndex]);
          }}
        />
      )}
    </section>
  );
}
