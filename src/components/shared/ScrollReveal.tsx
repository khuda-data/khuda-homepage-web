import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

const ScrollReveal = ({ 
  children, 
  className, 
  delay = 0,
  threshold = SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin = "0px 0px -80px 0px"
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    rootMargin,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
