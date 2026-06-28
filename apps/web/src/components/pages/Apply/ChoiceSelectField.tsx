import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequiredMark } from "@/components/pages/Apply/RequiredMark";
import { Check } from "lucide-react";
import type { Question } from "@/lib/api";

interface ChoiceSelectFieldProps {
  question: Question;
  answer: string;
  onAnswerChange: (questionId: number, value: string) => void;
}

// 문항 문구를 질문과 안내문으로 나눈다. 첫 물음표까지가 질문, 그 뒤가 안내문이다.
function splitQuestion(text: string): { title: string; notice: string } {
  const idx = text.indexOf("?");
  if (idx === -1) return { title: text.trim(), notice: "" };
  return {
    title: text.slice(0, idx + 1).trim(),
    notice: text.slice(idx + 1).trim(),
  };
}

// 예/아니요처럼 정해진 선택지에서 하나를 고르는 select 문항.
// 선택지는 백엔드 options를 그대로 쓰고, 문항에 붙은 안내문은 callout으로 분리해 보여준다.
export const ChoiceSelectField = ({ question, answer, onAnswerChange }: ChoiceSelectFieldProps) => {
  const options = question.options ?? [];
  const { title, notice } = splitQuestion(question.question);

  const select = (value: string) => {
    // 같은 값을 다시 누르면 선택 해제
    onAnswerChange(question.id, answer === value ? "" : value);
  };

  return (
    <Card
      key={question.id}
      className="relative rounded-2xl border border-[#E8EBED] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden"
    >
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-bold text-[#191F28] flex items-center gap-2">
          {title}
          {question.required && <RequiredMark />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notice && (
          <div className="p-4 rounded-2xl bg-[#EBF3FF] space-y-1.5">
            <p className="text-sm font-semibold text-[#191F28]">안내사항</p>
            <p className="text-[13px] font-medium text-[#333D4B] leading-relaxed">{notice}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {options.map((opt) => {
            const selected = answer === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  select(opt);
                }}
                className={`flex items-center justify-center gap-1.5 h-14 rounded-2xl border text-sm font-semibold transition-colors duration-200 ${
                  selected
                    ? "border-[#3182F6] bg-[#EBF3FF] text-[#3182F6]"
                    : "border-[#E8EBED] bg-white text-[#191F28] hover:bg-[#F9FAFB]"
                }`}
              >
                {selected && <Check className="w-4 h-4" />}
                {opt}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
