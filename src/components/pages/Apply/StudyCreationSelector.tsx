import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { APPLICATION_FORM_CONFIG, COMMON_STYLES } from "@/lib/constants";
import { getQuestionIcon } from "@/lib/questionUtils";
import type { Question } from "@/lib/api";

interface StudyCreationSelectorProps {
  question: Question;
  answer: string;
  onAnswerChange: (questionId: number, value: string) => void;
}

export const StudyCreationSelector = ({ question, answer, onAnswerChange }: StudyCreationSelectorProps) => {
  const questionIcon = getQuestionIcon(question.question);

  return (
    <Card key={question.id} className="relative border border-white/10 shadow-lg bg-black/70 backdrop-blur-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-primary/25 rounded-lg opacity-50"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-xl flex items-center gap-3">
          {questionIcon}
          {question.question}
          {question.required && <span className="text-destructive">*</span>}
        </CardTitle>
        <CardDescription>
          KHUDA는 강의 및 교재비를 일부 지원하고 있습니다. 많은 관심과 참여 부탁드립니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAnswerChange(question.id, answer === "yes" ? "" : "yes");
              }}
              className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ease-out ${
                answer === "yes"
                  ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                  : "border-border/50 bg-secondary/20 hover:border-primary/40 hover:bg-secondary/30"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                answer === "yes"
                  ? "bg-primary"
                  : "bg-secondary/40 border-2 border-border/50 group-hover:border-primary/40"
              }`}>
                {answer === "yes" ? (
                  <CheckCircle className="w-3.5 h-3.5 text-primary-foreground animate-in zoom-in-95 duration-200" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-muted-foreground/50 group-hover:border-primary/50 transition-colors" />
                )}
              </div>
              <span className={`text-sm font-semibold transition-colors duration-200 ${
                answer === "yes" ? "text-primary" : "text-foreground group-hover:text-primary/80"
              }`}>
                예
              </span>
              <span className={`text-xs mt-0.5 transition-colors duration-200 ${
                answer === "yes" ? "text-primary/70" : "text-muted-foreground"
              }`}>
                스터디 개설 희망
              </span>
              {answer === "yes" && (
                <div className="absolute top-1.5 right-1.5">
                  <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                    선택됨
                  </Badge>
                </div>
              )}
            </button>
            
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAnswerChange(question.id, answer === "no" ? "" : "no");
              }}
              className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ease-out ${
                answer === "no"
                  ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                  : "border-border/50 bg-secondary/20 hover:border-primary/40 hover:bg-secondary/30"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                answer === "no"
                  ? "bg-primary"
                  : "bg-secondary/40 border-2 border-border/50 group-hover:border-primary/40"
              }`}>
                {answer === "no" ? (
                  <CheckCircle className="w-3.5 h-3.5 text-primary-foreground animate-in zoom-in-95 duration-200" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-muted-foreground/50 group-hover:border-primary/50 transition-colors" />
                )}
              </div>
              <span className={`text-sm font-semibold transition-colors duration-200 ${
                answer === "no" ? "text-primary" : "text-foreground group-hover:text-primary/80"
              }`}>
                아니오
              </span>
              <span className={`text-xs mt-0.5 transition-colors duration-200 ${
                answer === "no" ? "text-primary/70" : "text-muted-foreground"
              }`}>
                스터디 개설 없음
              </span>
              {answer === "no" && (
                <div className="absolute top-1.5 right-1.5">
                  <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                    선택됨
                  </Badge>
                </div>
              )}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
