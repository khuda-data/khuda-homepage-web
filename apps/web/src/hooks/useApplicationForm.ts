import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitApplication, type Question, type InterviewSchedule } from "@/lib/api";
import { 
  RECRUITMENT_SCHEDULE, 
  RECRUITMENT_INFO,
  APPLICATION_FORM_CONFIG,
} from "@/lib/constants";
import { generateInterviewTimes } from "@/utils/interview";

export interface FormData {
  applicationType: string;
  answers: Record<string, string>;
  interviewDates: string[];
  interviewTimesByDate: Record<string, string[]>;
  selectedInterviewDate: string;
}

// 임시저장 키 (localStorage). 백엔드 연동과 무관하게 작성 내용만 브라우저에 보관한다.
const DRAFT_STORAGE_KEY = "khuda-apply-draft";

// 필수 항목 중 미답변 질문 목록 반환 (handleSubmit, isFormValid 공통 사용)
// 면접 날짜/시간 문항은 answers가 아니라 interviewDates/interviewTimesByDate로 별도 검증하므로 제외한다.
const getMissingRequiredQuestions = (questions: Question[], answers: Record<string, string>): Question[] => {
  // 스터디 개설 의향이 "예"면 개설 희망 스터디 세부 입력을 조건부 필수로 본다.
  const studyIntention = questions.find(q => q.question.includes("스터디 개설"));
  const wantsStudy = studyIntention ? answers[studyIntention.id.toString()] === "yes" : false;

  return questions.filter(q => {
    if (q.field_type === "interview_date" || q.field_type === "interview_time") return false;
    const isStudyDetail = q.question.includes("개설하고 싶은");
    const required = q.required || (isStudyDetail && wantsStudy);
    if (!required) return false;
    const answer = answers[q.id.toString()];
    // 확인 체크리스트는 모든 항목이 체크되어야 통과한다.
    if (q.field_type === "checklist") {
      const options = q.options ?? [];
      let checked: string[] = [];
      try {
        checked = JSON.parse(answer || "[]");
      } catch {
        checked = [];
      }
      return options.some((option) => !checked.includes(option));
    }
    return !answer || answer.trim() === "" || answer === "[]" || answer === "{}";
  });
};

// 제출용 answers 페이로드 생성 (데이터 변환 로직 분리)
const buildSubmissionPayload = (
  questions: Question[],
  formData: FormData,
  interviewDatesQuestionId: string | null,
  interviewTimesQuestionId: string | null,
): Record<string, string> => {
  const questionIds = new Set(questions.map(q => q.id.toString()));
  const payload: Record<string, string> = {};

  // 현재 질문 목록에 해당하는 답변만 포함
  Object.keys(formData.answers).forEach(questionId => {
    if (questionIds.has(questionId)) {
      payload[questionId] = formData.answers[questionId];
    }
  });

  // YB의 경우 면접 날짜/시간 주입
  if (formData.applicationType === "yb") {
    if (interviewDatesQuestionId) {
      payload[interviewDatesQuestionId] = JSON.stringify(formData.interviewDates);
    }
    if (interviewTimesQuestionId) {
      payload[interviewTimesQuestionId] = JSON.stringify(formData.interviewTimesByDate);
    }
  }

  // 필수 항목 기본값 채우기
  questions.forEach(question => {
    const questionId = question.id.toString();
    if (question.required && !payload[questionId]) {
      if (interviewTimesQuestionId && questionId === interviewTimesQuestionId) {
        payload[questionId] = JSON.stringify({});
      } else if (interviewDatesQuestionId && questionId === interviewDatesQuestionId) {
        payload[questionId] = JSON.stringify([]);
      } else {
        payload[questionId] = "";
      }
    }
  });

  return payload;
};

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
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // 마운트 시 임시저장된 초안 복원 (SSR 안전을 위해 effect에서 처리)
  const skipNextSave = useRef(true);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as Partial<FormData>;
        setFormData((prev) => ({ ...prev, ...draft }));
        setLastSavedAt(new Date());
      }
    } catch {
      // 손상된 초안은 무시
    }
    // 마운트 시 1회만 복원
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 작성 내용 변경 시 자동 임시저장 (최초 1회는 마운트 기본값이라 건너뜀)
  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    if (isSubmitted) return;
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // 용량 초과 등은 무시
    }
  }, [formData, isSubmitted]);

  // 명시적 임시저장 (버튼용): 즉시 저장하고 저장 시각 갱신
  const saveDraft = () => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
      setLastSavedAt(new Date());
      toast({ title: "임시저장되었습니다", description: "작성 내용이 이 브라우저에 저장됐어요.", duration: 1500 });
    } catch {
      toast({ title: "임시저장 실패", description: "잠시 후 다시 시도해주세요.", variant: "destructive", duration: 1500 });
    }
  };

  const clearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // 무시
    }
  };

  useEffect(() => {
    if (formData.applicationType !== "yb") {
      setInterviewSchedule(null);
      return;
    }
    setInterviewSchedule({
      dates: RECRUITMENT_SCHEDULE.interview.dates,
      times: generateInterviewTimes(),
    });
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

  const handleDateToggle = (dateValue: string) => {
    setFormData((prev) => {
      const isSelected = prev.interviewDates.includes(dateValue);
      return {
        ...prev,
        interviewDates: isSelected
          ? prev.interviewDates.filter((d) => d !== dateValue)
          : [...prev.interviewDates, dateValue],
        selectedInterviewDate: !isSelected
          ? dateValue
          : prev.selectedInterviewDate === dateValue
          ? ""
          : prev.selectedInterviewDate,
      };
    });
  };

  const handleTimeToggle = (date: string, time: string) => {
    setFormData((prev) => {
      const currentTimes = prev.interviewTimesByDate[date] || [];
      const isSelected = currentTimes.includes(time);
      return {
        ...prev,
        interviewTimesByDate: {
          ...prev.interviewTimesByDate,
          [date]: isSelected
            ? currentTimes.filter((t) => t !== time)
            : [...currentTimes, time],
        },
      };
    });
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
    }

    const missing = getMissingRequiredQuestions(questions, formData.answers);
    if (missing.length > 0) {
      toast({
        title: APPLICATION_FORM_CONFIG.errorMessages.requiredFields.title,
        description: APPLICATION_FORM_CONFIG.errorMessages.requiredFields.description(missing.length),
        variant: "destructive",
      });
      return;
    }

    await handleFinalSubmit();
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const interviewDatesQuestion = findInterviewQuestion(true);
      const interviewTimesQuestion = findInterviewQuestion(false);
      const payload = buildSubmissionPayload(
        questions,
        formData,
        interviewDatesQuestion?.id.toString() ?? null,
        interviewTimesQuestion?.id.toString() ?? null,
      );

      const response = await submitApplication(formData.applicationType as "yb" | "ob", payload);

      setSubmittedApplicationId(response.application_id.toString());
      setSubmittedAt(new Date());
      setIsSubmitted(true);
      clearDraft();
      toast({
        title: "지원서가 제출되었습니다",
        description: `지원서 ID: ${response.application_id}`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "지원서 제출 중 오류가 발생했습니다.";
      toast({
        title: "제출 실패",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
    if (!formData.applicationType) return false;
    if (questions.length === 0) return false;

    const privacyQuestion = findQuestionByKeywords(["개인정보", "동의"]);
    if (privacyQuestion) {
      const privacyAnswer = formData.answers[privacyQuestion.id.toString()];
      if (!privacyAnswer || privacyAnswer === "disagree") return false;
    }

    if (isApplicationType("yb")) {
      if (formData.interviewDates.length === 0) return false;
      const hasInterviewTimes = Object.values(formData.interviewTimesByDate).some((times: string[]) => times.length > 0);
      if (!hasInterviewTimes) return false;
    }

    return getMissingRequiredQuestions(questions, formData.answers).length === 0;
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
    handleDateToggle,
    handleTimeToggle,
    handleSubmit,
    findQuestionByKeywords,
    findInterviewQuestion,
    isApplicationType,
    getAnswer,
    getArrayAnswer,
    isFormValid,
    saveDraft,
    lastSavedAt,
  };
};
