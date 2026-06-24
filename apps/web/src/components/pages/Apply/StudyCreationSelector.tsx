import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RequiredMark } from "@/components/pages/Apply/RequiredMark";
import { Check } from "lucide-react";
import type { Question } from "@/lib/api";

interface StudyCreationSelectorProps {
  question: Question;
  answer: string;
  onAnswerChange: (questionId: number, value: string) => void;
  // 개설하고 싶은 스터디 세부 입력 (예 선택 시 같은 카드에서 작성)
  detailQuestion?: Question;
  detailAnswer?: string;
  onDetailChange?: (questionId: number, value: string) => void;
}

const OPTIONS = [
  { value: "yes", label: "예" },
  { value: "no", label: "아니오" },
] as const;

export const StudyCreationSelector = ({
  question,
  answer,
  onAnswerChange,
  detailQuestion,
  detailAnswer = "",
  onDetailChange,
}: StudyCreationSelectorProps) => {
  const select = (value: string) => {
    const next = answer === value ? "" : value;
    onAnswerChange(question.id, next);
    // 예가 아니게 되면 세부 입력 초기화
    if (next !== "yes" && detailQuestion && onDetailChange) {
      onDetailChange(detailQuestion.id, "");
    }
  };

  return (
    <Card key={question.id} className="relative rounded-2xl border border-[#E8EBED] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-bold text-[#191F28] flex items-center gap-2">
          {question.question}
          {question.required && <RequiredMark />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {OPTIONS.map((opt) => {
            const selected = answer === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  select(opt.value);
                }}
                className={`flex items-center justify-center gap-1.5 h-14 rounded-2xl border text-sm font-semibold transition-colors duration-200 ${
                  selected
                    ? "border-[#3182F6] bg-[#EBF3FF] text-[#3182F6]"
                    : "border-[#E8EBED] bg-white text-[#191F28] hover:bg-[#F9FAFB]"
                }`}
              >
                {selected && <Check className="w-4 h-4" />}
                {opt.label}
              </button>
            );
          })}
        </div>

        {answer === "yes" && detailQuestion && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <label htmlFor={`detail-${detailQuestion.id}`} className="text-sm font-semibold text-[#333D4B]">
              {detailQuestion.question}
            </label>
            <Input
              id={`detail-${detailQuestion.id}`}
              value={detailAnswer}
              onChange={(e) => {
                const value = e.target.value;
                if (detailQuestion.max_len === null || value.length <= detailQuestion.max_len) {
                  onDetailChange?.(detailQuestion.id, value);
                }
              }}
              placeholder="개설한 스터디나 소모임은 교재비와 강의비를 일부 지원받을 수 있습니다."
              maxLength={detailQuestion.max_len || undefined}
              className="h-12 min-h-[48px] rounded-xl bg-[#F2F4F6] border border-transparent focus:bg-white focus:border-[#3182F6] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-200 text-sm sm:text-base placeholder:text-[#B0B8C1]"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
