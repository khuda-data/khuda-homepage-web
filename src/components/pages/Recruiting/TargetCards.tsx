import { memo } from "react";
import { BookOpen, CalendarClock, Trophy } from "lucide-react";
import { RECRUITMENT_INFO } from "@/lib/constants";

const TARGET_ICONS = [BookOpen, CalendarClock, Trophy] as const;

const TargetCards = memo(() => {
  return (
    <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 max-w-6xl mx-auto">
      {RECRUITMENT_INFO.targetCards.map((card, index) => {
        const Icon = TARGET_ICONS[index];
        return (
          <div
            key={index}
            className="bg-[#1a1a1a] rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 text-center flex flex-col items-center"
          >
            {/* Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-red-400/20 via-purple-400/20 to-blue-400/20 border border-white/10 flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
              <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-purple-400" />
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
