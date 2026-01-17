import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { APPLICATION_FORM_CONFIG, COMMON_STYLES } from "@/lib/constants";
import type { Question } from "@/lib/api";

interface ResidenceSelectorProps {
  question: Question;
  answer: string;
  onAnswerChange: (questionId: number, value: string) => void;
}

export const ResidenceSelector = ({ question, answer, onAnswerChange }: ResidenceSelectorProps) => {
  const residenceOptions = APPLICATION_FORM_CONFIG.residenceOptions;

  return (
    <Card key={question.id} className={COMMON_STYLES.cardBase}>
      <div className={COMMON_STYLES.cardGradient}></div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-xl flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary" />
          {question.question}
          {question.required && <span className="text-destructive">*</span>}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {APPLICATION_FORM_CONFIG.residenceDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <Select
          value={answer}
          onValueChange={(value) => onAnswerChange(question.id, value)}
          required={question.required}
        >
          <SelectTrigger 
            className={`h-14 rounded-2xl text-base font-medium transition-all duration-200 ease-out transform ${
              answer
                ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/60 shadow-md shadow-primary/10 scale-[1.01]"
                : "bg-secondary/20 border-2 border-border/40 hover:border-primary/30 hover:bg-secondary/30 hover:scale-[1.01] active:scale-[0.99]"
            } focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none focus:scale-[1.01]`}
          >
            <div className="flex items-center gap-2.5 flex-1">
              {answer && (
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
              )}
              <SelectValue placeholder={APPLICATION_FORM_CONFIG.commonTexts.selectRegion} />
            </div>
          </SelectTrigger>
          <SelectContent 
            className="rounded-2xl border-2 border-border/50 bg-card/95 backdrop-blur-md shadow-xl max-h-[320px] p-2"
            position="popper"
          >
            {residenceOptions.map((option) => (
              <SelectItem 
                key={option}
                value={option} 
                className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
