import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getApplicationResult, ApiError, NetworkError } from "@/lib/api";
import { ROUTES } from "@/lib/constants";
import Footer from "@/components/shared/Footer";
import { ResultQueryForm } from "@/components/pages/ApplicationResult/ResultQueryForm";
import { ResultCard } from "@/components/pages/ApplicationResult/ResultCard";

// 합격자 조회 오픈 시간: 2026년 1월 12일 오후 6시 (한국 시간, KST)
const OPEN_TIME = new Date("2026-01-12T18:00:00+09:00");

const ApplicationResult = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<{
    student_id: string;
    name: string;
    status: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    student_id: "",
    phone_number: "",
    name: "",
  });
  const [errors, setErrors] = useState<{
    student_id?: string;
    phone_number?: string;
    name?: string;
  }>({});
  // 에러 초기화 헬퍼 함수
  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // 전화번호 하이픈 자동 제거
  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({ ...prev, phone_number: cleaned }));
    clearError("phone_number");
  };

  // 학번 숫자만 입력
  const handleStudentIdChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({ ...prev, student_id: cleaned }));
    clearError("student_id");
  };

  // 이름 입력 (한글, 영문, 공백만)
  const handleNameChange = (value: string) => {
    setFormData((prev) => ({ ...prev, name: value }));
    clearError("name");
  };

  // 오픈 시간 체크
  useEffect(() => {
    const checkOpenTime = () => {
      const now = new Date();
      setIsOpen(now >= OPEN_TIME);
    };

    checkOpenTime();
    const interval = setInterval(checkOpenTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    setFormData({
      student_id: "",
      phone_number: "",
      name: "",
    });
    setResult(null);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 입력 검증
    const newErrors: typeof errors = {};
    
    if (!formData.student_id.trim()) {
      newErrors.student_id = "학번을 입력해주세요.";
    } else if (formData.student_id.length !== 10) {
      newErrors.student_id = "학번은 10자리로 입력해주세요.";
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "전화번호를 입력해주세요.";
    } else if (formData.phone_number.length !== 11) {
      newErrors.phone_number = "전화번호는 11자리로 입력해주세요.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        title: "입력 오류",
        description: "모든 필수 항목을 올바르게 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setErrors({});

    setIsLoading(true);
    setResult(null);

    try {
      const response = await getApplicationResult({
        student_id: formData.student_id.trim(),
        phone_number: formData.phone_number.trim(),
        name: formData.name.trim(),
      });
      
      setResult(response);
      toast({
        title: "조회 성공",
        description: "합격자 결과를 조회했습니다.",
      });
    } catch (error) {
      let errorMessage = "합격자 결과 조회에 실패했습니다.";
      
      if (error instanceof ApiError) {
        errorMessage = error.message;
      } else if (error instanceof NetworkError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: "조회 실패",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
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
