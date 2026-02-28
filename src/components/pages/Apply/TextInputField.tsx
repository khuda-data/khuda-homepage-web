import { Input } from "@/components/ui/input";
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
      <Label htmlFor={questionId} className="text-xs sm:text-sm font-semibold flex items-center flex-wrap gap-2">
        {question.question}
        {question.required && <span className="text-blue-500">*</span>}
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
        className="w-full h-11 sm:h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-blue-600/60 focus:outline-none transition-all duration-200 ease-out focus:scale-[1.005] focus:shadow-md focus:shadow-blue-600/10 text-sm sm:text-base min-h-[44px]"
      />
      {isPhoneField && (
        <p className="text-xs text-muted-foreground mt-1">하이픈(-)을 포함하여 입력해주세요. 예: 010-1234-5678</p>
      )}
    </div>
  );
};
