import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CurriculumSection from "@/components/CurriculumSection";
import RecruitingSection from "@/components/RecruitingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <CurriculumSection />
        <RecruitingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
