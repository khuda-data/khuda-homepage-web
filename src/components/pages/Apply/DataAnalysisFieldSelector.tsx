import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { APPLICATION_FORM_CONFIG, COMMON_STYLES } from "@/lib/constants";
import { getCheckboxContainerClass, getCheckboxIconClass } from "@/lib/form-utils";
import type { Question } from "@/lib/api";

interface DataAnalysisFieldSelectorProps {
  question: Question;
  answer: string;
  onAnswerChange: (questionId: number, value: string) => void;
}

export const DataAnalysisFieldSelector = ({ question, answer, onAnswerChange }: DataAnalysisFieldSelectorProps) => {
  const dataAnalysisFields = APPLICATION_FORM_CONFIG.dataAnalysisFields;
  
  const getArrayAnswer = (): string[] => {
    if (!answer) return [];
    try {
      return JSON.parse(answer);
    } catch {
      return [];
    }
  };

  const dataAnalysisFieldsArray = getArrayAnswer();

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const newArray = checked
      ? [...dataAnalysisFieldsArray, value]
      : dataAnalysisFieldsArray.filter((item) => item !== value);
    
    onAnswerChange(question.id, JSON.stringify(newArray));
  };

  return (
    <Card key={question.id} className={COMMON_STYLES.cardBase}>
      <div className={COMMON_STYLES.cardGradient}></div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-lg sm:text-xl flex items-center gap-3">
          {question.question}
        </CardTitle>
        <CardDescription>해당하는 항목을 모두 선택해주세요.</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-3">
          {dataAnalysisFields.map((field) => (
            <div 
              key={field} 
              className={getCheckboxContainerClass(dataAnalysisFieldsArray.includes(field))}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCheckboxChange(field, !dataAnalysisFieldsArray.includes(field));
              }}
            >
              <div className={getCheckboxIconClass(dataAnalysisFieldsArray.includes(field))}>
                {dataAnalysisFieldsArray.includes(field) && (
                  <Check className="h-3 w-3 text-blue-500-foreground" />
                )}
              </div>
              <div className="cursor-pointer flex-1 text-sm flex items-center gap-2">
                <span>{field}</span>
                {dataAnalysisFieldsArray.includes(field) && (
                  <Badge className="bg-blue-600 text-white text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                    선택됨
                  </Badge>
                )}
              </div>
            </div>
          ))}
          <div 
            className={getCheckboxContainerClass(dataAnalysisFieldsArray.some((f) => f.startsWith("기타")))}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const isSelected = dataAnalysisFieldsArray.some((f) => f.startsWith("기타"));
              const newArray = isSelected
                ? dataAnalysisFieldsArray.filter((f) => !f.startsWith("기타"))
                : [...dataAnalysisFieldsArray, "기타"];
              onAnswerChange(question.id, JSON.stringify(newArray));
            }}
          >
            <div className={getCheckboxIconClass(dataAnalysisFieldsArray.some((f) => f.startsWith("기타")))}>
              {dataAnalysisFieldsArray.some((f) => f.startsWith("기타")) && (
                <Check className="h-3 w-3 text-blue-500-foreground" />
              )}
            </div>
            <div className="cursor-pointer flex-1 text-sm flex items-center gap-2">
              <span>기타</span>
              {dataAnalysisFieldsArray.some((f) => f.startsWith("기타")) && (
                <Badge className="bg-blue-600 text-white text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                  선택됨
                </Badge>
              )}
            </div>
            {dataAnalysisFieldsArray.some((f) => f.startsWith("기타")) && (
              <Input
                placeholder="기타 항목을 입력해주세요"
                className="ml-2 flex-1 h-10 min-h-[44px] rounded-xl bg-secondary/30 border-border/50 focus:border-blue-500/60 focus:outline-none transition-all duration-200 ease-out focus:scale-[1.01] focus:shadow-md focus:shadow-blue-500/10"
                onClick={(e) => e.stopPropagation()}
                value={dataAnalysisFieldsArray.find((f) => f.startsWith("기타"))?.replace("기타: ", "") || ""}
                onChange={(e) => {
                  const otherValue = e.target.value;
                  const newArray = otherValue
                    ? [...dataAnalysisFieldsArray.filter((f) => !f.startsWith("기타")), `기타: ${otherValue}`]
                    : dataAnalysisFieldsArray.filter((f) => !f.startsWith("기타"));
                  onAnswerChange(question.id, JSON.stringify(newArray));
                }}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
