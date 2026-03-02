import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getApplicationResult, ApiError, NetworkError } from "@/lib/api";

// 합격자 조회 오픈 시간: 2026년 1월 12일 오후 6시 (KST)
export const RESULT_OPEN_TIME = new Date("2026-01-12T18:00:00+09:00");

interface ResultFormData {
  student_id: string;
  phone_number: string;
  name: string;
}

interface ResultFormErrors {
  student_id?: string;
  phone_number?: string;
  name?: string;
}

interface ApplicationResultData {
  student_id: string;
  name: string;
  status: string;
}

const validateForm = (formData: ResultFormData): ResultFormErrors => {
  const errors: ResultFormErrors = {};

  if (!formData.student_id.trim()) {
    errors.student_id = "학번을 입력해주세요.";
  } else if (formData.student_id.length !== 10) {
    errors.student_id = "학번은 10자리로 입력해주세요.";
  }

  if (!formData.phone_number.trim()) {
    errors.phone_number = "전화번호를 입력해주세요.";
  } else if (formData.phone_number.length !== 11) {
    errors.phone_number = "전화번호는 11자리로 입력해주세요.";
  }

  if (!formData.name.trim()) {
    errors.name = "이름을 입력해주세요.";
  }

  return errors;
};

export const useApplicationResult = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<ApplicationResultData | null>(null);
  const [formData, setFormData] = useState<ResultFormData>({
    student_id: "",
    phone_number: "",
    name: "",
  });
  const [errors, setErrors] = useState<ResultFormErrors>({});

  useEffect(() => {
    const checkOpenTime = () => {
      setIsOpen(new Date() >= RESULT_OPEN_TIME);
    };
    checkOpenTime();
    const interval = setInterval(checkOpenTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const clearError = (field: keyof ResultFormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleStudentIdChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({ ...prev, student_id: cleaned }));
    clearError("student_id");
  };

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({ ...prev, phone_number: cleaned }));
    clearError("phone_number");
  };

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({ ...prev, name: value }));
    clearError("name");
  };

  const handleReset = () => {
    setFormData({ student_id: "", phone_number: "", name: "" });
    setResult(null);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
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
      if (error instanceof ApiError || error instanceof NetworkError || error instanceof Error) {
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

  return {
    formData,
    errors,
    isLoading,
    isOpen,
    result,
    openTime: RESULT_OPEN_TIME,
    handleStudentIdChange,
    handlePhoneChange,
    handleNameChange,
    handleSubmit,
    handleReset,
  };
};
