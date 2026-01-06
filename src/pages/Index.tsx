import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CurriculumSection from "@/components/CurriculumSection";
import RecruitingSection from "@/components/RecruitingSection";
import FAQSection from "@/components/FAQSection";
import ApplicationCTA from "@/components/ApplicationCTA";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const NOTIFICATION_DISMISSED_KEY = "notification-dismissed";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(NOTIFICATION_DISMISSED_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = useCallback(() => {
    if (dontShowAgain) {
      localStorage.setItem(NOTIFICATION_DISMISSED_KEY, "true");
    }
    setIsOpen(false);
  }, [dontShowAgain]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <CurriculumSection />
        <RecruitingSection />
        <FAQSection />
        <ApplicationCTA />
      </main>
      <Footer />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden border-primary/20 shadow-2xl">
          <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-b border-primary/20 p-6 pb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <DialogHeader className="relative">
              <DialogTitle className="text-2xl font-bold text-foreground">
                안내사항
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="p-6 pt-5 space-y-6">
            <DialogDescription asChild>
              <div className="space-y-4">
                <p className="text-base text-foreground leading-relaxed text-center">
                  서류합격결과는 다음 일정에 개별 이메일로 전달됩니다.
                </p>

                <div className="relative rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-5 backdrop-blur-sm shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl" />
                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm text-muted-foreground mb-1.5 font-medium">
                        발표 일시
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                        1월 7일 (수요일)
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 sm:border-l sm:border-primary/20 sm:pl-6">
                      <div className="text-xs sm:text-sm text-muted-foreground mb-1.5 font-medium">
                        전달 시간
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                        18:00
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border/50 backdrop-blur-sm">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    지원서에 기재하신 이메일 주소로 개별 발송되니 확인 부탁드립니다.
                  </p>
                </div>
              </div>
            </DialogDescription>
          </div>

          <DialogFooter className="px-6 pb-6 pt-0 gap-3 items-center">
            <div className="flex items-center space-x-2 flex-1">
              <Checkbox
                id="dont-show-again"
                checked={dontShowAgain}
                onCheckedChange={(checked) => setDontShowAgain(!!checked)}
                className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="dont-show-again"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-foreground hover:text-primary transition-colors"
              >
                다시 보지 않기
              </label>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full sm:w-auto"
              >
                닫기
              </Button>
              <Button
                onClick={handleClose}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90"
              >
                확인
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
