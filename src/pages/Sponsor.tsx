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
          subtitle="KHUDA는 다양한 기업과 기관의 후원을 통해 구성원의 성장과 프로젝트를 지원받고 있습니다."
        />
        <SponsorSection />
      </main>
      <Footer />
    </div>
  );
};

export default Sponsor;
