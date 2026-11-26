import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/FooterSection";
import { GalleryMasonry } from "@/components/GalleryMasonry";
import { GALLERY_STATS } from "@/data/galleryData";
import {
  Bike,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Award,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Previous Cyclothon Gallery — Historical Moments & Memories | TCE Cyclothon",
  description:
    "Explore authentic photographs, flag-off moments, and memories from previous Thiagarajar College of Engineering Cyclothon events in Madurai.",
  keywords: [
    "TCE Cyclothon gallery",
    "TCE Cyclothon photos",
    "Madurai cycling photos",
    "Thiagarajar College of Engineering cycling memories",
    "Cycle to Recycle 2024",
    "Pedal for a Purpose 2020",
  ],
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-neutral-950 text-white selection:bg-primary selection:text-white pt-24">
        {/* Editorial Hero Header */}
        <section className="relative overflow-hidden pt-12 pb-14 md:pt-16 md:pb-20 border-b border-white/10">
          {/* Subtle Ambient Backdrops */}
          <div
            className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#6E1A27]/20 blur-[150px]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Top Return Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors py-1 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
              >
                <ArrowLeft size={13} />
                <span>Back to Homepage</span>
              </Link>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-300">Previous Cyclothon Gallery</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold text-primary mb-4 backdrop-blur-md">
                  <Sparkles size={13} className="text-primary animate-pulse" />
                  <span>Official TCE Photo Archive</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                  Previous Cyclothon <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-teal-300">
                    Editorial Gallery.
                  </span>
                </h1>

                <p className="mt-4 text-base sm:text-lg text-neutral-400 font-normal leading-relaxed max-w-2xl">
                  Browse authentic photographs and memories from earlier TCE
                  Cyclothon events. From the 2020 inaugural ride for cancer
                  awareness to the massive 450+ cyclist flag-off in 2024
                  championing plastic waste recycling across Madurai.
                </p>
              </div>

              {/* Quick stats pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0">
                {GALLERY_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md min-w-[140px]"
                  >
                    <p className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
                      {stat.value}
                    </p>
                    <p className="text-[11px] text-neutral-400 font-medium mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRIMARY STAGGERED MASONRY GALLERY */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
          <GalleryMasonry />
        </div>

        {/* Retrospective Timeline Cards */}
        <section className="py-20 border-t border-white/10 bg-neutral-900/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                Archival Chronology
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
                The Story Behind Every Edition
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-neutral-400">
                Tracing how Thiagarajar College of Engineering channels cycling
                into civic and social change.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 2020 Edition */}
              <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-7 flex flex-col justify-between hover:border-pink-500/30 transition-colors">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30 mb-4">
                    March 2020 · Inaugural
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Pedal for a Purpose
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Organized on International Women&apos;s Day to create public
                    awareness of cancer prevention and healthy lifestyles among
                    women. Featured separate 20 KM and 10 KM routes starting
                    from the TCE campus.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-neutral-400 flex items-center justify-between">
                  <span>300+ Riders</span>
                  <span className="text-pink-400">Cancer Awareness</span>
                </div>
              </div>

              {/* 2024 Edition */}
              <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-7 flex flex-col justify-between hover:border-primary/40 transition-colors">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/20 text-primary border border-primary/30 mb-4">
                    October 2024 · Season 2
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Cycle to Recycle
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Emphasized waste plastic reuse and environmental
                    preservation, drawing inspiration from Padma Shri Dr. R.
                    Vasudevan&apos;s plastic-road innovations at TCE. Over 450+
                    riders pedaled through the historic 21 KM Madurai circuit.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-neutral-400 flex items-center justify-between">
                  <span>450+ Riders</span>
                  <span className="text-primary">Plastic Recycling</span>
                </div>
              </div>

              {/* 2026 Upcoming Edition */}
              <div className="rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 via-neutral-900/80 to-[#6E1A27]/20 p-7 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary text-white mb-4">
                    Upcoming · 2026 Edition
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Pedal to No Drug
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Under UN SDG 3 · Target 3.5, unifying youth against substance
                    abuse. 5 KM Fun Ride, 15 KM Challenger, and 25 KM Champion
                    routes through Thiruparankundram and Madurai.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-primary font-bold">
                    Join Next Ride
                  </span>
                  <Link
                    href="/#register"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover px-3.5 py-1.5 rounded-full transition-all"
                  >
                    <span>Register</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home CTA */}
        <section className="py-20 border-t border-white/10 text-center bg-black/60">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/20 text-primary border border-primary/30 mb-5">
              <Bike size={24} />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready to ride with us?
            </h2>

            <p className="mt-2.5 text-sm sm:text-base text-neutral-400">
              Return to the homepage to explore route elevation, kits, and
              registration details.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3 border border-white/15 transition-all"
              >
                <ArrowLeft size={16} />
                <span>Back to Homepage</span>
              </Link>
              <Link
                href="/#register"
                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-sm px-7 py-3 transition-all shadow-lg shadow-primary/25"
              >
                <span>Register for 2026 Cyclothon</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </>
  );
}
