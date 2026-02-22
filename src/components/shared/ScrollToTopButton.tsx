import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 300px 이상 스크롤했을 때 버튼 표시
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50",
        "w-7 h-7 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full",
        "border-2 border-gray-300",
        "bg-transparent hover:bg-gray-900",
        "hover:text-white hover:border-gray-900",
        "transition-all duration-300",
        "flex items-center justify-center",
        "p-0",
        "shadow-lg hover:shadow-xl",
        "group"
      )}
      aria-label="맨 위로 이동"
    >
      <ArrowUp className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-900 group-hover:text-white transition-colors duration-300" />
    </Button>
  );
};

export default ScrollToTopButton;
