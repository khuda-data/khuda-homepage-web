import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle } from "lucide-react";
import { APPLICATION_FORM_CONFIG } from "@/lib/constants";
import type { Question } from "@/lib/api";

interface BasicInfoCardProps {
  questions: Question[];
  children: React.ReactNode;
}

export const BasicInfoCard = ({ questions, children }: BasicInfoCardProps) => {
  if (questions.length === 0) return null;

  return (
    <Card className="relative border border-border shadow-lg bg-card overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl text-foreground flex items-center gap-3">
          <UserCircle className="w-5 h-5 text-primary" />
          {APPLICATION_FORM_CONFIG.sections.basicInfo}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          지원에 필요한 기본 정보를 입력해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};
