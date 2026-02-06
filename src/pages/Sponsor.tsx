import Header from "@/components/shared/Header";
import PageHeroSection from "@/components/shared/PageHeroSection";
import SponsorSection from "@/components/pages/Sponsor/SponsorSection";
import Footer from "@/components/shared/Footer";

const Sponsor = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHeroSection
          title="함께 성장하는 파트너, KHUDA의 후원사"
          subtitle="KHUDA와 함께 데이터·AI 생태계를 만들어가는 소중한 후원사들이에요."
        />
        <SponsorSection />
      </main>
      <Footer />
    </div>
  );
};

export default Sponsor;
