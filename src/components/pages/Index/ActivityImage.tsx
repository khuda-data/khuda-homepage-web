import { cn } from "@/lib/utils";
import { type FeatureInfo } from "./FeatureShowcase";
import { Image } from "lucide-react";

interface ActivityImageProps {
  features: FeatureInfo[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

const ActivityImage = ({ features, activeIndex, onIndexChange }: ActivityImageProps) => {
  return (
    <div className="w-full md:w-[55%] aspect-[16/10] sm:aspect-[4/3] md:aspect-[3/2] rounded-xl shrink-0 overflow-hidden relative shadow-xl">
      {/* 이미지 레이어들 (crossfade) */}
      {features.map((feature, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <div className="w-full h-full bg-black flex flex-col items-center justify-center gap-3">
              <Image className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-gray-500" />
              <p className="text-gray-500 text-xs sm:text-sm">이미지 준비 중</p>
            </div>
          </div>
        );
      })}

      {/* 인디케이터 dots */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className={cn(
              "transition-all duration-300 rounded-full",
              index === activeIndex
                ? "w-6 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to feature ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityImage;
