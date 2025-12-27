import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState, Suspense } from "react";
import Hero3DScene from "./Hero3DScene";

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Data", "AI", "Future", "Growth"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <Hero3DScene />
      </Suspense>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 opacity-0 animate-fade-up">
            <span className="block">Unlock Your</span>
            <span className="block mt-2">
              <span className="inline-block min-w-[200px] md:min-w-[280px] border-b-4 border-foreground pb-2 transition-all duration-500">
                {words[currentWord]}
              </span>
              <span className="text-muted-foreground">.</span>
            </span>
          </h1>

          {/* Sub text */}
          <p className="text-lg md:text-xl text-muted-foreground mb-4 opacity-0 animate-fade-up animation-delay-200">
            Since 2021
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-12 opacity-0 animate-fade-up animation-delay-400">
            KHUDA는 경희대학교 데이터분석/AI 학회입니다.<br />
            함께 성장하고, 함께 도전하며, 새로운 가능성을 만들어갑니다.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up animation-delay-600">
            <Link to="/apply">
              <Button variant="hero" className="w-full sm:w-auto rounded-md">
                지원하기
              </Button>
            </Link>
            <Button
              variant="heroOutline"
              className="w-full sm:w-auto rounded-md"
              onClick={() => scrollToSection("#curriculum")}
            >
              활동 보기
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in animation-delay-600 z-10">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
