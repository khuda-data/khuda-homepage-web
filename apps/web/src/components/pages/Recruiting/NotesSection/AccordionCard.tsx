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
    <div className="bg-gray-100 border border-border rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden self-start">
      <button
        onClick={onToggle}
        className="w-full p-2.5 sm:p-3 md:p-4 lg:p-5 flex items-center justify-between gap-2 sm:gap-3 hover:bg-gray-200 transition-colors"
      >
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 text-left">
          {title}
        </h3>
        <ChevronDown
          className={cn(
            "w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0",
            isOpen && "transform rotate-180"
          )}
        />
      </button>
      
      {isOpen && (
        <div className="px-2.5 sm:px-3 md:px-4 lg:px-5 pb-2.5 sm:pb-3 md:pb-4 lg:pb-5 space-y-3 sm:space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionCard;
