import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MissionSection } from "@/components/MissionSection";
import { RouteShowcaseSection } from "@/components/RouteShowcaseSection";
import { TelemetryBanner } from "@/components/TelemetryBanner";
import { RiderKitSection } from "@/components/RiderKitSection";
import { GalleryMasonry } from "@/components/GalleryMasonry";
import { CyclothonHistorySection } from "@/components/CyclothonHistorySection";
import { SponsorsSection } from "@/components/SponsorsSection";
import { FaqSection } from "@/components/FaqSection";
import { FooterSection } from "@/components/FooterSection";
import { PreloaderManager } from "@/components/preloader/PreloaderManager";
import { ScrollCyclistProgress } from "@/components/ScrollCyclistProgress";

export default function Home() {
  return (
    <>
      <PreloaderManager />
      <ScrollCyclistProgress />
      <Navbar />
      <main>
        <HeroSection />
        <MissionSection />
        <RouteShowcaseSection />
        <TelemetryBanner />
        <RiderKitSection />
        <GalleryMasonry />
        <CyclothonHistorySection />
        <SponsorsSection />
        <FaqSection />
      </main>
      <FooterSection />
    </>
  );
}
