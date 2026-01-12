import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CurriculumSection from "@/components/CurriculumSection";
import RecruitingSection from "@/components/RecruitingSection";
import FAQSection from "@/components/FAQSection";
import ApplicationCTA from "@/components/ApplicationCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <CurriculumSection />
        <RecruitingSection />
        <FAQSection />
        <ApplicationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
