import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Circle } from "lucide-react";
import { getRadioButtonClass } from "@/lib/form-utils";
import { 
  RECRUITMENT_INFO,
  APPLICATION_FORM_CONFIG,
} from "@/lib/constants";

interface ApplicationTypeSelectorProps {
  applicationType: string;
  onApplicationTypeChange: (type: "yb" | "ob") => void;
}

export const ApplicationTypeSelector = ({ 
  applicationType, 
  onApplicationTypeChange 
}: ApplicationTypeSelectorProps) => {
  const isApplicationType = (type: "yb" | "ob") => applicationType === type;

  return (
    <Card className="relative border border-border shadow-lg bg-card overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl text-foreground flex items-center gap-3">
          <Users className="w-5 h-5 text-blue-600" />
          {APPLICATION_FORM_CONFIG.sections.applicationType}
          <span className="text-destructive">*</span>
        </CardTitle>
        <CardDescription>지원하실 분야를 선택해주세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div 
            className={getRadioButtonClass(isApplicationType("yb"))}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isApplicationType("yb")) {
                onApplicationTypeChange("yb");
              }
            }}
          >
            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              isApplicationType("yb")
                ? "border-blue-600 bg-blue-600"
                : "border-border"
            }`}>
              {isApplicationType("yb") && (
                <Circle className="h-2.5 w-2.5 fill-current text-white" />
              )}
            </div>
            <div className="cursor-pointer font-medium flex-1 text-base flex items-center gap-2">
              <span className="transition-all duration-200">{APPLICATION_FORM_CONFIG.applicationTypes.yb.label(RECRUITMENT_INFO.generation)}</span>
              {isApplicationType("yb") && (
                <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                  선택됨
                </Badge>
              )}
            </div>
          </div>
          <div 
            className={getRadioButtonClass(isApplicationType("ob"))}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isApplicationType("ob")) {
                onApplicationTypeChange("ob");
              }
            }}
          >
            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              isApplicationType("ob")
                ? "border-blue-600 bg-blue-600"
                : "border-border"
            }`}>
              {isApplicationType("ob") && (
                <Circle className="h-2.5 w-2.5 fill-current text-white" />
              )}
            </div>
            <div className="cursor-pointer font-medium flex-1 text-base flex items-center gap-2">
              <span className="transition-all duration-200">{APPLICATION_FORM_CONFIG.applicationTypes.ob.label(RECRUITMENT_INFO.generation)}</span>
              {isApplicationType("ob") && (
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
