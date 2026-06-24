import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequiredMark } from "@/components/pages/Apply/RequiredMark";
import { Circle } from "lucide-react";
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
    <Card className="relative rounded-2xl border border-[#E8EBED] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-bold text-[#191F28] flex items-center gap-2">
          {APPLICATION_FORM_CONFIG.sections.applicationType}
          <RequiredMark />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
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
            <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors duration-200 flex-shrink-0 ${
              isApplicationType("yb")
                ? "border-[#3182F6] bg-[#3182F6]"
                : "border-[#D1D6DB] bg-white"
            }`}>
              {isApplicationType("yb") && (
                <Circle className="h-2 w-2 fill-current text-white" />
              )}
            </div>
            <div className="cursor-pointer font-medium flex-1 text-sm sm:text-base flex items-center gap-2 text-[#191F28]">
              <span>{APPLICATION_FORM_CONFIG.applicationTypes.yb.label(RECRUITMENT_INFO.generation)}</span>
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
            <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors duration-200 flex-shrink-0 ${
              isApplicationType("ob")
                ? "border-[#3182F6] bg-[#3182F6]"
                : "border-[#D1D6DB] bg-white"
            }`}>
              {isApplicationType("ob") && (
                <Circle className="h-2 w-2 fill-current text-white" />
              )}
            </div>
            <div className="cursor-pointer font-medium flex-1 text-sm sm:text-base flex items-center gap-2 text-[#191F28]">
              <span>{APPLICATION_FORM_CONFIG.applicationTypes.ob.label(RECRUITMENT_INFO.generation)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
