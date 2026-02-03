import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SponsorSection from "@/components/SponsorSection";
import ApplicationCTA from "@/components/ApplicationCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SponsorSection />
        <ApplicationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
