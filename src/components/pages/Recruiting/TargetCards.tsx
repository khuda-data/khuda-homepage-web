import { memo } from "react";
import { BookOpen, CalendarClock, Trophy } from "lucide-react";
import { RECRUITMENT_INFO } from "@/lib/constants";

const TARGET_ICONS = [BookOpen, CalendarClock, Trophy] as const;

const TargetCards = memo(() => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      {RECRUITMENT_INFO.targetCards.map((card, index) => {
        const Icon = TARGET_ICONS[index];
        return (
          <div
            key={index}
            className="bg-[#1a1a1a] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 text-center flex flex-col items-center"
          >
            {/* Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-red-400/20 via-purple-400/20 to-blue-400/20 border border-white/10 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 lg:mb-8">
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-purple-400" />
            </div>
            {/* Description */}
            <p className="text-xs sm:text-sm md:text-[15px] lg:text-base text-white/90 leading-relaxed whitespace-pre-line break-words font-medium w-full">
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
