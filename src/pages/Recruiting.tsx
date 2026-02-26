import Header from "@/components/shared/Header";
import PageHeroSection from "@/components/shared/PageHeroSection";
import RecruitingSection from "@/components/pages/Recruiting/RecruitingSection";
import ApplicationCTA from "@/components/pages/Recruiting/ApplicationCTA";
import Footer from "@/components/shared/Footer";
import SEO from "@/components/shared/SEO";

const Recruiting = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="모집 | KHUDA"
        description="KHUDA 신규 부원을 모집합니다. 데이터와 AI에 관심 있는 경희대학교 학생이라면 누구나 지원할 수 있습니다."
        path="/recruiting"
      />
      <Header />
      <main>
        <PageHeroSection
          title="KHUDA와 함께할 새로운 멤버를 찾습니다"
          subtitle="데이터와 AI에 관심 있는 경희대학교 학생이라면 누구나 지원할 수 있어요."
          backgroundImage="/images/headers/hello.png"
        />
        <RecruitingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Recruiting;
