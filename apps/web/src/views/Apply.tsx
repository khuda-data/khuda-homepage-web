"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { APPLICATION_FORM_CONFIG } from "@/lib/constants";
import { ApplicationHeader } from "@/components/pages/Apply/ApplicationHeader";
import { ApplicationGuide } from "@/components/pages/Apply/ApplicationGuide";
import { NoticeCard } from "@/components/pages/Apply/NoticeCard";
import { ScheduleCard } from "@/components/pages/Apply/ScheduleCard";
import { ApplicationTypeSelector } from "@/components/pages/Apply/ApplicationTypeSelector";
import { SubmissionSuccess } from "@/components/pages/Apply/SubmissionSuccess";
import { PrivacyConsentCard } from "@/components/pages/Apply/PrivacyConsentCard";
import { BasicInfoCard } from "@/components/pages/Apply/BasicInfoCard";
import { BasicInfoField } from "@/components/pages/Apply/BasicInfoField";
import { QuestionLoading } from "@/components/pages/Apply/QuestionLoading";
import { QuestionRenderer } from "@/components/pages/Apply/QuestionRenderer";
import { ConfirmSubmitModal } from "@/components/pages/Apply/ConfirmSubmitModal";
import { useApplicationQuestions } from "@/hooks/useApplicationQuestions";
import { useApplicationForm } from "@/hooks/useApplicationForm";
import { trackApplicationStart } from "@/utils/analytics";

// 질문 로딩 중 스켈레톤 카드
const QuestionSkeleton = ({ count = 2 }: { count?: number }) => (
  <div className="space-y-6 sm:space-y-8 animate-pulse">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="h-5 w-2/5 bg-muted rounded" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-4/5 bg-muted rounded" />
          <div className="h-10 w-full bg-muted rounded" />
        </div>
      </div>
    ))}
  </div>
);

const VALID_TYPES = ["yb", "ob"] as const;
type ValidType = (typeof VALID_TYPES)[number];
const isValidType = (v: string | null): v is ValidType =>
  VALID_TYPES.includes(v as ValidType);

const Apply = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [applicationType, setApplicationType] = useState("");
  const initializedFromUrl = useRef(false);

  const { commonQuestions, typeQuestions, questions, isLoadingCommon, isLoadingType, isLoadingQuestions } = useApplicationQuestions(applicationType);

  const {
    formData,
    setFormData,
    isSubmitted,
    isSubmitting,
    showConfirmModal,
    closeConfirmModal,
    confirmSubmit,
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
    isFormValid,
    saveDraft,
  } = useApplicationForm(questions);

  // 지원 페이지 진입 시 모집 퍼널 '지원 시작' 이벤트 1회 전송
  useEffect(() => {
    trackApplicationStart();
  }, []);

  // formData → 로컬 상태 동기화
  useEffect(() => {
    setApplicationType(formData.applicationType);
  }, [formData.applicationType]);

  // URL ?type= → formData 초기화 (최초 1회)
  useEffect(() => {
    if (initializedFromUrl.current) return;
    const urlType = searchParams.get("type");
    if (isValidType(urlType)) {
      initializedFromUrl.current = true;
      setFormData((prev) => ({ ...prev, applicationType: urlType }));
    }
    // 마운트 시 한 번만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // formData → URL 동기화 (replace 모드로 히스토리 오염 방지)
  useEffect(() => {
    const qs = formData.applicationType ? `?type=${formData.applicationType}` : "";
    router.replace(`${pathname}${qs}`, { scroll: false });
  }, [formData.applicationType, router, pathname]);

  const privacyQuestion = findQuestionByKeywords(["개인정보", "동의"]);
  const privacyAnswer = privacyQuestion ? formData.answers[privacyQuestion.id.toString()] || "" : "";
  const basicInfoQuestions = commonQuestions.filter(
    (q) => !q.question.includes("개인정보") && !q.question.includes("동의")
  );

  const renderQuestion = (question: any) => {
    const questionId = question.id.toString();
    const answer = formData.answers[questionId] || "";

    return (
      <QuestionRenderer
        key={question.id}
        question={question}
        answer={answer}
        applicationType={formData.applicationType as "yb" | "ob" | ""}
        interviewSchedule={interviewSchedule}
        interviewDates={formData.interviewDates}
        selectedInterviewDate={formData.selectedInterviewDate}
        interviewTimesByDate={formData.interviewTimesByDate}
        onAnswerChange={updateAnswer}
        onCheckboxChange={handleCheckboxChange}
        onDateToggle={handleDateToggle}
        onTimeToggle={handleTimeToggle}
        findInterviewQuestion={findInterviewQuestion}
        findQuestionByKeywords={findQuestionByKeywords}
        isApplicationType={isApplicationType}
        getAnswer={getAnswer}
      />
    );
  };

  if (isSubmitted) {
    return <SubmissionSuccess />;
  }

  return (
    <div className="min-h-screen bg-[#F2F4F6]">
      <ApplicationHeader
        onSaveDraft={saveDraft}
        isSubmitting={isSubmitting}
        submitDisabled={isSubmitting || isLoadingQuestions || !isFormValid()}
        formId="apply-form"
      />

      <main className="container mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#191F28]">
              <div className="space-y-1.5 sm:space-y-2">
                {APPLICATION_FORM_CONFIG.pageTitle.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </h1>
            <p className="text-sm sm:text-base text-[#4E5968] max-w-xl mx-auto leading-relaxed px-2">
              {APPLICATION_FORM_CONFIG.pageDescription}
            </p>
          </div>

          <ApplicationGuide />

          <ScheduleCard />

          <NoticeCard />

          <form
            id="apply-form"
            onSubmit={handleSubmit}
            className="space-y-6 sm:space-y-8"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.target as HTMLElement).closest("[data-interview-select]")) {
                e.preventDefault();
              }
            }}
          >
            {isLoadingCommon ? (
              <QuestionSkeleton count={2} />
            ) : (
              <>
                {privacyQuestion && (
                  <PrivacyConsentCard
                    question={privacyQuestion}
                    answer={privacyAnswer}
                    onAnswerChange={updateAnswer}
                  />
                )}
                {basicInfoQuestions.length > 0 && (
                  <BasicInfoCard questions={basicInfoQuestions}>
                    {basicInfoQuestions.map((question) => (
                      <BasicInfoField
                        key={question.id}
                        question={question}
                        answer={formData.answers[question.id.toString()] || ""}
                        onAnswerChange={updateAnswer}
                      />
                    ))}
                  </BasicInfoCard>
                )}
              </>
            )}

            <ApplicationTypeSelector
              applicationType={formData.applicationType}
              onApplicationTypeChange={(type) =>
                setFormData({ ...formData, applicationType: type })
              }
            />

            {formData.applicationType && (
              isLoadingType ? (
                <QuestionLoading />
              ) : (
                typeQuestions
                  .filter((question) => question.applicant_type !== "common")
                  .map((question) => renderQuestion(question))
              )
            )}

          </form>
        </div>
      </main>

      <ConfirmSubmitModal
        open={showConfirmModal}
        onCancel={closeConfirmModal}
        onConfirm={confirmSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Apply;
