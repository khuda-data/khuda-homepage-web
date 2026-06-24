import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RequiredMark } from "@/components/pages/Apply/RequiredMark";
import { Textarea } from "@/components/ui/textarea";
import { COMMON_STYLES } from "@/lib/constants";
import { getLongTextDescription } from "@/lib/questionUtils";
import type { Question } from "@/lib/api";

interface LongTextQuestionProps {
  question: Question;
  answer: string;
  onAnswerChange: (questionId: number, value: string) => void;
}

export const LongTextQuestion = ({ question, answer, onAnswerChange }: LongTextQuestionProps) => {
  const maxLen = question.max_len || 700;
  const description = getLongTextDescription(question.question);

  return (
    <Card key={question.id} className={COMMON_STYLES.cardBase}>
      <div className={COMMON_STYLES.cardGradient}></div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-base sm:text-lg font-bold text-[#191F28] flex items-center gap-2">
          {question.question}
          {question.required && <RequiredMark />}
        </CardTitle>
        {description && (
          <CardDescription className="text-[#8B95A1] leading-relaxed">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-3 relative z-10">
        <div className="relative">
          <Textarea
            id={`question-${question.id}`}
            value={answer}
            onChange={(e) => {
              const value = e.target.value;
              if (maxLen === null || value.length <= maxLen) {
                onAnswerChange(question.id, value);
              }
            }}
            required={question.required}
            maxLength={maxLen || undefined}
            className={`min-h-[220px] sm:min-h-[280px] rounded-xl bg-[#F2F4F6] border border-transparent focus:bg-white focus:border-[#3182F6] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none pb-9 transition-colors duration-200 text-sm sm:text-base placeholder:text-[#B0B8C1] ${
              maxLen && answer.length >= maxLen * 0.9 ? "border-orange-400" : ""
            }`}
            placeholder="답변을 작성해주세요."
          />
          {maxLen && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors duration-200 ${
                answer.length >= maxLen
                  ? "bg-orange-500/10 border border-orange-500/30"
                  : answer.length > 0
                  ? "bg-[#EBF3FF] border border-[#3182F6]/20"
                  : "bg-white border border-[#E8EBED]"
              }`}>
                <span className={`text-xs font-semibold ${
                  answer.length >= maxLen
                    ? "text-orange-600"
                    : answer.length >= maxLen * 0.9
                    ? "text-orange-500"
                    : answer.length > 0
                    ? "text-[#3182F6]"
                    : "text-[#8B95A1]"
                }`}>
                  {answer.length}
                </span>
                <span className="text-xs text-[#8B95A1]">/</span>
                <span className="text-xs text-[#8B95A1]">{maxLen}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
