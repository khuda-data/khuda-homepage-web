import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ApplicationHeaderProps {
  onSaveDraft: () => void;
  isSubmitting: boolean;
  submitDisabled: boolean;
  // 제출 버튼이 트리거할 form의 id (헤더가 form 바깥에 있어 form 속성으로 연결)
  formId: string;
}

export const ApplicationHeader = ({ onSaveDraft, isSubmitting, submitDisabled, formId }: ApplicationHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8EBED] bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 md:px-12 h-12 sm:h-16 md:h-18 lg:h-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[#8B95A1] hover:text-[#191F28] transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">메인으로</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSaveDraft}
            className="h-10 px-3.5 rounded-xl bg-[#F2F4F6] text-[#4E5968] text-sm font-semibold transition-colors duration-200 hover:bg-[#E8EBED]"
          >
            임시저장
          </button>
          <button
            type="submit"
            form={formId}
            disabled={submitDisabled}
            className="h-10 px-4 rounded-xl bg-[#3182F6] text-white text-sm font-semibold transition-colors duration-200 hover:bg-[#2272EB] disabled:bg-[#D1D6DB] disabled:text-white"
          >
            {isSubmitting ? "제출 중..." : "지원서 제출"}
          </button>
        </div>
      </div>
    </header>
  );
};
