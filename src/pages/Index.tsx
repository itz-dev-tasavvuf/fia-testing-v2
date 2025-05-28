
import FloatingElements from "@/components/FloatingElements";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FounderSpotlight from "@/components/FounderSpotlight";
import FeaturesSection from "@/components/FeaturesSection";
import GlobePreview from "@/components/GlobePreview";
import AuthSection from "@/components/AuthSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <FloatingElements />
      <Header />
      <HeroSection />
      <StatsSection />
      <FounderSpotlight />
      <FeaturesSection />
      <GlobePreview />
      <AuthSection />
    </div>
  );
};

export default Index;
