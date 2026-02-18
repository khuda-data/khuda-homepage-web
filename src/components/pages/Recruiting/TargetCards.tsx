import { memo } from "react";
import { RECRUITMENT_INFO } from "@/lib/constants";

const TargetCards = memo(() => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      {RECRUITMENT_INFO.targetCards.map((card, index) => {
        return (
          <div
            key={index}
            className="bg-gray-100 border border-border rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 text-center flex flex-col items-center"
          >
            {/* Logo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 lg:mb-8">
              <img 
                src="/images/khuda-ico.png" 
                alt="KHUDA 로고" 
                className="w-full h-full object-contain"
              />
            </div>
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
