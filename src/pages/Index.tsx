import Header from "@/components/shared/Header";
import HeroSection from "@/components/pages/Index/HeroSection";
import AboutSection from "@/components/pages/Index/AboutSection";
import Footer from "@/components/shared/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
