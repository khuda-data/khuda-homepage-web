import { Input } from "@/components/ui/input";
import { RequiredMark } from "@/components/pages/Apply/RequiredMark";
import { Label } from "@/components/ui/label";
import { getPlaceholder } from "@/lib/questionUtils";
import type { Question } from "@/lib/api";

interface TextInputFieldProps {
  question: Question;
  answer: string;
  onAnswerChange: (questionId: number, value: string) => void;
}

export const TextInputField = ({ question, answer, onAnswerChange }: TextInputFieldProps) => {
  const questionId = question.id.toString();
  const isPhoneField = question.question.includes("휴대폰") || question.question.includes("전화번호");
  
  return (
    <div key={question.id} className="space-y-3 w-full">
      <Label htmlFor={questionId} className="text-sm font-semibold text-[#333D4B] flex items-center flex-wrap gap-2">
        {question.question}
        {question.required && <RequiredMark />}
      </Label>
      <Input
        id={questionId}
        value={answer}
        onChange={(e) => {
          const value = e.target.value;
          if (question.max_len === null || value.length <= question.max_len) {
            onAnswerChange(question.id, value);
          }
        }}
        placeholder={getPlaceholder(question.question)}
        required={question.required}
        maxLength={question.max_len || undefined}
        className="w-full h-12 rounded-xl bg-[#F2F4F6] border border-transparent focus:bg-white focus:border-[#3182F6] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-200 text-sm sm:text-base min-h-[48px] placeholder:text-[#B0B8C1]"
      />
      {isPhoneField && (
        <p className="text-xs text-[#8B95A1] mt-1">하이픈(-)을 포함하여 입력해주세요. 예: 010-1234-5678</p>
      )}
    </div>
  );
};
