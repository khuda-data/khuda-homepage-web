"use client";

import { useMemo } from "react";
import PageHeroSection from "@/components/shared/PageHeroSection";
import SponsorSection from "@/components/pages/Sponsor/SponsorSection";
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
      <main>
        <PageHeroSection
          title="KHUDA의 후원사"
          subtitle="KHUDA는 다양한 기업과 기관의 후원을 통해 구성원의 성장을 지원받고 있습니다."
          backgroundImage="/images/headers/page-header.png"
        />
        <SponsorSection sponsors={sortedSponsors} />
      </main>
    </div>
  );
};

export default Sponsor;
