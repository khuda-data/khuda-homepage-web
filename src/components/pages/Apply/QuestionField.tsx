import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { getCheckboxContainerClass, getCheckboxIconClass } from "@/lib/form-utils";
import type { Question } from "@/lib/api";

interface QuestionFieldProps {
  question: Question;
  answer: string;
  isStudyDisabled?: boolean;
  onAnswerChange: (questionId: number, value: string) => void;
  onCheckboxChange?: (questionId: number, value: string, checked: boolean) => void;
}

export const QuestionField = ({ 
  question, 
  answer, 
  isStudyDisabled = false, 
  onAnswerChange,
  onCheckboxChange 
}: QuestionFieldProps) => {
  if (question.field_type === "text") {
    const placeholder = question.question.includes("소모임") || question.question.includes("스터디") 
      ? "ex) 자격증 스터디, 수학 스터디, 운동 소모임 등" 
      : "답변을 입력해주세요";

    return (
      <Input
        value={answer}
        onChange={(e) => {
          const value = e.target.value;
          if (question.max_len === null || value.length <= question.max_len) {
            onAnswerChange(question.id, value);
          }
        }}
        placeholder={placeholder}
        required={question.required && !isStudyDisabled}
        disabled={isStudyDisabled}
        maxLength={question.max_len || undefined}
        className={`h-12 rounded-xl border-border/50 focus:outline-none transition-all duration-200 ease-out ${
          isStudyDisabled 
            ? "bg-secondary/10 border-border/30 text-muted-foreground cursor-not-allowed opacity-50" 
            : "bg-secondary/30 focus:border-blue-500/60 focus:scale-[1.01] focus:shadow-md focus:shadow-blue-500/10"
        }`}
      />
    );
  }

  if (question.field_type === "textarea") {
    const placeholder = question.question.includes("바라는") || question.question.includes("9기에게") || question.question.includes("KHUDA에게")
      ? "KHUDA에 대한 바람이나 제안사항을 작성해주세요..." 
      : "답변을 작성해주세요...";
    return (
      <Textarea
        value={answer}
        onChange={(e) => {
          const value = e.target.value;
          if (question.max_len === null || value.length <= question.max_len) {
            onAnswerChange(question.id, value);
          }
        }}
        placeholder={placeholder}
        required={question.required && !isStudyDisabled}
        disabled={isStudyDisabled}
        maxLength={question.max_len || undefined}
        rows={5}
        className={`min-h-[100px] sm:min-h-[120px] rounded-xl border-border/50 focus:outline-none resize-none transition-all duration-200 ease-out text-sm sm:text-base ${
          isStudyDisabled 
            ? "bg-secondary/10 border-border/30 text-muted-foreground cursor-not-allowed opacity-50" 
            : "bg-secondary/30 focus:border-blue-500/60 focus:scale-[1.005] focus:shadow-md focus:shadow-blue-500/10"
        }`}
      />
    );
  }

  if (question.field_type === "checkbox_multi" && onCheckboxChange) {
    // 데이터 분석 필드는 DataAnalysisFieldSelector로 처리되므로 여기서는 다른 체크박스만 처리
    if (question.question.includes("데이터 분석") || question.question.includes("AI 분야")) {
      // 이미 DataAnalysisFieldSelector로 처리됨
      return null;
    }

    // 다른 체크박스 옵션 (예: 머신러닝 분야 등)
    if (question.question.includes("머신러닝") || question.question.includes("딥러닝")) {
      const options = ["머신러닝", "딥러닝", "자연어처리", "컴퓨터비전", "강화학습", "추천시스템"];
      const currentArray: string[] = answer ? JSON.parse(answer) : [];

      return (
        <div className="space-y-2">
          {options.map((option) => {
            const isChecked = currentArray.includes(option);
            return (
              <div
                key={option}
                className={getCheckboxContainerClass(isChecked)}
                onClick={() => onCheckboxChange(question.id, option, !isChecked)}
              >
                <div className={getCheckboxIconClass(isChecked)}>
                  {isChecked && <Check className="h-3 w-3 text-blue-500-foreground" />}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">체크박스 옵션을 설정해주세요</p>
      </div>
    );
  }

  return null;
};
