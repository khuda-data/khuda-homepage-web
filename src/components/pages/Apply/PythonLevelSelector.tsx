import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Circle } from "lucide-react";
import { APPLICATION_FORM_CONFIG, COMMON_STYLES } from "@/lib/constants";
import type { Question } from "@/lib/api";

interface PythonLevelSelectorProps {
  question: Question;
  answer: string;
  onAnswerChange: (questionId: number, value: string) => void;
}

export const PythonLevelSelector = ({ question, answer, onAnswerChange }: PythonLevelSelectorProps) => {
  const pythonLevels = APPLICATION_FORM_CONFIG.pythonLevels;

  return (
    <Card key={question.id} className={COMMON_STYLES.cardBase}>
      <div className={COMMON_STYLES.cardGradient}></div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-lg sm:text-xl flex items-center gap-3">
          {question.question}
          {question.required && <span className="text-blue-500">*</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <div className="flex-1 space-y-1.5">
              <p className="text-sm font-medium text-foreground">{APPLICATION_FORM_CONFIG.pythonLevelGuide.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {APPLICATION_FORM_CONFIG.pythonLevelGuide.description}
                <span className="block mt-1.5 font-medium text-foreground/90">{APPLICATION_FORM_CONFIG.pythonLevelGuide.note}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          {pythonLevels.map((level) => (
            <div 
              key={level.value} 
              className={`group relative flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ease-out cursor-pointer transform min-h-[44px] ${
                answer === level.value
                  ? "border-blue-500 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-blue-500/10 scale-[1.02]"
                  : "border-border/50 hover:border-blue-500/30 hover:bg-secondary/20 hover:scale-[1.01] active:scale-[0.99]"
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAnswerChange(question.id, level.value);
              }}
            >
              <div className={`mt-0.5 h-5 w-5 sm:h-4 sm:w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                answer === level.value
                  ? "border-blue-500 bg-blue-500"
                  : "border-border"
              }`}>
                {answer === level.value && (
                  <Circle className="h-2.5 w-2.5 fill-current text-blue-500-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="cursor-pointer flex items-start gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-foreground">
                        {level.label}
                      </span>
                      {answer === level.value && (
                        <Badge className="bg-blue-600 text-white text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                          선택됨
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {level.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
