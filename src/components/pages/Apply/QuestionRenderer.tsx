import type { Question, InterviewSchedule } from "@/lib/api";
import { InterviewDateSelector } from "@/components/pages/Apply/InterviewDateSelector";
import { ResidenceSelector } from "@/components/pages/Apply/ResidenceSelector";
import { PythonLevelSelector } from "@/components/pages/Apply/PythonLevelSelector";
import { DataAnalysisFieldSelector } from "@/components/pages/Apply/DataAnalysisFieldSelector";
import { LongTextQuestion } from "@/components/pages/Apply/LongTextQuestion";
import { StudyCreationSelector } from "@/components/pages/Apply/StudyCreationSelector";
import { TrackSelector } from "@/components/pages/Apply/TrackSelector";
import { QuestionCard } from "@/components/pages/Apply/QuestionCard";
import { QuestionField } from "@/components/pages/Apply/QuestionField";
import { TextInputField } from "@/components/pages/Apply/TextInputField";
import { getQuestionNumber } from "@/lib/questionUtils";

interface QuestionRendererProps {
  question: Question;
  answer: string;
  applicationType: "yb" | "ob" | "";
  interviewSchedule: InterviewSchedule | null;
  formData: {
    applicationType: string;
    answers: Record<string, string>;
    interviewDates: string[];
    interviewTimesByDate: Record<string, string[]>;
    selectedInterviewDate: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    applicationType: string;
    answers: Record<string, string>;
    interviewDates: string[];
    interviewTimesByDate: Record<string, string[]>;
    selectedInterviewDate: string;
  }>>;
  onAnswerChange: (questionId: number, value: string) => void;
  onCheckboxChange: (questionId: number, value: string, checked: boolean) => void;
  findInterviewQuestion: (isDate: boolean) => Question | undefined;
  findQuestionByKeywords: (keywords: string[]) => Question | undefined;
  isApplicationType: (type: "yb" | "ob") => boolean;
  getAnswer: (questionId: number | null) => string;
}

export const QuestionRenderer = ({
  question,
  answer,
  applicationType,
  interviewSchedule,
  formData,
  setFormData,
  onAnswerChange,
  onCheckboxChange,
  findInterviewQuestion,
  findQuestionByKeywords,
  isApplicationType,
  getAnswer,
}: QuestionRendererProps) => {
  const findQuestionId = (keywords: string[]): number | null => {
    const foundQuestion = findQuestionByKeywords(keywords);
    return foundQuestion ? foundQuestion.id : null;
  };
  
  const studyIntentionQuestionId = isApplicationType("ob") ? findQuestionId(["스터디 개설"]) : null;
  const studyIntentionValue = studyIntentionQuestionId ? getAnswer(studyIntentionQuestionId) : "";
  const isStudyDisabled = isApplicationType("ob") && studyIntentionValue === "no" && 
                          question.question.includes("스터디") && question.question.includes("세부");
  
  // 면접 날짜 질문 - InterviewDateSelector 컴포넌트 사용
  const interviewDatesQuestion = findInterviewQuestion(true);
  if (isApplicationType("yb") && interviewDatesQuestion && question.id === interviewDatesQuestion.id) {
    return (
      <InterviewDateSelector
        question={question}
        interviewSchedule={interviewSchedule}
        formData={formData}
        setFormData={setFormData}
      />
    );
  }

  // 면접 시간 질문 - 숨김 처리 (날짜 질문에서 함께 처리)
  const interviewTimesQuestion = findInterviewQuestion(false);
  if (interviewTimesQuestion && question.id === interviewTimesQuestion.id) {
    // YB는 날짜 질문에서 함께 처리되므로 숨김, OB는 면접이 없으므로 숨김
    return null;
  }

  if (findQuestionByKeywords(["개인정보", "동의"])?.id === question.id) {
    return null;
  }

  const isCommonQuestion = question.applicant_type === "common";

  if (isCommonQuestion && question.field_type === "text") {
    return (
      <TextInputField
        question={question}
        answer={answer}
        onAnswerChange={onAnswerChange}
      />
    );
  }

  if (question.question.includes("거주지역") || question.question.includes("거주")) {
    return (
      <ResidenceSelector
        question={question}
        answer={answer}
        onAnswerChange={onAnswerChange}
      />
    );
  }

  if (question.question.includes("파이썬") || question.question.includes("Python")) {
    return (
      <PythonLevelSelector
        question={question}
        answer={answer}
        onAnswerChange={onAnswerChange}
      />
    );
  }

  if (question.question.includes("데이터 분석") || question.question.includes("AI 분야")) {
    return (
      <DataAnalysisFieldSelector
        question={question}
        answer={answer}
        onAnswerChange={onAnswerChange}
      />
    );
  }

  const questionNumber = getQuestionNumber(question.question);
  if (questionNumber && (question.field_type === "textarea" || question.question.includes("지원 동기") || question.question.includes("도전") || question.question.includes("프로젝트"))) {
    return (
      <LongTextQuestion
        question={question}
        answer={answer}
        onAnswerChange={onAnswerChange}
      />
    );
  }

  if (question.question.includes("스터디 개설") && isApplicationType("ob")) {
    return (
      <StudyCreationSelector
        question={question}
        answer={answer}
        onAnswerChange={onAnswerChange}
      />
    );
  }

  if ((question.question.includes("트랙") || question.question.includes("심화 트랙")) && (isApplicationType("ob") || isApplicationType("yb"))) {
    return (
      <TrackSelector
        question={question}
        answer={answer}
        applicationType={applicationType}
        onAnswerChange={onAnswerChange}
      />
    );
  }

  // 일반 질문 카드
  return (
    <QuestionCard
      question={question}
      applicationType={applicationType}
      isStudyDisabled={isStudyDisabled}
    >
      <QuestionField
        question={question}
        answer={answer}
        isStudyDisabled={isStudyDisabled}
        onAnswerChange={onAnswerChange}
        onCheckboxChange={onCheckboxChange}
      />
    </QuestionCard>
  );
};
