import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { RECRUITMENT_SCHEDULE } from "@/lib/constants";

export const SubmissionSuccess = () => {
  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-12">
        <div className="w-full max-w-sm mx-auto flex flex-col items-center">
          {/* 성공 아이콘 */}
          <div className="mb-8 animate-[fade-up_0.4s_ease-out]">
            <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-blue-500" strokeWidth={2.5} />
            </div>
          </div>

          {/* 제목 */}
          <div className="text-center mb-12 animate-[fade-up_0.4s_ease-out_0.1s_both]">
            <h1 className="text-2xl sm:text-[28px] font-semibold text-foreground leading-[1.3] mb-3 tracking-[-0.02em]">
              지원서가 제출되었습니다
            </h1>
            <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
              결과는 발표 일정에 맞춰<br />
              홈페이지에서 확인하실 수 있습니다
            </p>
          </div>

          {/* 발표 일정 */}
          <div className="w-full mb-8 animate-[fade-up_0.4s_ease-out_0.2s_both]">
            <div className="flex flex-col items-center gap-2 py-3">
              <span className="text-[14px] text-muted-foreground">발표 일정</span>
              <span className="text-[14px] font-medium text-foreground text-center">
                {RECRUITMENT_SCHEDULE.announcement.full}
              </span>
            </div>
          </div>

          {/* 버튼 - 하단 고정 */}
          <div className="w-full mt-auto pt-8 animate-[fade-up_0.4s_ease-out_0.3s_both]">
            <Link to="/" className="block">
              <Button 
                variant="hero" 
                size="xl"
                className="w-full h-14 text-[16px] font-semibold rounded-xl shadow-lg transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.99] bg-blue-600 text-white hover:shadow-[0_0_40px_rgb(59_130_246/0.4)]"
              >
                메인으로 돌아가기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
