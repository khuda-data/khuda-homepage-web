import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ColorBends from "./ColorBends";
import { useEffect, useState } from "react";

const words = ["Data Skills", "AI Skills"] as const;

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0);

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
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 md:mb-6 opacity-0 animate-fade-up">
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Build Your
            </span>
            <span className="block mt-2">
              <span className="inline-block min-w-[240px] md:min-w-[320px] relative">
                <span 
                  key={currentWord}
                  className="inline-block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent border-b-4 border-white/50 pb-2 transition-all duration-700"
                >
                  {words[currentWord]}
                </span>
                <span className="text-white/60 ml-2">.</span>
              </span>
            </span>
          </h1>

          <p className="text-base md:text-xl text-white mb-3 md:mb-4 opacity-0 animate-fade-up animation-delay-200">
            Since 2021
          </p>
          
          <p className="text-sm md:text-lg text-white/90 max-w-xl mb-8 md:mb-12 opacity-0 animate-fade-up animation-delay-400 leading-relaxed">
            KHUDA는 경희대학교 데이터분석/AI 학회입니다.<br />
            <span className="text-white/70">함께 성장하고, 함께 도전하며, 새로운 가능성을 만들어갑니다.</span>
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
