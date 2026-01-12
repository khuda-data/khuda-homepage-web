import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

interface UnifiedActionButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const UnifiedActionButton = ({ 
  className, 
  size = "md",
  disabled = false 
}: UnifiedActionButtonProps) => {
  const sizeClasses = {
    sm: "text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 min-h-[32px] sm:min-h-[36px]",
    md: "text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 min-h-[36px] sm:min-h-[40px]",
    lg: "text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3 min-h-[40px] sm:min-h-[44px]",
  };

  const baseClasses = "relative inline-flex items-center justify-center rounded-full font-semibold overflow-hidden transition-all duration-300 group shadow-lg hover:shadow-xl whitespace-nowrap";
  
  return (
    <div className={cn(baseClasses, sizeClasses[size], className)}>
      {/* 통합 배경 그라데이션*/}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-white/30 to-blue-600 opacity-100 group-hover:opacity-90 transition-opacity" />
      
      {/* 내부 링크들 */}
      <div className="relative z-10 flex items-center w-full h-full gap-1 sm:gap-2">
        <Link
          to={ROUTES.apply}
          className={cn(
            "flex-1 h-full flex items-center justify-center transition-all duration-300",
            "px-2 sm:px-3",
            "hover:bg-red-500/20",
            disabled && "pointer-events-none opacity-50 cursor-not-allowed"
          )}
          onClick={(e) => disabled && e.preventDefault()}
        >
          <span className="text-white font-semibold whitespace-nowrap">지원하기</span>
        </Link>
        
        {/* 구분선 */}
        <span className="text-white/60 font-semibold flex-shrink-0 mx-1 sm:mx-2">|</span>
        
        <Link
          to={ROUTES.applicationResult}
          className={cn(
            "flex-1 h-full flex items-center justify-center transition-all duration-300",
            "px-2 sm:px-3",
            "hover:bg-blue-500/20"
          )}
        >
          <span className="text-white font-semibold whitespace-nowrap">합격자 조회</span>
        </Link>
      </div>
    </div>
  );
};

export default UnifiedActionButton;
