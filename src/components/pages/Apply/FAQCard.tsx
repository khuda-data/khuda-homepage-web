import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Instagram, Copy, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/form-utils";
import { 
  CONTACT_EMAIL, 
  CONTACT_PHONE, 
  APPLICATION_FORM_CONFIG,
  SOCIAL_LINKS,
} from "@/lib/constants";

export const FAQCard = () => {
  const { toast } = useToast();

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    const success = await copyToClipboard(CONTACT_EMAIL);
    if (success) {
      toast({
        title: "복사되었습니다",
        description: "이메일 주소가 클립보드에 복사되었습니다.",
        duration: 1000,
      });
    } else {
      toast({
        title: "복사 실패",
        description: "이메일 주소 복사에 실패했습니다.",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  return (
    <Card className="relative border border-border shadow-lg bg-card overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <CardTitle className="text-xl text-foreground">{APPLICATION_FORM_CONFIG.sections.faq}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
            <p className="font-semibold mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
              Q. 학기 중 세션은 어디서 진행되나요?
            </p>
            <p className="text-muted-foreground">A. 국제캠퍼스에서 진행되며, 구체적 일정과 장소는 합격자 발표 시 안내드립니다.</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
            <p className="font-semibold mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
              Q. 활동비가 있나요?
            </p>
            <p className="text-muted-foreground">A. YB 학회비 45,000원 / OB 학회비 5,000원으로 합격자 발표 시 안내드립니다.</p>
          </div>
        </div>
        <div className="pt-6 border-t border-border/50">
          <p className="text-sm font-semibold text-foreground mb-4 text-center">문의는 SNS 또는 운영진 연락처로 연락바랍니다!</p>
          <div className="space-y-2">
            <a 
              href={SOCIAL_LINKS.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 hover:border-primary/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Instagram className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Instagram</p>
                <p className="text-xs text-muted-foreground">@khu_da.official</p>
              </div>
            </a>
            <a 
              href={`mailto:${CONTACT_EMAIL}`} 
              className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 hover:border-primary/30 transition-all group cursor-pointer relative"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">이메일</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopyEmail(e);
                    }}
                    className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/70 bg-muted/30 hover:bg-muted/50 px-1.5 py-0.5 rounded transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    복사
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{CONTACT_EMAIL}</p>
              </div>
            </a>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">운영진 연락처</p>
                <p className="text-xs text-muted-foreground">회장 조윤수 {CONTACT_PHONE.회장} / 부회장 신진수 {CONTACT_PHONE.부회장}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
