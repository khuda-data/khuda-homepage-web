import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APPLICATION_FORM_CONFIG } from "@/lib/constants";
import type { Question } from "@/lib/api";

interface BasicInfoCardProps {
  questions: Question[];
  children: React.ReactNode;
}

export const BasicInfoCard = ({ questions, children }: BasicInfoCardProps) => {
  if (questions.length === 0) return null;

  return (
    <Card className="relative rounded-2xl border border-[#E8EBED] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-bold text-[#191F28]">
          {APPLICATION_FORM_CONFIG.sections.basicInfo}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};
