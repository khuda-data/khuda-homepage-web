import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionCardProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

const AccordionCard = ({ title, isOpen, onToggle, children }: AccordionCardProps) => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden self-start">
      <button
        onClick={onToggle}
        className="w-full p-3 sm:p-4 md:p-5 lg:p-6 flex items-center justify-between gap-2 sm:gap-3 hover:bg-white/[0.02] transition-colors"
      >
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white text-left">
          {title}
        </h3>
        <ChevronDown
          className={cn(
            "w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white/70 transition-transform duration-200 flex-shrink-0",
            isOpen && "transform rotate-180"
          )}
        />
      </button>
      
      {isOpen && (
        <div className="px-3 sm:px-4 md:px-5 lg:px-6 pb-3 sm:pb-4 md:pb-5 lg:pb-6 space-y-4 sm:space-y-5">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionCard;
