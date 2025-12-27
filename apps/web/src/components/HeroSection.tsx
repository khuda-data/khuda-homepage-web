import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ColorBends from "./ColorBends";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Future", "Growth", "Learning"];

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
      <div className="absolute inset-0 z-0 w-full h-full">
        <ColorBends
          colors={["#ff8c42", "#ffd700", "#00ff88", "#00d4ff", "#8b5cf6"]}
          rotation={45}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1.5}
          parallax={0.8}
          noise={0.1}
          transparent={true}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/99 to-background/98 pointer-events-none" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-white">
            <span className="block">Unlock Your</span>
            <span className="block mt-2">
              <span className="inline-block min-w-[200px] md:min-w-[280px] border-b-4 border-white pb-2 transition-all duration-500">
                {words[currentWord]}
              </span>
              <span className="text-muted-foreground">.</span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white mb-4 opacity-0 animate-fade-up animation-delay-200">
            Since 2021
          </p>
          
          <p className="text-base md:text-lg text-white max-w-xl mb-12 opacity-0 animate-fade-up animation-delay-400">
            KHUDA는 경희대학교 데이터분석/AI 학회입니다.<br />
            함께 성장하고, 함께 도전하며, 새로운 가능성을 만들어갑니다.
          </p>

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

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in animation-delay-600 z-10">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
