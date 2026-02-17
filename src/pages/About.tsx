import Header from "@/components/shared/Header";
import PageHeroSection from "@/components/shared/PageHeroSection";
import Footer from "@/components/shared/Footer";
import IntroductionSection from "@/components/pages/About/IntroductionSection";
import ExecutiveProfileSection from "@/components/pages/About/ExecutiveProfileSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHeroSection
          title="KHUDA를 소개합니다"
          subtitle="데이터와 AI에 관심 있는 경희대학교 학생이라면 누구나 함께할 수 있어요."
        />

        <IntroductionSection />
        <ExecutiveProfileSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
