import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  ariaLabel: string;
}

const NavigationArrow = ({ direction, onClick, ariaLabel }: NavigationArrowProps) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const positionClass = direction === "left" ? "-left-4 sm:-left-6 md:-left-8" : "-right-4 sm:-right-6 md:-right-8";

  return (
    <button
      onClick={onClick}
      className={`absolute ${positionClass} top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-foreground hover:bg-foreground/90 active:bg-foreground/80 border-2 border-foreground/20 hover:border-foreground/30 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110 active:scale-95 min-h-[44px] min-w-[44px] touch-manipulation`}
      aria-label={ariaLabel}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-background" />
    </button>
  );
};

export default NavigationArrow;
