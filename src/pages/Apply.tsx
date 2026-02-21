import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { APPLICATION_FORM_CONFIG } from "@/lib/constants";
import Header from "@/components/shared/Header";
import PageHeroSection from "@/components/shared/PageHeroSection";
import Footer from "@/components/shared/Footer";
import { ScheduleCard } from "@/components/pages/Apply/ScheduleCard";
import { FAQCard } from "@/components/pages/Apply/FAQCard";
import { ApplicationTypeSelector } from "@/components/pages/Apply/ApplicationTypeSelector";
import { SubmissionSuccess } from "@/components/pages/Apply/SubmissionSuccess";
import { PrivacyConsentCard } from "@/components/pages/Apply/PrivacyConsentCard";
import { BasicInfoCard } from "@/components/pages/Apply/BasicInfoCard";
import { QuestionRenderer } from "@/components/pages/Apply/QuestionRenderer";
import { useApplicationQuestions } from "@/hooks/useApplicationQuestions";
import { useApplicationForm } from "@/hooks/useApplicationForm";

const Apply = () => {
  // 초기 applicationType 상태 (질문 로딩을 위해)
  const [applicationType, setApplicationType] = useState("");
  
  // 질문 로드 (applicationType에 따라)
  const { commonQuestions, typeQuestions, questions } = useApplicationQuestions(applicationType);
  
  // 폼 관리
  const {
    formData,
    setFormData,
    isSubmitted,
    isSubmitting,
    interviewSchedule,
    updateAnswer,
    handleCheckboxChange,
    handleSubmit,
    findQuestionByKeywords,
    findInterviewQuestion,
    isApplicationType,
    getAnswer,
    isFormValid,
  } = useApplicationForm(questions);
  
  // formData.applicationType 변경 시 applicationType 동기화
  useEffect(() => {
    setApplicationType(formData.applicationType);
  }, [formData.applicationType]);

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
        formData={formData}
        setFormData={setFormData}
        onAnswerChange={updateAnswer}
        onCheckboxChange={handleCheckboxChange}
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
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <PageHeroSection
          title={APPLICATION_FORM_CONFIG.pageTitle.replace(/\n/g, " ")}
          subtitle={APPLICATION_FORM_CONFIG.pageDescription}
          backgroundImage="/images/hello.png"
        />

        <section className="container mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">

          <ScheduleCard />

          <FAQCard />

          <form 
            onSubmit={handleSubmit} 
            className="space-y-8"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.target as HTMLElement).closest('[data-interview-select]')) {
                e.preventDefault();
              }
            }}
          >
            {(() => {
              const privacyQuestion = findQuestionByKeywords(["개인정보", "동의"]);
              if (!privacyQuestion) return null;
              const privacyAnswer = formData.answers[privacyQuestion.id.toString()] || "";
              
              return (
                <PrivacyConsentCard
                  question={privacyQuestion}
                  answer={privacyAnswer}
                  onAnswerChange={updateAnswer}
                />
              );
            })()}

            {commonQuestions.filter(q => !q.question.includes("개인정보") && !q.question.includes("동의")).length > 0 && (
              <BasicInfoCard questions={commonQuestions.filter(q => !q.question.includes("개인정보") && !q.question.includes("동의"))}>
                {commonQuestions
                  .filter(q => {
                    if (q.question.includes("개인정보") || q.question.includes("동의")) return false;
                    return true;
                  })
                  .map(question => renderQuestion(question))}
              </BasicInfoCard>
            )}

            <ApplicationTypeSelector
              applicationType={formData.applicationType}
              onApplicationTypeChange={(type) => setFormData({ ...formData, applicationType: type })}
            />

            {formData.applicationType && typeQuestions
              .filter(question => question.applicant_type !== "common")
              .map(question => renderQuestion(question))}

            <div className="sticky bottom-0 pb-4 sm:pb-6 md:pb-8 pt-3 sm:pt-4 bg-background/80 backdrop-blur-md border-t border-border/50 -mx-4 sm:-mx-6 md:-mx-12 px-4 sm:px-6 md:px-12">
              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full rounded-xl h-12 sm:h-14 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
                disabled={isSubmitting || !isFormValid()}
              >
                {isSubmitting ? "제출 중..." : "지원서 제출하기"}
              </Button>
            </div>
          </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Apply;
