import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";
import { APPLICATION_FORM_CONFIG, COMMON_STYLES } from "@/lib/constants";
import { getLongTextDescription } from "@/lib/questionUtils";
import type { Question } from "@/lib/api";

interface LongTextQuestionProps {
  question: Question;
  answer: string;
  onAnswerChange: (questionId: number, value: string) => void;
}

export const LongTextQuestion = ({ question, answer, onAnswerChange }: LongTextQuestionProps) => {
  const maxLen = question.max_len || 500;
  const description = getLongTextDescription(question.question);

  return (
    <Card key={question.id} className={COMMON_STYLES.cardBase}>
      <div className={COMMON_STYLES.cardGradient}></div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-xl flex items-center gap-3">
          {question.question}
          {question.required && <span className="text-destructive">*</span>}
        </CardTitle>
        {description && (
          <CardDescription>
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
            className={`min-h-[140px] sm:min-h-[180px] rounded-xl bg-secondary/30 border-border/50 focus:border-blue-600/60 focus:outline-none resize-none pr-16 sm:pr-20 transition-all duration-200 ease-out focus:scale-[1.005] focus:shadow-md focus:shadow-blue-600/10 text-sm sm:text-base ${
              maxLen && answer.length >= maxLen * 0.9 ? "border-orange-500/50" : ""
            }`}
            placeholder="답변을 작성해주세요..."
          />
          {maxLen && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-200 ease-out ${
                answer.length >= maxLen 
                  ? "bg-orange-500/10 border border-orange-500/30" 
                  : answer.length > 0
                  ? "bg-blue-600/10 border border-blue-600/20"
                  : "bg-background/80 backdrop-blur-sm border border-border/40"
              }`}>
                <span className={`text-xs font-semibold ${
                  answer.length >= maxLen 
                    ? "text-orange-600" 
                    : answer.length >= maxLen * 0.9
                    ? "text-orange-500"
                    : answer.length > 0 
                    ? "text-blue-600" 
                    : "text-muted-foreground"
                }`}>
                  {answer.length}
                </span>
                <span className="text-xs text-muted-foreground">/</span>
                <span className="text-xs text-muted-foreground">{maxLen}</span>
              </div>
            </div>
          )}
        </div>
        {maxLen && answer.length >= maxLen * 0.9 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/5 border border-orange-500/20 animate-in fade-in slide-in-from-top-1 duration-200">
            <Info className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <p className="text-xs text-orange-600">
              {answer.length >= maxLen 
                ? "최대 글자수에 도달했습니다" 
                : `${maxLen - answer.length}자 남았습니다`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
