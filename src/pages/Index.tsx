import Header from "@/components/shared/Header";
import HeroSection from "@/components/pages/Index/HeroSection";
import IntroSection from "@/components/pages/Index/IntroSection";
import AboutSection from "@/components/pages/Index/AboutSection";
import RecruitCTASection from "@/components/pages/Index/RecruitCTASection";
import Footer from "@/components/shared/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <IntroSection />
        <AboutSection />
        <RecruitCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
