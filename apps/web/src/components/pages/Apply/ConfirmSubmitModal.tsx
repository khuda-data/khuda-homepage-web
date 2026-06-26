import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmSubmitModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

// 제출 직전 확인 모달. 제출 후에는 수정할 수 없음을 알리고, 확인을 눌러야 실제로 접수한다.
export const ConfirmSubmitModal = ({ open, onCancel, onConfirm, isSubmitting }: ConfirmSubmitModalProps) => {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, isSubmitting, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => {
          if (!isSubmitting) onCancel();
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[400px] rounded-2xl bg-white border border-[#E8EBED] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="px-7 pt-8 pb-7">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF1E8]">
            <AlertTriangle className="h-6 w-6 text-[#F2780C]" />
          </div>

          <h2 className="text-lg font-bold text-[#191F28]">지원서를 제출할까요?</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#4E5968]">
            제출한 뒤에는 내용을 수정할 수 없어요. 작성한 내용을 다시 한 번 확인해주세요.
          </p>

          <div className="mt-7 flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="h-11 flex-1 rounded-xl bg-[#F2F4F6] text-sm font-semibold text-[#4E5968] transition-colors duration-200 hover:bg-[#E8EBED] disabled:opacity-60"
            >
              취소
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isSubmitting}
              className="h-11 flex-1 rounded-xl bg-[#3182F6] text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#2272EB] disabled:bg-[#D1D6DB]"
            >
              {isSubmitting ? "제출 중..." : "제출하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
