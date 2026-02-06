import { cn } from "@/lib/utils";
import { type FeatureInfo } from "./FeatureShowcase";
import { featureVisuals } from "./featureVisuals";

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
        const visual = featureVisuals[index] || featureVisuals[0];
        const isActive = index === activeIndex;
        return (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {feature.image ? (
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={cn("w-full h-full bg-gradient-to-br", visual.gradient, "flex flex-col items-center justify-center gap-3 border border-white/10")}>
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  {visual.icon}
                </div>
                <span className="text-white/40 text-[10px] sm:text-xs font-medium tracking-wider uppercase">
                  {visual.label}
                </span>
              </div>
            )}
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
