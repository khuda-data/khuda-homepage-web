import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequiredMark } from "@/components/pages/Apply/RequiredMark";
import { APPLICATION_FORM_CONFIG, COMMON_STYLES } from "@/lib/constants";
import type { Question } from "@/lib/api";

interface PythonLevelSelectorProps {
  question: Question;
  answer: string;
  onAnswerChange: (questionId: number, value: string) => void;
}

// 단계별 색 (낮음 파랑 → 높음 빨강 그라데이션)
const LEVEL_COLORS = ["#3182F6", "#6173CD", "#9163A4", "#C0547B", "#F04452"];

export const PythonLevelSelector = ({ question, answer, onAnswerChange }: PythonLevelSelectorProps) => {
  const pythonLevels = APPLICATION_FORM_CONFIG.pythonLevels;

  return (
    <Card key={question.id} className={COMMON_STYLES.cardBase}>
      <div className={COMMON_STYLES.cardGradient}></div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-base sm:text-lg font-bold text-[#191F28] flex items-center gap-2">
          {question.question}
          {question.required && <RequiredMark />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="p-4 rounded-2xl bg-[#EBF3FF] space-y-1.5">
          <p className="text-sm font-semibold text-[#191F28]">{APPLICATION_FORM_CONFIG.pythonLevelGuide.title}</p>
          <p className="text-[13px] font-medium text-[#333D4B] leading-relaxed">
            {APPLICATION_FORM_CONFIG.pythonLevelGuide.description}
          </p>
        </div>

        <div className="space-y-2.5">
          {pythonLevels.map((level, i) => {
            const selected = answer === level.value;
            const color = LEVEL_COLORS[i] ?? "#3182F6";
            return (
              <div
                key={level.value}
                className={`group relative p-4 rounded-2xl border transition-colors duration-200 cursor-pointer min-h-[44px] ${
                  selected
                    ? "border-[#3182F6] bg-[#EBF3FF]"
                    : "border-[#E8EBED] bg-white hover:bg-[#F9FAFB]"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAnswerChange(question.id, level.value);
                }}
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span
                    className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-bold"
                    style={{ backgroundColor: `${color}1F`, color }}
                  >
                    {level.value}단계
                  </span>
                  <span className="text-sm font-semibold text-[#191F28]">{level.label}</span>
                  <span className="h-3 w-px bg-[#D1D6DB]" />
                  <span className="text-xs text-[#4E5968] leading-relaxed">{level.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
