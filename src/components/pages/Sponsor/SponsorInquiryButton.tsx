import { cn } from "@/lib/utils";

type SponsorInquiryButtonProps = {
  variant?: "default" | "hero" | "card";
  size?: "sm" | "md";
  className?: string;
  "aria-label"?: string;
};

const SponsorInquiryButton = ({
  variant = "default",
  size = "md",
  className,
  "aria-label": ariaLabel = "후원 문의 메일 작성하기",
}: SponsorInquiryButtonProps) => {
  const handleInquiry = () => {
    const recipient = "khuda.official.khu@gmail.com";
    const subject = "후원문의";
    const body = "안녕하세요, 후원 관련 문의드립니다.";
    
    // Gmail compose URL 생성
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&tf=cm`;
    const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // 새 창에서 Gmail 열기
    const opened = window.open(gmailUrl, "_blank", "noopener,noreferrer");
    // 팝업이 막히거나 Gmail 접근이 어려운 경우 기본 메일 앱으로 fallback
    if (!opened) {
      window.location.href = mailtoUrl;
    }
  };

  const sizeClasses =
    size === "sm"
      ? "text-xs px-4 py-2 min-h-[40px]"
      : "text-sm sm:text-base px-6 py-3 min-h-[44px]";

  const variantClasses =
    variant === "hero"
      ? "bg-white text-black hover:bg-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
      : variant === "card"
      ? "w-full bg-foreground text-background hover:bg-foreground/90 shadow-md hover:shadow-lg"
      : "bg-foreground text-background hover:bg-foreground/90";

  const isCard = variant === "card";
  const roundedClass = isCard ? "rounded-lg" : "rounded-full";
  const justifyClass = isCard ? "justify-between" : "justify-center";

  return (
    <button
      type="button"
      onClick={handleInquiry}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-2 font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        roundedClass,
        justifyClass,
        sizeClasses,
        variantClasses,
        className
      )}
    >
      후원 문의
      {isCard && (
        <span className="text-xs sm:text-sm opacity-70">클릭하여 문의하기</span>
      )}
    </button>
  );
};

export default SponsorInquiryButton;
