import Header from "@/components/shared/Header";
import HeroSection from "@/components/pages/Index/HeroSection";
import AboutSection from "@/components/pages/Index/AboutSection";
import Footer from "@/components/shared/Footer";
import SEO from "@/components/shared/SEO";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KHUDA",
  description: "KHUDA는 인공지능과 데이터 분석을 기반으로 실전 프로젝트와 협업을 통해 성장하는 경희대학교 데이터·AI 학술 동아리입니다.",
  url: "https://khuda.co.kr",
  logo: "https://khuda.co.kr/images/logos/khuda-logo.png",
  sameAs: ["https://www.instagram.com/khuda_official"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KHUDA",
  url: "https://khuda.co.kr",
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="KHUDA"
        path="/"
        jsonLd={[organizationJsonLd, websiteJsonLd]}
      />
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
