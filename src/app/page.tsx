import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MissionCommunitySection } from "@/components/MissionCommunitySection";
import { RouteShowcaseSection } from "@/components/RouteShowcaseSection";
import { TelemetryBanner } from "@/components/TelemetryBanner";
import { RiderKitSection } from "@/components/RiderKitSection";
import { GalleryMasonry } from "@/components/GalleryMasonry";
import { CyclothonHistorySection } from "@/components/CyclothonHistorySection";
import { VoicesSection } from "@/components/VoicesSection";
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
        <MissionCommunitySection />
        <RouteShowcaseSection />
        <TelemetryBanner />
        <RiderKitSection />
        <GalleryMasonry />
        <CyclothonHistorySection />
        <VoicesSection />
        <SponsorsSection />
        <FaqSection />
      </main>
      <FooterSection />
    </>
  );
}
