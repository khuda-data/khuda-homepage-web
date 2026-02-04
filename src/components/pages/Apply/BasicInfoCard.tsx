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
    <Card className="relative border border-white/10 shadow-lg bg-black/70 backdrop-blur-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-primary/25 rounded-lg opacity-50"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-xl flex items-center gap-3">
          <UserCircle className="w-5 h-5 text-primary" />
          {APPLICATION_FORM_CONFIG.sections.basicInfo}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          지원에 필요한 기본 정보를 입력해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};
