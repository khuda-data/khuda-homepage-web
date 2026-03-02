import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Question } from "@/lib/api";

interface QuestionCardProps {
  question: Question;
  applicationType?: "yb" | "ob" | "";
  isStudyDisabled?: boolean;
  children: React.ReactNode;
}

const getCardDescription = (question: Question, applicationType: "yb" | "ob" | "", isStudyDisabled: boolean): string | null => {
  if (question.question.includes("스터디 개설") && applicationType === "ob") {
    return "KHUDA는 강의 및 교재비를 일부 지원하고 있습니다. 많은 관심과 참여 부탁드립니다.";
  }
  if (question.question.includes("트랙") && applicationType === "ob") {
    return "심화 트랙 참여를 희망하시는 경우에만 선택해주세요.";
  }
  if (isStudyDisabled) {
    return "스터디 개설을 선택하지 않으셔서 이 항목은 비활성화되었습니다.";
  }
  if (question.question.includes("소모임") || question.question.includes("스터디")) {
    return "KHUDA는 스터디 및 소모임을 적극 권장하고 있으며, KHUDA 9기에서는 더욱 강조하여 활성화할 생각입니다. (산학협력 프로젝트, SQL 스터디, 공모전 스터디 등이 예정되어 있습니다)";
  }
  if (question.question.includes("일정") && !question.question.includes("면접")) {
    return "타 동아리나, 학생회, 아르바이트, 대외활동 관련하여 서술해주세요.";
  }
  if (question.question.includes("기타 활동") || question.question.includes("활동")) {
    return "데이터 분석과 관련이 없더라도 괜찮습니다.";
  }
  if (question.question.includes("자격증") || question.question.includes("수상")) {
    return "해당 사항이 없는 경우 작성하지 않으셔도 됩니다.";
  }
  return null;
};

export const QuestionCard = ({ question, applicationType = "", isStudyDisabled = false, children }: QuestionCardProps) => {
  const description = getCardDescription(question, applicationType, isStudyDisabled);

  return (
    <Card key={question.id} className="relative border border-border shadow-lg bg-card overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl text-foreground flex items-center gap-3">
          {question.question}
          {question.required && <span className="text-blue-500">*</span>}
        </CardTitle>
        {description && (
          <CardDescription className={isStudyDisabled ? "text-muted-foreground" : ""}>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};
