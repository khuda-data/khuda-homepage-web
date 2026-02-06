import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const IntroSection = () => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden bg-background scroll-mt-16"
    >
      <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20 text-center">
        <h2
          className={cn(
            "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed transition-all duration-1000 ease-out",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-foreground/60">
            경희대학교를 대표하는 데이터·AI 학회
          </span>
          <br />
          <span
            className={cn(
              "inline-block mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-all duration-1000 ease-out",
              isVisible
                ? "opacity-100 translate-y-0 delay-300"
                : "opacity-0 translate-y-4",
            )}
            style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
          >
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              KHUDA
            </span>
            <span className="text-foreground">를 소개합니다</span>
          </span>
        </h2>
      </div>
    </section>
  );
};

export default IntroSection;
