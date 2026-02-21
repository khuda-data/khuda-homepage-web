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
        "h-16 w-16 rounded-full",
        "bg-black text-white",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300",
        "hover:scale-110 hover:bg-gray-900",
        "flex items-center justify-center",
        "p-0",
        "border-0"
      )}
      aria-label="맨 위로 이동"
    >
      <ArrowUp className="h-7 w-7" />
    </Button>
  );
};

export default ScrollToTopButton;
