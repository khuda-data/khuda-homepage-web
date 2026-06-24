"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequiredMark } from "@/components/pages/Apply/RequiredMark";
import { Check } from "lucide-react";
import type { Question } from "@/lib/api";

interface ConfirmChecklistFieldProps {
  question: Question;
  answer: string; // 체크된 항목들의 JSON 배열 문자열
  onAnswerChange: (questionId: number, value: string) => void;
}

const parseChecked = (raw: string): string[] => {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((t) => typeof t === "string") : [];
  } catch {
    return [];
  }
};

export const ConfirmChecklistField = ({
  question,
  answer,
  onAnswerChange,
}: ConfirmChecklistFieldProps) => {
  const options = question.options ?? [];
  const checked = parseChecked(answer);

  const toggle = (option: string) => {
    const next = checked.includes(option)
      ? checked.filter((o) => o !== option)
      : [...checked, option];
    onAnswerChange(question.id, JSON.stringify(next));
  };

  return (
    <Card className="relative rounded-2xl border border-[#E8EBED] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-bold text-[#191F28] flex items-center gap-2">
          {question.question}
          {question.required && <RequiredMark />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {options.map((option) => {
          const isChecked = checked.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle(option);
              }}
              className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors duration-200 ${
                isChecked
                  ? "border-[#3182F6] bg-[#EBF3FF]"
                  : "border-[#E8EBED] bg-white hover:bg-[#F9FAFB]"
              }`}
            >
              <span
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-colors duration-200 ${
                  isChecked ? "border-[#3182F6] bg-[#3182F6]" : "border-[#D1D6DB] bg-white"
                }`}
              >
                {isChecked && <Check className="h-3.5 w-3.5 text-white" />}
              </span>
              <span className={`text-sm sm:text-[15px] font-medium ${isChecked ? "text-[#191F28]" : "text-[#4E5968]"}`}>
                {option}
              </span>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
};
