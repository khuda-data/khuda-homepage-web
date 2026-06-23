import { memo } from "react";
import { BookOpen, CalendarCheck, Flame, LucideIcon } from "lucide-react";
import { RECRUITMENT_INFO } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  CalendarCheck,
  Flame,
};

const TargetCards = memo(() => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      {RECRUITMENT_INFO.targetCards.map((card, index) => {
        const IconComponent = card.icon ? iconMap[card.icon] : null;
        
        return (
          <div
            key={index}
            className="bg-gray-100 border border-border rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 text-center flex flex-col items-center"
          >
            {/* Icon */}
            {IconComponent && (
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center mb-3 sm:mb-4 md:mb-5 text-blue-600">
                <IconComponent className="w-full h-full" />
              </div>
            )}
            {/* Description */}
            <p className="text-xs sm:text-sm md:text-[15px] lg:text-base text-gray-900 leading-relaxed whitespace-pre-line break-words font-medium w-full">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
});

TargetCards.displayName = "TargetCards";

export default TargetCards;
