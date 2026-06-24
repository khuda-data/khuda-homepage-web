"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequiredMark } from "@/components/pages/Apply/RequiredMark";
import { X } from "lucide-react";
import type { Question } from "@/lib/api";

interface CourseExperienceFieldProps {
  question: Question;
  answer: string; // JSON 배열 문자열로 저장
  onAnswerChange: (questionId: number, value: string) => void;
}

const parseTags = (raw: string): string[] => {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((t) => typeof t === "string") : [];
  } catch {
    return [];
  }
};

export const CourseExperienceField = ({
  question,
  answer,
  onAnswerChange,
}: CourseExperienceFieldProps) => {
  const tags = parseTags(answer);
  const [draft, setDraft] = useState("");

  const commit = (next: string[]) => onAnswerChange(question.id, JSON.stringify(next));

  const addTag = () => {
    const value = draft.trim();
    if (!value) return;
    if (!tags.includes(value)) commit([...tags, value]);
    setDraft("");
  };

  const removeTag = (target: string) => commit(tags.filter((t) => t !== target));

  // Enter 또는 쉼표로 추가, 입력칸이 비었을 때 Backspace로 마지막 칩 삭제
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && draft === "" && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <Card className="relative rounded-2xl border border-[#E8EBED] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-bold text-[#191F28] flex items-center gap-2">
          {question.question}
          {question.required && <RequiredMark />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-4 rounded-2xl bg-[#EBF3FF] space-y-1.5">
          <p className="text-sm font-semibold text-[#191F28]">면접 평가 기준 안내</p>
          <p className="text-[13px] font-medium text-[#333D4B] leading-relaxed">
            작성하신 수강 경험은 면접에서 학습 내용과 이해 정도를 확인하는 자료로 활용됩니다. 관련 수강 이력이 많을수록 평가에 더 좋게 반영됩니다.
          </p>
        </div>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder="강의명을 입력하고 Enter로 추가 (대학 전공이나 교양 수업, 부트캠프, 온라인 강의 등 형식은 자유롭게 적어주세요)"
          className="w-full h-12 rounded-xl bg-[#F2F4F6] border border-transparent px-4 focus:bg-white focus:border-[#3182F6] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-200 text-sm sm:text-base placeholder:text-[#B0B8C1]"
        />
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 animate-in fade-in duration-200">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF3FF] pl-3 pr-2 py-1.5 text-sm font-medium text-[#3182F6]"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="flex h-4 w-4 items-center justify-center rounded-full text-[#3182F6] transition-colors hover:bg-[#3182F6]/15"
                  aria-label={`${tag} 삭제`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
