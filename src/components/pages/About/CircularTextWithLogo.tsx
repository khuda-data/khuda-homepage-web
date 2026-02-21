import CircularText from "@/components/CircularText";

interface CircularTextWithLogoProps {
  text?: string;
  spinDuration?: number;
  onHover?: "speedUp" | "slowDown" | "pause" | "goBonkers";
  className?: string;
}

const CircularTextWithLogo = ({
  text = "CONNECTION*PASSION*VALUE*",
  spinDuration = 80,
  onHover = "speedUp",
  className = "",
}: CircularTextWithLogoProps) => {
  return (
    <div className={`relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px] flex items-center justify-center ${className}`}>
      <CircularText
        text={text}
        onHover={onHover}
        spinDuration={spinDuration}
        className="custom-class"
      />
      {/* 원 중앙에 로고 배치 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/images/khuda-ico.png"
          alt="KHUDA Logo"
          className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain"
        />
      </div>
    </div>
  );
};

export default CircularTextWithLogo;
