"use client";

import HeroSection from "@/components/pages/Index/HeroSection";
import AboutSection from "@/components/pages/Index/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <main>
        <HeroSection />
        <AboutSection />
      </main>
    </div>
  );
};

export default Index;
