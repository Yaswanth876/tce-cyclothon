import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MissionCommunitySection } from "@/components/MissionCommunitySection";
import { RouteShowcaseSection } from "@/components/RouteShowcaseSection";
import { TelemetryBanner } from "@/components/TelemetryBanner";
import { RiderKitSection } from "@/components/RiderKitSection";
import { VoicesSection } from "@/components/VoicesSection";
import { SponsorsSection } from "@/components/SponsorsSection";
import { FaqSection } from "@/components/FaqSection";
import { FooterSection } from "@/components/FooterSection";
import { PreloaderManager } from "@/components/preloader/PreloaderManager";

export default function Home() {
  return (
    <>
      <PreloaderManager />
      <Navbar />
      <main>
        <HeroSection />
        <MissionCommunitySection />
        <RouteShowcaseSection />
        <TelemetryBanner />
        <RiderKitSection />
        <VoicesSection />
        <SponsorsSection />
        <FaqSection />
      </main>
      <FooterSection />
    </>
  );
}
