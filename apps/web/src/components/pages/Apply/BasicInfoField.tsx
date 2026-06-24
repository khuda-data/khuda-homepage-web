import { Input } from "@/components/ui/input";
import { RequiredMark } from "@/components/pages/Apply/RequiredMark";
import { BirthDateField } from "@/components/pages/Apply/BirthDateField";
import { DepartmentField } from "@/components/pages/Apply/DepartmentField";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getPlaceholder } from "@/lib/questionUtils";
import type { Question } from "@/lib/api";

interface BasicInfoFieldProps {
  question: Question;
  answer: string;
  onAnswerChange: (questionId: number, value: string) => void;
}

// 연락처 입력 시 자동으로 하이픈 부착 (010-1234-5678)
const formatPhone = (value: string): string => {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
};

// 기본 인적사항 필드 (카드 없이 라벨 + 입력). text / date / select 지원.
export const BasicInfoField = ({ question, answer, onAnswerChange }: BasicInfoFieldProps) => {
  const questionId = question.id.toString();
  const isPhoneField = question.question.includes("연락처") || question.question.includes("전화");

  const inputClass =
    "w-full h-12 min-h-[48px] rounded-xl bg-[#F2F4F6] border border-transparent focus:bg-white focus:border-[#3182F6] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-200 text-sm sm:text-base placeholder:text-[#B0B8C1]";

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={questionId} className="text-sm font-semibold text-[#333D4B] flex items-center gap-1">
        {question.question}
        {question.required && <RequiredMark />}
      </Label>

      {question.field_type === "date" ? (
        <BirthDateField value={answer} onChange={(value) => onAnswerChange(question.id, value)} />
      ) : question.field_type === "department" ? (
        <DepartmentField value={answer} onChange={(value) => onAnswerChange(question.id, value)} />
      ) : question.field_type === "select" ? (
        <Select value={answer} onValueChange={(value) => onAnswerChange(question.id, value)} required={question.required}>
          <SelectTrigger
            className="h-12 min-h-[48px] rounded-xl text-sm sm:text-base bg-[#F2F4F6] border border-transparent text-[#191F28] transition-colors duration-200 focus:bg-white focus:border-[#3182F6] focus:outline-none focus:ring-0 focus:ring-offset-0"
          >
            <SelectValue placeholder="선택해주세요" />
          </SelectTrigger>
          <SelectContent
            className="rounded-2xl border border-[#E8EBED] bg-white shadow-xl max-h-[320px] p-1.5"
            position="popper"
          >
            {(question.options ?? []).map((option) => (
              <SelectItem
                key={option}
                value={option}
                className="rounded-lg px-3 py-2.5 text-sm font-medium cursor-pointer transition-colors duration-150 hover:bg-[#EBF3FF] focus:bg-[#EBF3FF] data-[highlighted]:bg-[#EBF3FF] [&>span:first-child]:hidden"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={questionId}
          type="text"
          inputMode={isPhoneField ? "numeric" : undefined}
          value={answer}
          onChange={(e) => {
            const value = isPhoneField ? formatPhone(e.target.value) : e.target.value;
            if (isPhoneField || question.max_len === null || value.length <= question.max_len) {
              onAnswerChange(question.id, value);
            }
          }}
          placeholder={isPhoneField ? "010-1234-5678" : getPlaceholder(question.question)}
          required={question.required}
          maxLength={isPhoneField ? 13 : question.max_len || undefined}
          className={inputClass}
        />
      )}

    </div>
  );
};
