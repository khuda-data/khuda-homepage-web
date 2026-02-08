import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  ariaLabel: string;
}

const NavigationArrow = ({ direction, onClick, ariaLabel }: NavigationArrowProps) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const positionClass = direction === "left" ? "-left-3 sm:left-0" : "-right-3 sm:right-0";

  return (
    <button
      onClick={onClick}
      className={`absolute ${positionClass} top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 hover:border-white/30 flex items-center justify-center transition-all duration-300 backdrop-blur-sm hover:scale-110 active:scale-95 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 touch-manipulation`}
      aria-label={ariaLabel}
    >
      <Icon className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
    </button>
  );
};

export default NavigationArrow;
