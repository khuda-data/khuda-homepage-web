import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Circle } from "lucide-react";
import { getCheckboxContainerClass } from "@/lib/form-utils";
import { APPLICATION_FORM_CONFIG } from "@/lib/constants";
import type { Question } from "@/lib/api";

interface PrivacyConsentCardProps {
  question: Question;
  answer: string;
  onAnswerChange: (questionId: number, value: string) => void;
}

export const PrivacyConsentCard = ({
  question,
  answer,
  onAnswerChange,
}: PrivacyConsentCardProps) => {
  return (
    <Card key={question.id} className="relative border border-border shadow-lg bg-card overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl text-foreground flex items-center gap-3">
          <FileText className="w-5 h-5 text-primary" />
          {question.question}
          {question.required && <span className="text-destructive">*</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-secondary/30 p-6 rounded-xl border border-border/50">
          <h3 className="text-lg font-semibold mb-4 text-center">{APPLICATION_FORM_CONFIG.privacyConsent.title}</h3>
          <div className="space-y-4 text-sm leading-relaxed">
            <div>
              <p className="font-semibold mb-2">{APPLICATION_FORM_CONFIG.privacyConsent.section1.title}</p>
              <p className="mb-2 text-muted-foreground">{APPLICATION_FORM_CONFIG.privacyConsent.section1.description}</p>
              <p className="mb-2"><strong>{APPLICATION_FORM_CONFIG.privacyConsent.section1.purpose}</strong></p>
              <p><strong>{APPLICATION_FORM_CONFIG.privacyConsent.section1.items}</strong></p>
            </div>
            <div>
              <p className="font-semibold mb-2">{APPLICATION_FORM_CONFIG.privacyConsent.section2.title}</p>
              <p className="text-muted-foreground">{APPLICATION_FORM_CONFIG.privacyConsent.section2.description}</p>
            </div>
            <div>
              <p className="font-semibold mb-2">{APPLICATION_FORM_CONFIG.privacyConsent.section3.title}</p>
              <p className="text-muted-foreground">{APPLICATION_FORM_CONFIG.privacyConsent.section3.description}</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div 
            className={getCheckboxContainerClass(answer === "agree")}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAnswerChange(question.id, answer === "agree" ? "" : "agree");
            }}
          >
            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              answer === "agree"
                ? "border-primary bg-primary"
                : "border-border"
            }`}>
              {answer === "agree" && (
                <Circle className="h-2.5 w-2.5 fill-current text-primary-foreground" />
              )}
            </div>
            <div className="cursor-pointer font-medium flex-1 flex items-center gap-2">
              <span className="transition-all duration-200">{APPLICATION_FORM_CONFIG.privacyConsent.agreeText}</span>
              {answer === "agree" && (
                <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                  선택됨
                </Badge>
              )}
            </div>
          </div>
          <div 
            className={getCheckboxContainerClass(answer === "disagree")}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAnswerChange(question.id, answer === "disagree" ? "" : "disagree");
            }}
          >
            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              answer === "disagree"
                ? "border-primary bg-primary"
                : "border-border"
            }`}>
              {answer === "disagree" && (
                <Circle className="h-2.5 w-2.5 fill-current text-primary-foreground" />
              )}
            </div>
            <div className="cursor-pointer font-medium flex-1 flex items-center gap-2">
              <span className="transition-all duration-200">{APPLICATION_FORM_CONFIG.privacyConsent.disagreeText}</span>
              {answer === "disagree" && (
                <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                  선택됨
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
