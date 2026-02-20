import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SponsorInquiryButton = () => {
  const { toast } = useToast();

  return (
    <div className="flex justify-center">
      <button
        onClick={(e) => {
          e.preventDefault();
          toast({
            description: "후원 문의 기능은 준비 중입니다.",
          });
        }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-all duration-200 active:scale-[0.98] cursor-pointer"
      >
        <Mail className="w-4 h-4" />
        후원 문의
      </button>
    </div>
  );
};

export default SponsorInquiryButton;
