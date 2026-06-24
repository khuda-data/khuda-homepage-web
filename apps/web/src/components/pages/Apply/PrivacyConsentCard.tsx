import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequiredMark } from "@/components/pages/Apply/RequiredMark";
import { Circle } from "lucide-react";
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
    <Card key={question.id} className="relative rounded-2xl border border-[#E8EBED] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-bold text-[#191F28] flex items-center gap-2">
          {question.question}
          {question.required && <RequiredMark />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-2xl border border-[#E8EBED] bg-white overflow-hidden">
          <div className="px-4 sm:px-5 py-4 space-y-5 text-xs sm:text-[13px] leading-relaxed">
            <div className="space-y-2">
              <p className="font-semibold text-[#333D4B]">{APPLICATION_FORM_CONFIG.privacyConsent.section1.title}</p>
              <p className="text-[#4E5968]">{APPLICATION_FORM_CONFIG.privacyConsent.section1.description}</p>
              <div className="space-y-1.5 text-[#4E5968]">
                <p>{APPLICATION_FORM_CONFIG.privacyConsent.section1.purpose}</p>
                <p>{APPLICATION_FORM_CONFIG.privacyConsent.section1.items}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-[#333D4B]">{APPLICATION_FORM_CONFIG.privacyConsent.section2.title}</p>
              <p className="text-[#4E5968]">{APPLICATION_FORM_CONFIG.privacyConsent.section2.description}</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-[#333D4B]">{APPLICATION_FORM_CONFIG.privacyConsent.section3.title}</p>
              <p className="text-[#4E5968]">{APPLICATION_FORM_CONFIG.privacyConsent.section3.description}</p>
            </div>
          </div>
        </div>
        <div className="space-y-2.5 sm:space-y-3">
          <div 
            className={getCheckboxContainerClass(answer === "agree")}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAnswerChange(question.id, answer === "agree" ? "" : "agree");
            }}
          >
            <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors duration-200 flex-shrink-0 ${
              answer === "agree"
                ? "border-[#3182F6] bg-[#3182F6]"
                : "border-[#D1D6DB] bg-white"
            }`}>
              {answer === "agree" && (
                <Circle className="h-2 w-2 fill-current text-white" />
              )}
            </div>
            <div className="cursor-pointer font-medium flex-1 flex items-center gap-2 text-[#191F28]">
              <span>{APPLICATION_FORM_CONFIG.privacyConsent.agreeText}</span>
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
            <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors duration-200 flex-shrink-0 ${
              answer === "disagree"
                ? "border-[#3182F6] bg-[#3182F6]"
                : "border-[#D1D6DB] bg-white"
            }`}>
              {answer === "disagree" && (
                <Circle className="h-2 w-2 fill-current text-white" />
              )}
            </div>
            <div className="cursor-pointer font-medium flex-1 flex items-center gap-2 text-[#191F28]">
              <span>{APPLICATION_FORM_CONFIG.privacyConsent.disagreeText}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
