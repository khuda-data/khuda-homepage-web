import { useMemo } from "react";
import Header from "@/components/shared/Header";
import PageHeroSection from "@/components/shared/PageHeroSection";
import SponsorSection from "@/components/pages/Sponsor/SponsorSection";
import Footer from "@/components/shared/Footer";
import SEO from "@/components/shared/SEO";
import { SPONSOR_DATA_BY_YEAR } from "@/data/sponsors";

const Sponsor = () => {
  const sortedSponsors = useMemo(
    () =>
      [...SPONSOR_DATA_BY_YEAR].sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        const orderA = a.order ?? Infinity;
        const orderB = b.order ?? Infinity;
        return orderA - orderB;
      }),
    []
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="후원 | KHUDA"
        description="KHUDA를 후원해주시는 기업과 기관을 소개합니다. KHUDA는 다양한 기업의 후원을 통해 구성원의 성장을 지원받고 있습니다."
        path="/sponsor"
        noindex={true}
      />
      <Header />
      <main>
        <PageHeroSection
          title="KHUDA의 후원사"
          subtitle="KHUDA는 다양한 기업과 기관의 후원을 통해 구성원의 성장을 지원받고 있습니다."
          backgroundImage="/images/headers/page-header.png"
        />
        <SponsorSection sponsors={sortedSponsors} />
      </main>
      <Footer />
    </div>
  );
};

export default Sponsor;
