import { cn } from "@/lib/utils";
import { type FeatureInfo } from "./FeatureShowcase";

interface ActivityListProps {
  features: FeatureInfo[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

const ActivityList = ({ features, activeIndex, onIndexChange }: ActivityListProps) => {
  return (
    <div className="w-full md:w-[45%] flex flex-col justify-start space-y-4 sm:space-y-5 md:space-y-6">
      {features.map((feature, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={feature.title}
            className="cursor-pointer transition-all duration-300 ease-out group/item"
            onClick={() => onIndexChange(index)}
            onMouseEnter={() => onIndexChange(index)}
          >
            <h3
              className={cn(
                "text-base sm:text-lg md:text-xl font-bold leading-snug sm:leading-tight transition-all duration-300 flex items-center gap-2",
                isActive
                  ? "text-gray-900"
                  : "text-gray-300 group-hover/item:text-gray-500"
              )}
            >
              {feature.title}
              {isActive && <span className="text-blue-700 ml-1">»</span>}
            </h3>
            <p
              className={cn(
                "mt-1.5 text-xs sm:text-sm leading-relaxed sm:leading-relaxed transition-all duration-300",
                isActive
                  ? "text-gray-600"
                  : "text-gray-300 group-hover/item:text-gray-400"
              )}
            >
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityList;
