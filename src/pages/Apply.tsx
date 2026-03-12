import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { APPLICATION_FORM_CONFIG } from "@/lib/constants";
import { ApplicationHeader } from "@/components/pages/Apply/ApplicationHeader";
import { ScheduleCard } from "@/components/pages/Apply/ScheduleCard";
import { FAQCard } from "@/components/pages/Apply/FAQCard";
import { ApplicationTypeSelector } from "@/components/pages/Apply/ApplicationTypeSelector";
import { SubmissionSuccess } from "@/components/pages/Apply/SubmissionSuccess";
import { PrivacyConsentCard } from "@/components/pages/Apply/PrivacyConsentCard";
import { BasicInfoCard } from "@/components/pages/Apply/BasicInfoCard";
import { QuestionRenderer } from "@/components/pages/Apply/QuestionRenderer";
import { useApplicationQuestions } from "@/hooks/useApplicationQuestions";
import { useApplicationForm } from "@/hooks/useApplicationForm";
import SEO from "@/components/shared/SEO";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [applicationType, setApplicationType] = useState("");
  const initializedFromUrl = useRef(false);

  const { commonQuestions, typeQuestions, questions, isLoadingCommon, isLoadingType, isLoadingQuestions } = useApplicationQuestions(applicationType);

  const {
    formData,
    setFormData,
    isSubmitted,
    isSubmitting,
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
  } = useApplicationForm(questions);

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
    setSearchParams(
      formData.applicationType ? { type: formData.applicationType } : {},
      { replace: true }
    );
  }, [formData.applicationType, setSearchParams]);

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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      <SEO
        title="지원하기 | KHUDA"
        description="KHUDA 신규 부원 지원서를 작성하세요."
        path="/apply"
        noindex={true}
      />
      <ApplicationHeader />

      <main className="container mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              <div className="space-y-2 sm:space-y-3">
                {APPLICATION_FORM_CONFIG.pageTitle.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
              {APPLICATION_FORM_CONFIG.pageDescription}
            </p>
          </div>

          <ScheduleCard />

          <FAQCard />

          <form
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
                    {basicInfoQuestions.map((question) => renderQuestion(question))}
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
                <QuestionSkeleton count={3} />
              ) : (
                typeQuestions
                  .filter((question) => question.applicant_type !== "common")
                  .map((question) => renderQuestion(question))
              )
            )}

            <div className="sticky bottom-0 pb-4 sm:pb-6 md:pb-8 pt-3 sm:pt-4 bg-background/80 backdrop-blur-md border-t border-border/50 -mx-4 sm:-mx-6 md:-mx-12 px-4 sm:px-6 md:px-12">
              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full rounded-xl h-12 sm:h-14 text-sm sm:text-base font-semibold shadow-lg transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] min-h-[44px] bg-blue-600 text-white hover:shadow-[0_0_40px_rgb(59_130_246/0.4)]"
                disabled={isSubmitting || isLoadingQuestions || !isFormValid()}
              >
                {isSubmitting ? "제출 중..." : "지원서 제출하기"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Apply;
