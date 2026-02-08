import { useToast } from "@/hooks/use-toast";
import { SPONSOR_PAGE_CONFIG, SPONSOR_PAGE_STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SponsorInquiryButton = () => {
  const { toast } = useToast();

  return (
    <div className={SPONSOR_PAGE_STYLES.ctaSection.container}>
      <button
        onClick={(e) => {
          e.preventDefault();
          toast({
            description: "후원 문의 기능은 준비 중입니다.",
          });
        }}
        className={cn(
          SPONSOR_PAGE_STYLES.ctaSection.button.base,
          "bg-white text-black hover:bg-white/90 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
        )}
      >
        {SPONSOR_PAGE_CONFIG.googleFormButton.text}
      </button>
    </div>
  );
};

export default SponsorInquiryButton;
