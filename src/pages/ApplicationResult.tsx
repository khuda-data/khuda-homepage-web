import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, Clock, AlertCircle, RotateCcw, Phone, UserCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { getApplicationResult, ApiError, NetworkError } from "@/lib/api";
import { ROUTES, COMMON_STYLES, CONTACT_PHONE } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  const resultCardRef = useRef<HTMLDivElement>(null);

  // 전화번호 하이픈 자동 제거
  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({
      ...prev,
      phone_number: cleaned,
    }));
    if (errors.phone_number) {
      setErrors((prev) => ({ ...prev, phone_number: undefined }));
    }
  };

  // 학번 숫자만 입력
  const handleStudentIdChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({
      ...prev,
      student_id: cleaned,
    }));
    if (errors.student_id) {
      setErrors((prev) => ({ ...prev, student_id: undefined }));
    }
  };

  // 이름 입력 (한글, 영문, 공백만)
  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
    }));
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
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

  // 결과 카드로 스크롤
  useEffect(() => {
    if (result && resultCardRef.current) {
      setTimeout(() => {
        resultCardRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "nearest" 
        });
      }, 100);
    }
  }, [result]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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

  const getStatusBadge = (status: string) => {
    const statusTrimmed = status.trim();
    const statusLower = statusTrimmed.toLowerCase();
    
    // 불합격 체크를 먼저 수행 (합격보다 우선)
    if (
      statusTrimmed === "불합격" ||
      statusLower === "불합격" ||
      statusLower.includes("불합격") ||
      statusLower.includes("fail") ||
      statusLower.includes("reject")
    ) {
      return (
        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 px-4 py-2 text-base">
          <XCircle className="w-4 h-4 mr-2" />
          불합격
        </Badge>
      );
    }
    
    // 합격 체크
    if (
      statusTrimmed === "합격" ||
      statusLower === "합격" ||
      statusLower.includes("합격") ||
      statusLower.includes("pass")
    ) {
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2 text-base">
          <CheckCircle className="w-4 h-4 mr-2" />
          합격 🎉
        </Badge>
      );
    }
    
    // 대기 체크
    if (
      statusLower.includes("대기") ||
      statusLower.includes("pending") ||
      statusLower.includes("wait")
    ) {
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-4 py-2 text-base">
          <Clock className="w-4 h-4 mr-2" />
          대기중
        </Badge>
      );
    }
    
    // 기본값: 받은 상태 그대로 표시
    return (
      <Badge className="bg-muted text-muted-foreground px-4 py-2 text-base">
        {statusTrimmed}
      </Badge>
    );
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

          <Card className={cn(COMMON_STYLES.cardBase, "rounded-xl sm:rounded-2xl md:rounded-3xl")}>
            <CardHeader className="px-4 sm:px-6 pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl md:text-2xl">조회 정보 입력</CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1 sm:mt-2">
                지원 시 입력하신 정보를 정확히 입력해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="student_id" className="text-sm sm:text-base font-medium">
                    학번 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="student_id"
                    type="text"
                    inputMode="numeric"
                    placeholder="2024123456"
                    value={formData.student_id}
                    onChange={(e) => handleStudentIdChange(e.target.value)}
                    disabled={isLoading}
                    className={cn(
                      "min-h-[48px] sm:min-h-[44px] text-base sm:text-sm",
                      errors.student_id && "border-destructive focus-visible:ring-destructive"
                    )}
                    maxLength={10}
                    minLength={10}
                  />
                  {errors.student_id && (
                    <p className="text-xs sm:text-sm text-destructive mt-1">{errors.student_id}</p>
                  )}
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="phone_number" className="text-sm sm:text-base font-medium">
                    전화번호 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone_number"
                    type="tel"
                    inputMode="numeric"
                    placeholder="01012345678"
                    value={formData.phone_number}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    disabled={isLoading}
                    className={cn(
                      "min-h-[48px] sm:min-h-[44px] text-base sm:text-sm",
                      errors.phone_number && "border-destructive focus-visible:ring-destructive"
                    )}
                    maxLength={11}
                    minLength={11}
                  />
                  {errors.phone_number ? (
                    <p className="text-xs sm:text-sm text-destructive mt-1">{errors.phone_number}</p>
                  ) : (
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      하이픈(-) 없이 숫자만 입력해주세요.
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base font-medium">
                    이름 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    disabled={isLoading}
                    className={cn(
                      "min-h-[48px] sm:min-h-[44px] text-base sm:text-sm",
                      errors.name && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  {errors.name && (
                    <p className="text-xs sm:text-sm text-destructive mt-1">{errors.name}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !isOpen}
                  className="w-full min-h-[48px] sm:min-h-[44px] text-base sm:text-sm bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Clock className="w-4 h-4 sm:w-3.5 sm:h-3.5 mr-2 animate-spin" />
                      조회 중...
                    </>
                  ) : !isOpen ? (
                    <>
                      <Clock className="w-4 h-4 sm:w-3.5 sm:h-3.5 mr-2" />
                      2026년 1월 12일 오후 6시부터 조회 가능
                    </>
                  ) : (
                    "결과 조회"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card 
              ref={resultCardRef}
              className={cn(
                COMMON_STYLES.cardBase, 
                "rounded-xl sm:rounded-2xl md:rounded-3xl mt-6 sm:mt-8",
                "animate-in fade-in slide-in-from-bottom-4 duration-500"
              )}
            >
              <CardHeader className="px-4 sm:px-6 pb-3 sm:pb-4">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    조회 결과
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground min-h-[36px] sm:min-h-[32px] px-2 sm:px-3"
                  >
                    <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                    <span className="hidden sm:inline">다시 조회</span>
                    <span className="sm:hidden">재조회</span>
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 sm:space-y-6 pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
                {/* 정보 필드들 */}
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/20 border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-2">
                      <UserCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground">이름</span>
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-foreground sm:text-right">{result.name}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/20 border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground">학번</span>
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-foreground font-mono sm:text-right break-all">{result.student_id}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/20 border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground">상태</span>
                    </div>
                    <div className="flex items-center gap-2 sm:justify-end">
                      {(() => {
                        const statusTrimmed = result.status.trim();
                        const statusLower = statusTrimmed.toLowerCase();
                        
                        // 불합격 체크를 먼저 수행 (합격보다 우선)
                        if (
                          statusTrimmed === "불합격" ||
                          statusLower === "불합격" ||
                          statusLower.includes("불합격") ||
                          statusLower.includes("fail") ||
                          statusLower.includes("reject")
                        ) {
                          return (
                            <span className="text-sm sm:text-base font-semibold text-red-400">불합격</span>
                          );
                        }
                        
                        // 합격 체크
                        if (
                          statusTrimmed === "합격" ||
                          statusLower === "합격" ||
                          statusLower.includes("합격") ||
                          statusLower.includes("pass")
                        ) {
                          return (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span className="text-sm sm:text-base font-semibold text-green-400">합격🎉</span>
                            </>
                          );
                        }
                        
                        // 대기 체크
                        if (
                          statusLower.includes("대기") ||
                          statusLower.includes("pending") ||
                          statusLower.includes("wait")
                        ) {
                          return (
                            <>
                              <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                              <span className="text-sm sm:text-base font-semibold text-yellow-400">대기중</span>
                            </>
                          );
                        }
                        
                        // 기본값
                        return <span className="text-sm sm:text-base font-semibold text-foreground">{statusTrimmed}</span>;
                      })()}
                    </div>
                  </div>
                </div>

                {/* 메시지 및 연락처 섹션 */}
                <div className="pt-3 sm:pt-4 border-t border-border/50">
                  {result.status.includes("불합격") || result.status.toLowerCase().includes("fail") || result.status.toLowerCase().includes("reject") ? (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-border/50 space-y-2 sm:space-y-3">
                        <div className="text-center space-y-1.5 sm:space-y-2">
                          <p className="text-sm sm:text-base md:text-lg text-foreground font-semibold">
                            지원해주셔서 감사합니다.
                          </p>
                          <div className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            <p>이번 기수에는 아쉽게도 선발되지 못하셨습니다.</p>
                            <p>하지만 지원서에서 느껴진 진심과 준비는 분명했고, 얼마나 애써왔는지 저희도 알고 있습니다. 이번 결과 하나로 흔들리지 않으셨으면 합니다.</p>
                            <p className="pt-0.5 sm:pt-1">다음 기수에도 꼭 다시 지원해 주세요. 감사합니다.</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <p className="text-xs sm:text-sm text-muted-foreground text-center">
                          추가 문의사항이 있으시면 운영진에게 연락해주세요.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 pt-2">
                          <a
                            href={`tel:${CONTACT_PHONE.회장.replace(/-/g, "")}`}
                            className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Phone className="w-3 h-3" />
                            <span>회장 조윤수 {CONTACT_PHONE.회장}</span>
                          </a>
                          <span className="hidden sm:inline text-muted-foreground">/</span>
                          <a
                            href={`tel:${CONTACT_PHONE.부회장.replace(/-/g, "")}`}
                            className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Phone className="w-3 h-3" />
                            <span>부회장 신진수 {CONTACT_PHONE.부회장}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : result.status.includes("합격") || result.status.toLowerCase().includes("pass") ? (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-border/50">
                        <p className="text-xs sm:text-sm md:text-base text-foreground text-center font-medium leading-relaxed">
                          합격을 진심으로 축하드립니다!<br />
                          곧 카카오톡 공지방에 초대될 예정이며,<br />
                          OT에 대한 자세한 공지가 있을 예정입니다.
                        </p>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <p className="text-xs sm:text-sm text-muted-foreground text-center">
                          문의사항이 있으시면 운영진에게 연락해주세요.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 pt-2">
                          <a
                            href={`tel:${CONTACT_PHONE.회장.replace(/-/g, "")}`}
                            className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Phone className="w-3 h-3" />
                            <span>회장 조윤수 {CONTACT_PHONE.회장}</span>
                          </a>
                          <span className="hidden sm:inline text-muted-foreground">/</span>
                          <a
                            href={`tel:${CONTACT_PHONE.부회장.replace(/-/g, "")}`}
                            className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Phone className="w-3 h-3" />
                            <span>부회장 신진수 {CONTACT_PHONE.부회장}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 sm:space-y-3">
                      <p className="text-xs sm:text-sm text-muted-foreground text-center">
                        추가 문의사항이 있으시면 운영진에게 연락해주세요.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
                        <a
                          href={`tel:${CONTACT_PHONE.회장.replace(/-/g, "")}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 border border-border/50 transition-all hover:scale-105 text-xs sm:text-sm text-foreground"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>회장 조윤수 {CONTACT_PHONE.회장}</span>
                        </a>
                        <a
                          href={`tel:${CONTACT_PHONE.부회장.replace(/-/g, "")}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 border border-border/50 transition-all hover:scale-105 text-xs sm:text-sm text-foreground"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>부회장 신진수 {CONTACT_PHONE.부회장}</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationResult;
