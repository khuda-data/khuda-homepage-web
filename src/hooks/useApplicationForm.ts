import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitApplication, type Question, type InterviewSchedule } from "@/lib/api";
import { 
  RECRUITMENT_SCHEDULE, 
  RECRUITMENT_INFO,
  APPLICATION_FORM_CONFIG,
} from "@/lib/constants";
import { generateInterviewTimes } from "@/lib/form-utils";

export interface FormData {
  applicationType: string;
  answers: Record<string, string>;
  interviewDates: string[];
  interviewTimesByDate: Record<string, string[]>;
  selectedInterviewDate: string;
}

export const useApplicationForm = (questions: Question[]) => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplicationId, setSubmittedApplicationId] = useState<string | null>(null);
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);
  const [interviewSchedule, setInterviewSchedule] = useState<InterviewSchedule | null>(null);
  const [formData, setFormData] = useState<FormData>({
    applicationType: "",
    answers: {},
    interviewDates: [],
    interviewTimesByDate: {},
    selectedInterviewDate: "",
  });

  useEffect(() => {
    if (formData.applicationType !== "yb") {
      setInterviewSchedule(null);
      return;
    }

    const schedule: InterviewSchedule = {
      dates: RECRUITMENT_SCHEDULE.interview.dates,
      times: generateInterviewTimes(),
    };

    setInterviewSchedule(schedule);
  }, [formData.applicationType]);

  const findQuestionByKeywords = (keywords: string[]): Question | undefined => {
    return questions.find(q => keywords.some(keyword => q.question.includes(keyword)));
  };

  const findInterviewQuestion = (isDate: boolean): Question | undefined => {
    return questions.find(q => {
      const hasInterview = q.question.includes("면접");
      if (isDate) {
        return hasInterview && (q.question.includes("날짜") || q.question.includes("일정"));
      }
      return hasInterview && q.question.includes("시간");
    });
  };

  const isApplicationType = (type: "yb" | "ob") => formData.applicationType === type;

  const updateAnswer = (questionId: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId.toString()]: value,
      },
    }));
  };

  const handleCheckboxChange = (questionId: number, value: string, checked: boolean) => {
    const currentAnswer = formData.answers[questionId.toString()] || "[]";
    let currentArray: string[] = [];
    try {
      currentArray = JSON.parse(currentAnswer);
    } catch {
      currentArray = [];
    }
    
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter((item) => item !== value);
    
    updateAnswer(questionId, JSON.stringify(newArray));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.applicationType) {
      toast({
        title: APPLICATION_FORM_CONFIG.errorMessages.selectApplicationType.title,
        description: APPLICATION_FORM_CONFIG.errorMessages.selectApplicationType.description(RECRUITMENT_INFO.generation),
        variant: "destructive",
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: "질문을 불러오는 중입니다",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
      return;
    }

    const privacyQuestion = findQuestionByKeywords(["개인정보", "동의"]);
    if (privacyQuestion) {
      const privacyAnswer = formData.answers[privacyQuestion.id.toString()];
      if (!privacyAnswer || privacyAnswer === "disagree") {
        toast({
          title: "제출할 수 없습니다",
          description: "개인정보 수집 및 이용에 동의해주셔야 지원서를 제출할 수 있습니다.",
          variant: "destructive",
        });
        return;
      }
    }

    if (isApplicationType("yb")) {
      if (formData.interviewDates.length === 0) {
        toast({
          title: APPLICATION_FORM_CONFIG.errorMessages.selectInterviewDate.title,
          description: APPLICATION_FORM_CONFIG.errorMessages.selectInterviewDate.description,
          variant: "destructive",
        });
        return;
      }
      const hasInterviewTimes = Object.values(formData.interviewTimesByDate).some((times: string[]) => times.length > 0);
      if (!hasInterviewTimes) {
        toast({
          title: APPLICATION_FORM_CONFIG.errorMessages.selectInterviewTime.title,
          description: APPLICATION_FORM_CONFIG.errorMessages.selectInterviewTime.description,
          variant: "destructive",
        });
        return;
      }
      
      const interviewDatesQuestion = findInterviewQuestion(true);
      const interviewTimesQuestion = findInterviewQuestion(false);
      
      if (interviewDatesQuestion) {
        formData.answers[interviewDatesQuestion.id.toString()] = JSON.stringify(formData.interviewDates);
      }
      if (interviewTimesQuestion) {
        formData.answers[interviewTimesQuestion.id.toString()] = JSON.stringify(formData.interviewTimesByDate);
      }
    }

    const missingRequiredQuestions = questions.filter(q => {
      if (!q.required) return false;
      const questionId = q.id.toString();
      const answer = formData.answers[questionId];
      return !answer || answer.trim() === "" || answer === "[]" || answer === "{}";
    });

    if (missingRequiredQuestions.length > 0) {
      toast({
        title: APPLICATION_FORM_CONFIG.errorMessages.requiredFields.title,
        description: APPLICATION_FORM_CONFIG.errorMessages.requiredFields.description(missingRequiredQuestions.length),
        variant: "destructive",
      });
      return;
    }

    handleFinalSubmit();
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const filteredAnswers: Record<string, string> = {};
      const questionIds = new Set(questions.map(q => q.id.toString()));
      
      Object.keys(formData.answers).forEach(questionId => {
        if (questionIds.has(questionId)) {
          filteredAnswers[questionId] = formData.answers[questionId];
        }
      });

      const interviewDatesQuestion = findInterviewQuestion(true);
      const interviewTimesQuestion = findInterviewQuestion(false);
      
      if (isApplicationType("yb")) {
        if (interviewDatesQuestion) {
          filteredAnswers[interviewDatesQuestion.id.toString()] = JSON.stringify(formData.interviewDates);
        }
        if (interviewTimesQuestion) {
          filteredAnswers[interviewTimesQuestion.id.toString()] = JSON.stringify(formData.interviewTimesByDate);
        }
      }

      questions.forEach(question => {
        const questionId = question.id.toString();
        if (question.required && !filteredAnswers[questionId]) {
          if (interviewTimesQuestion && question.id === interviewTimesQuestion.id) {
            filteredAnswers[questionId] = JSON.stringify({});
          } else if (interviewDatesQuestion && question.id === interviewDatesQuestion.id) {
            filteredAnswers[questionId] = JSON.stringify([]);
          } else {
            filteredAnswers[questionId] = "";
          }
        }
      });

      const response = await submitApplication(formData.applicationType as "yb" | "ob", filteredAnswers);
      
      setIsSubmitting(false);
      setSubmittedApplicationId(response.application_id.toString());
      setSubmittedAt(new Date());
      setIsSubmitted(true);
      
      toast({
        title: "지원서가 제출되었습니다",
        description: `지원서 ID: ${response.application_id}`,
      });
    } catch (error) {
      setIsSubmitting(false);
      const errorMessage = error instanceof Error ? error.message : "지원서 제출 중 오류가 발생했습니다.";
      toast({
        title: "제출 실패",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const getAnswer = (questionId: number | null): string => {
    if (!questionId) return "";
    return formData.answers[questionId.toString()] || "";
  };

  const getArrayAnswer = (questionId: number | null): string[] => {
    if (!questionId) return [];
    const answer = formData.answers[questionId.toString()] || "[]";
    try {
      return JSON.parse(answer);
    } catch {
      return [];
    }
  };

  const isFormValid = (): boolean => {
    // applicationType이 선택되어야 함
    if (!formData.applicationType) return false;

    // 질문이 로드되어야 함
    if (questions.length === 0) return false;

    // 개인정보 동의 확인
    const privacyQuestion = findQuestionByKeywords(["개인정보", "동의"]);
    if (privacyQuestion) {
      const privacyAnswer = formData.answers[privacyQuestion.id.toString()];
      if (!privacyAnswer || privacyAnswer === "disagree") {
        return false;
      }
    }

    // YB인 경우 면접 일정/시간 확인
    if (isApplicationType("yb")) {
      if (formData.interviewDates.length === 0) return false;
      const hasInterviewTimes = Object.values(formData.interviewTimesByDate).some((times: string[]) => times.length > 0);
      if (!hasInterviewTimes) return false;
    }

    // 필수 항목 확인
    const missingRequiredQuestions = questions.filter(q => {
      if (!q.required) return false;
      const questionId = q.id.toString();
      const answer = formData.answers[questionId];
      return !answer || answer.trim() === "" || answer === "[]" || answer === "{}";
    });

    return missingRequiredQuestions.length === 0;
  };

  return {
    formData,
    setFormData,
    isSubmitted,
    isSubmitting,
    submittedApplicationId,
    submittedAt,
    interviewSchedule,
    updateAnswer,
    handleCheckboxChange,
    handleSubmit,
    findQuestionByKeywords,
    findInterviewQuestion,
    isApplicationType,
    getAnswer,
    getArrayAnswer,
    isFormValid,
  };
};
