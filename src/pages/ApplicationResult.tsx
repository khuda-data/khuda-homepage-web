import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useApplicationResult } from "@/hooks/useApplicationResult";
import { ROUTES } from "@/lib/constants";
import Footer from "@/components/shared/Footer";
import { ResultQueryForm } from "@/components/pages/ApplicationResult/ResultQueryForm";
import { ResultCard } from "@/components/pages/ApplicationResult/ResultCard";
import SEO from "@/components/shared/SEO";

const ApplicationResult = () => {
  const {
    formData,
    errors,
    isLoading,
    isOpen,
    result,
    openTime,
    handleStudentIdChange,
    handlePhoneChange,
    handleNameChange,
    handleSubmit,
    handleReset,
  } = useApplicationResult();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="합격자 조회 | KHUDA"
        description="KHUDA 지원 결과를 조회할 수 있습니다. 학번, 전화번호, 이름을 입력하여 합격 여부를 확인하세요."
        path="/application-result"
        noindex={true}
      />
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 py-3 sm:py-4">
          <Link
            to={ROUTES.home}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인으로</span>
          </Link>
        </div>
      </header>

      <main className="px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 pb-12 sm:pb-16">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-5">
              합격자 결과 조회
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              지원 시 입력하신 <span className="text-foreground font-medium">학번, 전화번호, 이름</span>을 입력하시면<br className="sm:hidden" /> 합격 여부를 확인하실 수 있습니다.
            </p>
          </div>

          <ResultQueryForm
            formData={formData}
            errors={errors}
            isLoading={isLoading}
            isOpen={isOpen}
            openTime={openTime}
            onStudentIdChange={handleStudentIdChange}
            onPhoneChange={handlePhoneChange}
            onNameChange={handleNameChange}
            onSubmit={handleSubmit}
          />

          {result && (
            <ResultCard
              result={result}
              onReset={handleReset}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationResult;
