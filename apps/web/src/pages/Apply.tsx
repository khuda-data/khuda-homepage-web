import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle, Calendar, Users, Mail, Phone, MapPin, Code, BookOpen, Award, Clock, FileText, Instagram, Copy, UserCircle, ClipboardList, GraduationCap, Target, Layers, Info, Activity, Heart, Circle, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  generateInterviewTimes, 
  copyToClipboard,
  getCheckboxContainerClass,
  getCheckboxIconClass,
  getRadioButtonClass,
  getInterviewTimeButtonClass
} from "@/lib/form-utils";
import { submitApplication, getQuestions, type Question } from "@/lib/api";

const interviewTimes = generateInterviewTimes();

const Apply = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [formData, setFormData] = useState({
    privacyAgreement: "",
    name: "",
    studentId: "",
    gradeSemester: "",
    major: "",
    doubleMajor: "",
    email: "",
    phone: "",
    applicationType: "",
    residence: "",
    pythonLevel: "",
    dataAnalysisFields: [] as string[],
    coreQuestion1: "",
    coreQuestion2: "",
    coreQuestion3: "",
    studyGroup: "",
    otherActivities: "",
    schedule2026: "",
    certificates: "",
    expectations: "",
    interviewDates: [] as string[],
    interviewTimesByDate: {} as Record<string, string[]>,
    selectedInterviewDate: "" as string,
    completionCondition: [] as string[],
    studyIntention: "",
    studyDetails: "",
    trackInterest: "",
    obExpectations: "",
  });

  // 지원 분야 선택 시 질문 목록 가져오기
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!formData.applicationType) {
        setQuestions([]);
        return;
      }

      setIsLoadingQuestions(true);
      try {
        const response = await getQuestions(formData.applicationType);
        // position 순서로 정렬
        const sortedQuestions = response.questions.sort((a, b) => a.position - b.position);
        setQuestions(sortedQuestions);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "질문을 가져오는데 실패했습니다.";
        toast({
          title: "질문 로드 실패",
          description: errorMessage,
          variant: "destructive",
        });
        setQuestions([]);
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    fetchQuestions();
  }, [formData.applicationType, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyAgreement) {
      toast({
        title: "제출할 수 없습니다",
        description: "개인정보 수집 및 이용에 동의해주셔야 지원서를 제출할 수 있습니다.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.privacyAgreement === "disagree") {
      toast({
        title: "제출할 수 없습니다",
        description: "개인정보 수집 및 이용에 동의하지 않으시면 지원서를 제출할 수 없습니다.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.applicationType) {
      toast({
        title: "지원 분야를 선택해주세요",
        description: "9기 YB 또는 9기 OB를 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (formData.applicationType === "yb") {
      if (!formData.coreQuestion1 || !formData.coreQuestion2 || !formData.coreQuestion3) {
        toast({
          title: "필수 항목을 작성해주세요",
          description: "지원 동기 및 역량, 도전과 끈기, 프로젝트 및 탐구 경험을 모두 작성해주세요.",
          variant: "destructive",
        });
        return;
      }
    }

    if (formData.applicationType === "ob") {
      const hasTrackInterest = formData.trackInterest && formData.trackInterest !== "none";
      const hasStudyIntention = formData.studyIntention === "yes";
      
      if (!hasTrackInterest && !hasStudyIntention) {
        toast({
          title: "필수 항목을 선택해주세요",
          description: "트랙 참여와 스터디 개설 중 최소한 하나는 선택해주셔야 합니다.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);
    
    try {
      // 필드명을 질문 ID로 매핑하는 맵
      const fieldToQuestionIdMap: Record<string, number> = {
        privacyAgreement: 1,
        name: 2,
        studentId: 3,
        gradeSemester: 4,
        major: 5,
        doubleMajor: 6,
        email: 7,
        phone: 8,
        residence: 9,
        pythonLevel: 10,
        dataAnalysisFields: 11,
        coreQuestion1: 12,
        coreQuestion2: 13,
        coreQuestion3: 14,
        studyGroup: 15,
        otherActivities: 16,
        schedule2026: 17,
        certificates: 18,
        expectations: 19,
        interviewDates: 20,
        interviewTimesByDate: 21,
        studyIntention: 22,
        studyDetails: 23,
        trackInterest: 24,
        obExpectations: 25,
      };

      // formData를 질문 ID 기반 answers로 변환
      const answers: Record<string, string> = {};
      
      // 공통 필드
      if (formData.privacyAgreement) answers[fieldToQuestionIdMap.privacyAgreement.toString()] = formData.privacyAgreement;
      if (formData.name) answers[fieldToQuestionIdMap.name.toString()] = formData.name;
      if (formData.studentId) answers[fieldToQuestionIdMap.studentId.toString()] = formData.studentId;
      if (formData.gradeSemester) answers[fieldToQuestionIdMap.gradeSemester.toString()] = formData.gradeSemester;
      if (formData.major) answers[fieldToQuestionIdMap.major.toString()] = formData.major;
      if (formData.doubleMajor) answers[fieldToQuestionIdMap.doubleMajor.toString()] = formData.doubleMajor;
      if (formData.email) answers[fieldToQuestionIdMap.email.toString()] = formData.email;
      if (formData.phone) answers[fieldToQuestionIdMap.phone.toString()] = formData.phone;

      // YB 필드
      if (formData.applicationType === "yb") {
        if (formData.residence) answers[fieldToQuestionIdMap.residence.toString()] = formData.residence;
        if (formData.pythonLevel) answers[fieldToQuestionIdMap.pythonLevel.toString()] = formData.pythonLevel;
        if (formData.dataAnalysisFields.length > 0) {
          answers[fieldToQuestionIdMap.dataAnalysisFields.toString()] = JSON.stringify(formData.dataAnalysisFields);
        }
        if (formData.coreQuestion1) answers[fieldToQuestionIdMap.coreQuestion1.toString()] = formData.coreQuestion1;
        if (formData.coreQuestion2) answers[fieldToQuestionIdMap.coreQuestion2.toString()] = formData.coreQuestion2;
        if (formData.coreQuestion3) answers[fieldToQuestionIdMap.coreQuestion3.toString()] = formData.coreQuestion3;
        if (formData.studyGroup) answers[fieldToQuestionIdMap.studyGroup.toString()] = formData.studyGroup;
        if (formData.otherActivities) answers[fieldToQuestionIdMap.otherActivities.toString()] = formData.otherActivities;
        if (formData.schedule2026) answers[fieldToQuestionIdMap.schedule2026.toString()] = formData.schedule2026;
        if (formData.certificates) answers[fieldToQuestionIdMap.certificates.toString()] = formData.certificates;
        if (formData.expectations) answers[fieldToQuestionIdMap.expectations.toString()] = formData.expectations;
        if (formData.interviewDates.length > 0) {
          answers[fieldToQuestionIdMap.interviewDates.toString()] = JSON.stringify(formData.interviewDates);
        }
        if (Object.keys(formData.interviewTimesByDate).length > 0) {
          answers[fieldToQuestionIdMap.interviewTimesByDate.toString()] = JSON.stringify(formData.interviewTimesByDate);
        }
      }

      // OB 필드
      if (formData.applicationType === "ob") {
        if (formData.studyIntention) answers[fieldToQuestionIdMap.studyIntention.toString()] = formData.studyIntention;
        if (formData.studyDetails) answers[fieldToQuestionIdMap.studyDetails.toString()] = formData.studyDetails;
        if (formData.trackInterest) answers[fieldToQuestionIdMap.trackInterest.toString()] = formData.trackInterest;
        if (formData.obExpectations) answers[fieldToQuestionIdMap.obExpectations.toString()] = formData.obExpectations;
      }

      // API 호출
      const response = await submitApplication(formData.applicationType, answers);
      
      setIsSubmitting(false);
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

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    if (field === "dataAnalysisFields") {
      setFormData((prev) => ({
        ...prev,
        dataAnalysisFields: checked
          ? [...prev.dataAnalysisFields, value]
          : prev.dataAnalysisFields.filter((item) => item !== value),
      }));
    } else if (field === "interviewDates") {
      setFormData((prev) => {
        const newDates = checked
          ? [...prev.interviewDates, value]
          : prev.interviewDates.filter((item) => item !== value);
        
        const newSelectedDate = checked ? value : (prev.selectedInterviewDate === value ? "" : prev.selectedInterviewDate);
        
        const newTimesByDate = { ...prev.interviewTimesByDate };
        if (!checked && newTimesByDate[value]) {
          delete newTimesByDate[value];
        }
        
        return {
          ...prev,
          interviewDates: newDates,
          selectedInterviewDate: newSelectedDate,
          interviewTimesByDate: newTimesByDate,
        };
      });
    } else if (field === "interviewTimes") {
      setFormData((prev) => {
        if (!prev.selectedInterviewDate) return prev;
        
        const currentTimes = prev.interviewTimesByDate[prev.selectedInterviewDate] || [];
        const newTimes = checked
          ? [...currentTimes, value]
          : currentTimes.filter((item) => item !== value);
        
        return {
        ...prev,
          interviewTimesByDate: {
            ...prev.interviewTimesByDate,
            [prev.selectedInterviewDate]: newTimes,
          },
        };
      });
    } else if (field === "completionCondition") {
      setFormData((prev) => ({
        ...prev,
        completionCondition: checked
          ? [...prev.completionCondition, value]
          : prev.completionCondition.filter((item) => item !== value),
      }));
    }
  };

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    const email = "khuda.official.khu@gmail.com";
    const success = await copyToClipboard(email);
    if (success) {
      toast({
        title: "복사되었습니다",
        description: "이메일 주소가 클립보드에 복사되었습니다.",
        duration: 1000,
      });
    } else {
      toast({
        title: "복사 실패",
        description: "이메일 주소 복사에 실패했습니다.",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  const isFormValid = () => {
    if (!formData.privacyAgreement || formData.privacyAgreement === "disagree") {
      return false;
    }

    if (!formData.name || !formData.studentId || !formData.gradeSemester || !formData.major || !formData.email || !formData.phone) {
      return false;
    }

    if (!formData.applicationType) {
      return false;
    }

    if (formData.applicationType === "yb") {
      const hasInterviewTimes = Object.values(formData.interviewTimesByDate).some((times: string[]) => times.length > 0);
      if (!formData.residence || !formData.pythonLevel || !formData.coreQuestion1 || !formData.coreQuestion2 || !formData.coreQuestion3 || formData.interviewDates.length === 0 || !hasInterviewTimes) {
        return false;
      }
    }

    return true;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 flex items-center justify-center px-6">
        <Card className="max-w-md w-full border-0 shadow-xl bg-card/95 backdrop-blur-sm">
          <CardContent className="pt-12 pb-8 px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6 animate-fade-up">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-3">지원이 완료되었습니다!</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {formData.name}님의 지원서가 정상적으로 접수되었습니다.<br />
              결과는 입력하신 이메일로 안내드리겠습니다.
            </p>
            <Link to="/">
              <Button variant="heroOutline" className="rounded-xl w-full">
                메인으로 돌아가기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 md:px-12 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인으로</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-relaxed">
              함께 성장하며,<br />
              <span className="block mt-2">한계를 뛰어넘는 경험을 만들어가요 🏃‍♂️</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              KHUDA는 데이터 분석과 인공지능(AI)에 열정을 가진 경희인이 함께 모여 체계적인 학습과 실무 프로젝트 경험을 통해 성장하는 학회입니다.
            </p>
          </div>

          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl">모집 일정</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 p-5 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-200">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">서류 모집기간</p>
                  <p className="text-lg font-semibold leading-relaxed">2025년 12월 31일 (수) ~ 2026년 1월 4일 (일) 23:59</p>
                </div>
                <div className="space-y-2 p-5 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-200">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">서류 합격자 발표</p>
                  <p className="text-lg font-semibold leading-relaxed">2026년 1월 7일 (수) 18:00 이후 개별 안내</p>
                </div>
                <div className="space-y-2 p-5 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-200">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">면접</p>
                  <p className="text-lg font-semibold leading-relaxed">2026년 1월 9일 (금) ~ 1월 11일 (일) 온라인 비대면</p>
                </div>
                <div className="space-y-2 p-5 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-200">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">최종 합격자 발표</p>
                  <p className="text-lg font-semibold leading-relaxed">2026년 1월 12일 (월)</p>
                </div>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm font-semibold text-muted-foreground mb-4">모집대상</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="default" className="text-xs">YB</Badge>
                      <span className="text-sm font-semibold">9기 YB</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      머신러닝과 딥러닝 공부를 시작하시거나, 발전해 나가고 싶은 학우
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="default" className="text-xs">OB</Badge>
                      <span className="text-sm font-semibold">9기 OB</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      KHUDA 활동을 수료하고 계속 참여하고자 하는 기존 부원
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl">자주 묻는 질문</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 text-sm">
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                  <p className="font-semibold mb-2">Q. 학기 중 세션은 어디서 진행되나요?</p>
                  <p className="text-muted-foreground">A. 국제캠퍼스에서 진행되며, 구체적 일정과 장소는 합격자 발표 시 안내드립니다.</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                  <p className="font-semibold mb-2">Q. 활동비가 있나요?</p>
                  <p className="text-muted-foreground">A. YB 학회비 45,000원 / OB 학회비 5,000원으로 합격자 발표 시 안내드립니다.</p>
                </div>
              </div>
              <div className="pt-6 border-t border-border/50">
                <p className="text-sm font-semibold text-foreground mb-4 text-center">문의는 SNS 또는 운영진 연락처로 연락바랍니다!</p>
                <div className="space-y-2">
                  <a 
                    href="https://www.instagram.com/khu_da.official/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 hover:border-primary/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Instagram className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Instagram</p>
                      <p className="text-xs text-muted-foreground">@khu_da.official</p>
                    </div>
                  </a>
                  <a 
                    href="mailto:khuda.official.khu@gmail.com" 
                    className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 hover:border-primary/30 transition-all group cursor-pointer relative"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">이메일</p>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleCopyEmail(e);
                          }}
                          className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/70 bg-muted/30 hover:bg-muted/50 px-1.5 py-0.5 rounded transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                          복사
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">khuda.official.khu@gmail.com</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">운영진 연락처</p>
                      <p className="text-xs text-muted-foreground">회장 조윤수 010-3448-4802 / 부회장 신진수 010-2127-3406</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <form 
            onSubmit={handleSubmit} 
            className="space-y-8"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.target as HTMLElement).closest('[data-interview-select]')) {
                e.preventDefault();
              }
            }}
          >
            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  개인정보 수집 동의
                  <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">
                    필수
                  </Badge>
                </CardTitle>
                <CardDescription>개인정보 수집 및 이용에 동의해주세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-secondary/30 p-6 rounded-xl border border-border/50">
                  <h3 className="text-lg font-semibold mb-4 text-center">개인정보 수집·이용 동의서</h3>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <div>
                      <p className="font-semibold mb-2">1. 개인정보의 수집·이용에 관한 사항</p>
                      <p className="mb-2 text-muted-foreground">본인은 "경희대학교 데이터 분석 동아리(KHUDA)"가 신규 회원 모집과 관련하여 아래의 내용에 따라 개인정보를 수집·이용하는 것에 동의합니다.</p>
                      <p className="mb-2"><strong>가. 수집·이용 목적:</strong> ① 신규 회원 모집</p>
                      <p><strong>나. 수집하는 개인정보의 항목:</strong> ① 신청자 : 성명, 성별, 생년월일, 이메일, 전화번호, 전공 등</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">2. 개인정보의 보유 및 이용기간</p>
                      <p className="text-muted-foreground">본인은 경희대학교 데이터 분석 동아리가 본 동의서에 명시된 개인정보를 본 동의서에 명시된 수집·이용 목적이 달성될 때까지(9개월) 보유·이용하는 것에 동의합니다.</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">3. 개인정보 수집·이용에 대한 동의 거부 권리 및 동의 거부 시 불이익</p>
                      <p className="text-muted-foreground">본인은 위 개인정보의 수집·이용에 대한 동의를 거부할 권리가 있으며, 동의를 거부할 경우 신규 회원 모집 명단에서 제외될 수 있다는 사실을 인지한 상태에서 작성한 것임을 확인합니다.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div 
                    className={getCheckboxContainerClass(formData.privacyAgreement === "agree")}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setFormData((prev) => {
                        if (prev.privacyAgreement !== "agree") {
                          return { ...prev, privacyAgreement: "agree" };
                        }
                        return prev;
                      });
                    }}
                  >
                    <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      formData.privacyAgreement === "agree"
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}>
                      {formData.privacyAgreement === "agree" && (
                        <Circle className="h-2.5 w-2.5 fill-current text-primary-foreground" />
                      )}
                    </div>
                    <div className="cursor-pointer font-medium flex-1 flex items-center gap-2">
                      <span className="transition-all duration-200">상기 내용에 동의합니다.</span>
                      {formData.privacyAgreement === "agree" && (
                        <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                          선택됨
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div 
                    className={getCheckboxContainerClass(formData.privacyAgreement === "disagree")}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setFormData((prev) => {
                        if (prev.privacyAgreement !== "disagree") {
                          return { ...prev, privacyAgreement: "disagree" };
                        }
                        return prev;
                      });
                    }}
                  >
                    <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      formData.privacyAgreement === "disagree"
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}>
                      {formData.privacyAgreement === "disagree" && (
                        <Circle className="h-2.5 w-2.5 fill-current text-primary-foreground" />
                      )}
                    </div>
                    <div className="cursor-pointer font-medium flex-1 flex items-center gap-2">
                      <span className="transition-all duration-200">상기 내용에 동의하지 않습니다.</span>
                      {formData.privacyAgreement === "disagree" && (
                        <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                          선택됨
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <UserCircle className="w-5 h-5 text-primary" />
                  기본 정보
                </CardTitle>
                <CardDescription>기본 정보를 입력해주세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-2">
                      이름
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4 rounded">필수</Badge>
                    </Label>
                    <Input
                      id="name"
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none transition-all duration-200 ease-out focus:scale-[1.01] focus:shadow-md focus:shadow-primary/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-sm font-semibold flex items-center gap-2">
                      학번
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4 rounded">필수</Badge>
                    </Label>
                    <Input
                      id="studentId"
                      placeholder="2021104022"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      required
                      className="h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none transition-all duration-200 ease-out focus:scale-[1.01] focus:shadow-md focus:shadow-primary/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gradeSemester" className="text-sm font-semibold flex items-center gap-2">
                    학년, 학기
                    <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4 rounded">필수</Badge>
                  </Label>
                  <Input
                    id="gradeSemester"
                    placeholder="예) 3학년 2학기"
                    value={formData.gradeSemester}
                    onChange={(e) => setFormData({ ...formData, gradeSemester: e.target.value })}
                    required
                      className="h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none transition-all duration-200 ease-out focus:scale-[1.01] focus:shadow-md focus:shadow-primary/10"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="major" className="text-sm font-semibold flex items-center gap-2">
                      주전공
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4 rounded">필수</Badge>
                    </Label>
                    <Input
                      id="major"
                      placeholder="컴퓨터공학과"
                      value={formData.major}
                      onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                      required
                      className="h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none transition-all duration-200 ease-out focus:scale-[1.01] focus:shadow-md focus:shadow-primary/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="doubleMajor" className="text-sm font-semibold">다전공 / 부전공</Label>
                    <Input
                      id="doubleMajor"
                      placeholder="해당 없음"
                      value={formData.doubleMajor}
                      onChange={(e) => setFormData({ ...formData, doubleMajor: e.target.value })}
                      className="h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none transition-all duration-200 ease-out focus:scale-[1.01] focus:shadow-md focus:shadow-primary/10"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      이메일
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4 rounded">필수</Badge>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@khu.ac.kr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none transition-all duration-200 ease-out focus:scale-[1.01] focus:shadow-md focus:shadow-primary/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      휴대폰 번호
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4 rounded">필수</Badge>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none transition-all duration-200 ease-out focus:scale-[1.01] focus:shadow-md focus:shadow-primary/10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  지원 분야
                  <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">필수</Badge>
                </CardTitle>
                <CardDescription>지원하실 분야를 선택해주세요.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div 
                    className={getRadioButtonClass(formData.applicationType === "yb")}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setFormData((prev) => {
                        if (prev.applicationType !== "yb") {
                          return { ...prev, applicationType: "yb" };
                        }
                        return prev;
                      });
                    }}
                  >
                    <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      formData.applicationType === "yb"
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}>
                      {formData.applicationType === "yb" && (
                        <Circle className="h-2.5 w-2.5 fill-current text-primary-foreground" />
                      )}
                    </div>
                    <div className="cursor-pointer font-medium flex-1 text-base flex items-center gap-2">
                      <span className="transition-all duration-200">9기 YB</span>
                      {formData.applicationType === "yb" && (
                        <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                          선택됨
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div 
                    className={getRadioButtonClass(formData.applicationType === "ob")}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setFormData((prev) => {
                        if (prev.applicationType !== "ob") {
                          return { ...prev, applicationType: "ob" };
                        }
                        return prev;
                      });
                    }}
                  >
                    <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      formData.applicationType === "ob"
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}>
                      {formData.applicationType === "ob" && (
                        <Circle className="h-2.5 w-2.5 fill-current text-primary-foreground" />
                      )}
                    </div>
                    <div className="cursor-pointer font-medium flex-1 text-base flex items-center gap-2">
                      <span className="transition-all duration-200">9기 OB</span>
                      {formData.applicationType === "ob" && (
                        <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                          선택됨
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {formData.applicationType === "yb" && (
              <div className="space-y-8">
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <ClipboardList className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">YB 설문섹션</CardTitle>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      작성된 내용을 바탕으로 KHUDA에서 함께 성장하려는 의지와 열정을 평가합니다.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      방학 중 거주지역
                      <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">필수</Badge>
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      1월~2월 기준 거주 지역을 선택해주세요
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select
                      value={formData.residence}
                      onValueChange={(value) => setFormData({ ...formData, residence: value })}
                      required
                    >
                      <SelectTrigger 
                        className={`h-14 rounded-2xl text-base font-medium transition-all duration-200 ease-out transform ${
                          formData.residence
                            ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/60 shadow-md shadow-primary/10 scale-[1.01]"
                            : "bg-secondary/20 border-2 border-border/40 hover:border-primary/30 hover:bg-secondary/30 hover:scale-[1.01] active:scale-[0.99]"
                        } focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none focus:scale-[1.01]`}
                      >
                        <div className="flex items-center gap-2.5 flex-1">
                          {formData.residence && (
                            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          )}
                          <SelectValue placeholder="지역을 선택해주세요" />
                        </div>
                      </SelectTrigger>
                      <SelectContent 
                        className="rounded-2xl border-2 border-border/50 bg-card/95 backdrop-blur-md shadow-xl max-h-[320px] p-2"
                        position="popper"
                      >
                        <SelectItem 
                          value="서울" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          서울
                        </SelectItem>
                        <SelectItem 
                          value="경기 수원/영통" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          경기 수원/영통
                        </SelectItem>
                        <SelectItem 
                          value="경기 성남/분당" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          경기 성남/분당
                        </SelectItem>
                        <SelectItem 
                          value="경기 용인" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          경기 용인
                        </SelectItem>
                        <SelectItem 
                          value="경기 고양/의정부" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          경기 고양/의정부
                        </SelectItem>
                        <SelectItem 
                          value="경기 기타" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          경기 기타
                        </SelectItem>
                        <SelectItem 
                          value="인천" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          인천
                        </SelectItem>
                        <SelectItem 
                          value="부산" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          부산
                        </SelectItem>
                        <SelectItem 
                          value="대구" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          대구
                        </SelectItem>
                        <SelectItem 
                          value="대전" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          대전
                        </SelectItem>
                        <SelectItem 
                          value="광주" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          광주
                        </SelectItem>
                        <SelectItem 
                          value="울산" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          울산
                        </SelectItem>
                        <SelectItem 
                          value="세종" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          세종
                        </SelectItem>
                        <SelectItem 
                          value="강원" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          강원
                        </SelectItem>
                        <SelectItem 
                          value="충북" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          충북
                        </SelectItem>
                        <SelectItem 
                          value="충남" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          충남
                        </SelectItem>
                        <SelectItem 
                          value="전북" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          전북
                        </SelectItem>
                        <SelectItem 
                          value="전남" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          전남
                        </SelectItem>
                        <SelectItem 
                          value="경북" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          경북
                        </SelectItem>
                        <SelectItem 
                          value="경남" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          경남
                        </SelectItem>
                        <SelectItem 
                          value="제주" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          제주
                        </SelectItem>
                        <SelectItem 
                          value="해외" 
                          className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                        >
                          해외
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {formData.residence && (
                      <div className="flex items-center gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-sm font-medium text-foreground">{formData.residence}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <Code className="w-5 h-5 text-primary" />
                      파이썬에 익숙한 정도
                      <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">필수</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Info className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <p className="text-sm font-medium text-foreground">평가 기준 안내</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            각 단계는 이전 단계의 내용을 포함합니다. 예를 들어, 3단계를 선택하시면 1-2단계 내용도 할 수 있다는 의미입니다. 
                            <span className="block mt-1.5 font-medium text-foreground/90">현재 본인이 실제로 할 수 있는 수준을 선택해주세요.</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { 
                          value: "1", 
                          label: "1단계: 기초 문법",
                          description: "input/print, 변수, 연산자",
                          color: "from-blue-500/10 to-blue-500/5"
                        },
                        { 
                          value: "2", 
                          label: "2단계: 기본 프로그래밍",
                          description: "반복문, 조건문, 자료형, 파일 입출력",
                          color: "from-green-500/10 to-green-500/5"
                        },
                        { 
                          value: "3", 
                          label: "3단계: 데이터 분석 라이브러리 활용",
                          description: "numpy, pandas, scikit-learn, 시각화",
                          color: "from-purple-500/10 to-purple-500/5"
                        },
                        { 
                          value: "4", 
                          label: "4단계: 딥러닝 프레임워크로 모델 구현",
                          description: "PyTorch/TensorFlow",
                          color: "from-orange-500/10 to-orange-500/5"
                        },
                        { 
                          value: "5", 
                          label: "5단계: 프로젝트 관리",
                          description: "아키텍처 설계, 성능 최적화, 모듈화, 테스트/배포, 협업",
                          color: "from-pink-500/10 to-pink-500/5"
                        },
                      ].map((level) => (
                        <div 
                          key={level.value} 
                          className={`group relative flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ease-out cursor-pointer transform ${
                            formData.pythonLevel === level.value
                              ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/10 scale-[1.02]"
                              : "border-border/50 hover:border-primary/30 hover:bg-secondary/20 hover:scale-[1.01] active:scale-[0.99]"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFormData((prev) => {
                              if (prev.pythonLevel !== level.value) {
                                return { ...prev, pythonLevel: level.value };
                              }
                              return prev;
                            });
                          }}
                        >
                          <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                            formData.pythonLevel === level.value
                              ? "border-primary bg-primary"
                              : "border-border"
                          }`}>
                            {formData.pythonLevel === level.value && (
                              <Circle className="h-2.5 w-2.5 fill-current text-primary-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="cursor-pointer flex items-start gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-semibold text-foreground">
                            {level.label}
                                  </span>
                                  {formData.pythonLevel === level.value && (
                                    <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                                      선택됨
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {level.description}
                                </p>
                              </div>
                          </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary" />
                      지금까지 공부해 본 데이터 분석 및 AI 분야
                    </CardTitle>
                    <CardDescription>해당하는 항목을 모두 선택해주세요.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        "데이터 전처리 및 분석 (Pandas, NumPy)",
                        "데이터 시각화 (Matplotlib, Seaborn, Plotly)",
                        "통계 분석 및 가설검정 (T-test, ANOVA, 회귀분석)",
                        "머신러닝 알고리즘 (Random Forest, SVM)",
                        "데이터베이스 및 SQL",
                        "딥러닝 (CNN, RNN, Transformer)",
                        "자연어처리(NLP) 및 컴퓨터비전(CV)",
                      ].map((field) => (
                        <div 
                          key={field} 
                          className={getCheckboxContainerClass(formData.dataAnalysisFields.includes(field))}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const isSelected = formData.dataAnalysisFields.includes(field);
                            handleCheckboxChange("dataAnalysisFields", field, !isSelected);
                          }}
                        >
                          <div className={getCheckboxIconClass(formData.dataAnalysisFields.includes(field))}>
                            {formData.dataAnalysisFields.includes(field) && (
                              <Check className="h-3 w-3 text-primary-foreground" />
                            )}
                          </div>
                          <div className="cursor-pointer flex-1 text-sm flex items-center gap-2">
                            <span>{field}</span>
                            {formData.dataAnalysisFields.includes(field) && (
                              <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                                선택됨
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                      <div 
                        className={getCheckboxContainerClass(formData.dataAnalysisFields.some((f) => f.startsWith("기타")))}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const isSelected = formData.dataAnalysisFields.some((f) => f.startsWith("기타"));
                          if (isSelected) {
                            setFormData({
                              ...formData,
                              dataAnalysisFields: formData.dataAnalysisFields.filter((f) => !f.startsWith("기타")),
                            });
                          } else {
                            setFormData({
                              ...formData,
                              dataAnalysisFields: [...formData.dataAnalysisFields, "기타"],
                            });
                          }
                        }}
                      >
                        <div className={getCheckboxIconClass(formData.dataAnalysisFields.some((f) => f.startsWith("기타")))}>
                          {formData.dataAnalysisFields.some((f) => f.startsWith("기타")) && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <div className="cursor-pointer flex-1 text-sm flex items-center gap-2">
                          <span>기타</span>
                          {formData.dataAnalysisFields.some((f) => f.startsWith("기타")) && (
                            <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                              선택됨
                            </Badge>
                          )}
                        </div>
                        {formData.dataAnalysisFields.some((f) => f.startsWith("기타")) && (
                          <Input
                            placeholder="기타 항목을 입력해주세요"
                            className="ml-2 flex-1 h-10 rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none transition-all duration-200 ease-out focus:scale-[1.01] focus:shadow-md focus:shadow-primary/10"
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              const fields = formData.dataAnalysisFields.filter((f) => !f.startsWith("기타"));
                              setFormData({
                                ...formData,
                                dataAnalysisFields: [...fields, `기타: ${e.target.value}`],
                              });
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        1
                      </div>
                      지원 동기 및 역량
                      <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">필수</Badge>
                    </CardTitle>
                    <CardDescription>
                      KHUDA에 지원한 이유와 자기가 가지고 있는 역량을 바탕으로 쿠다에서 어떠한 장점을 발휘할 수 있는지 서술해주세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="relative">
                    <Textarea
                      id="coreQuestion1"
                      value={formData.coreQuestion1}
                        onChange={(e) => {
                          if (e.target.value.length <= 500) {
                            setFormData({ ...formData, coreQuestion1: e.target.value });
                          }
                        }}
                      required
                        maxLength={500}
                        className={`min-h-[180px] rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none resize-none pr-20 transition-all duration-200 ease-out focus:scale-[1.005] focus:shadow-md focus:shadow-primary/10 ${
                          formData.coreQuestion1.length >= 450 ? "border-orange-500/50" : ""
                        }`}
                      placeholder="답변을 작성해주세요..."
                    />
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-200 ease-out ${
                          formData.coreQuestion1.length >= 450 
                            ? "bg-orange-500/10 border border-orange-500/30" 
                            : formData.coreQuestion1.length > 0
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-background/80 backdrop-blur-sm border border-border/40"
                        }`}>
                          <span className={`text-xs font-semibold ${
                            formData.coreQuestion1.length >= 500 
                              ? "text-orange-600" 
                              : formData.coreQuestion1.length >= 450
                              ? "text-orange-500"
                              : formData.coreQuestion1.length > 0 
                              ? "text-primary" 
                              : "text-muted-foreground"
                          }`}>
                            {formData.coreQuestion1.length}
                          </span>
                          <span className="text-xs text-muted-foreground">/</span>
                          <span className="text-xs text-muted-foreground">500</span>
                        </div>
                      </div>
                    </div>
                    {formData.coreQuestion1.length >= 450 && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/5 border border-orange-500/20 animate-in fade-in slide-in-from-top-1 duration-200">
                        <Info className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <p className="text-xs text-orange-600">
                          {formData.coreQuestion1.length >= 500 
                            ? "최대 글자수에 도달했습니다" 
                            : `${500 - formData.coreQuestion1.length}자 남았습니다`}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        2
                      </div>
                      도전과 끈기
                      <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">필수</Badge>
                    </CardTitle>
                    <CardDescription>
                      힘들었거나 끈기있게 무언가를 수행해 본 경험이 있다면 서술해주세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="relative">
                    <Textarea
                      id="coreQuestion2"
                      value={formData.coreQuestion2}
                        onChange={(e) => {
                          if (e.target.value.length <= 500) {
                            setFormData({ ...formData, coreQuestion2: e.target.value });
                          }
                        }}
                      required
                        maxLength={500}
                        className={`min-h-[180px] rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none resize-none pr-20 transition-all duration-200 ease-out focus:scale-[1.005] focus:shadow-md focus:shadow-primary/10 ${
                          formData.coreQuestion2.length >= 450 ? "border-orange-500/50" : ""
                        }`}
                      placeholder="답변을 작성해주세요..."
                    />
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-200 ease-out ${
                          formData.coreQuestion2.length >= 450 
                            ? "bg-orange-500/10 border border-orange-500/30" 
                            : formData.coreQuestion2.length > 0
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-background/80 backdrop-blur-sm border border-border/40"
                        }`}>
                          <span className={`text-xs font-semibold ${
                            formData.coreQuestion2.length >= 500 
                              ? "text-orange-600" 
                              : formData.coreQuestion2.length >= 450
                              ? "text-orange-500"
                              : formData.coreQuestion2.length > 0 
                              ? "text-primary" 
                              : "text-muted-foreground"
                          }`}>
                            {formData.coreQuestion2.length}
                          </span>
                          <span className="text-xs text-muted-foreground">/</span>
                          <span className="text-xs text-muted-foreground">500</span>
                        </div>
                      </div>
                    </div>
                    {formData.coreQuestion2.length >= 450 && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/5 border border-orange-500/20 animate-in fade-in slide-in-from-top-1 duration-200">
                        <Info className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <p className="text-xs text-orange-600">
                          {formData.coreQuestion2.length >= 500 
                            ? "최대 글자수에 도달했습니다" 
                            : `${500 - formData.coreQuestion2.length}자 남았습니다`}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        3
                      </div>
                      프로젝트 및 탐구 경험
                      <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">필수</Badge>
                    </CardTitle>
                    <CardDescription>
                      자신이 했던 프로젝트나, 탐구했던 경험이 있다면 서술해주세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="relative">
                    <Textarea
                      id="coreQuestion3"
                      value={formData.coreQuestion3}
                        onChange={(e) => {
                          if (e.target.value.length <= 500) {
                            setFormData({ ...formData, coreQuestion3: e.target.value });
                          }
                        }}
                      required
                        maxLength={500}
                        className={`min-h-[180px] rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none resize-none pr-20 transition-all duration-200 ease-out focus:scale-[1.005] focus:shadow-md focus:shadow-primary/10 ${
                          formData.coreQuestion3.length >= 450 ? "border-orange-500/50" : ""
                        }`}
                      placeholder="답변을 작성해주세요..."
                    />
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-200 ease-out ${
                          formData.coreQuestion3.length >= 450 
                            ? "bg-orange-500/10 border border-orange-500/30" 
                            : formData.coreQuestion3.length > 0
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-background/80 backdrop-blur-sm border border-border/40"
                        }`}>
                          <span className={`text-xs font-semibold ${
                            formData.coreQuestion3.length >= 500 
                              ? "text-orange-600" 
                              : formData.coreQuestion3.length >= 450
                              ? "text-orange-500"
                              : formData.coreQuestion3.length > 0 
                              ? "text-primary" 
                              : "text-muted-foreground"
                          }`}>
                            {formData.coreQuestion3.length}
                          </span>
                          <span className="text-xs text-muted-foreground">/</span>
                          <span className="text-xs text-muted-foreground">500</span>
                        </div>
                      </div>
                    </div>
                    {formData.coreQuestion3.length >= 450 && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/5 border border-orange-500/20 animate-in fade-in slide-in-from-top-1 duration-200">
                        <Info className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <p className="text-xs text-orange-600">
                          {formData.coreQuestion3.length >= 500 
                            ? "최대 글자수에 도달했습니다" 
                            : `${500 - formData.coreQuestion3.length}자 남았습니다`}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary" />
                      하고 싶은 소모임이나 스터디가 있나요?
                    </CardTitle>
                    <CardDescription>
                      KHUDA는 스터디 및 소모임을 적극 권장하고 있으며, KHUDA 9기에서는 더욱 강조하여 활성화할 생각입니다. (산학협력 프로젝트, SQL 스터디, 공모전 스터디 등이 예정되어 있습니다)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input
                      id="studyGroup"
                      placeholder="ex) 자격증 스터디, 수학 스터디, 운동 소모임 등"
                      value={formData.studyGroup}
                      onChange={(e) => setFormData({ ...formData, studyGroup: e.target.value })}
                      className="h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none transition-all duration-200 ease-out focus:scale-[1.01] focus:shadow-md focus:shadow-primary/10"
                    />
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <Activity className="w-5 h-5 text-primary" />
                      지금까지 했던 기타 활동을 작성해주세요
                    </CardTitle>
                    <CardDescription>데이터 분석과 관련이 없더라도 괜찮습니다.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      id="otherActivities"
                      value={formData.otherActivities}
                      onChange={(e) => setFormData({ ...formData, otherActivities: e.target.value })}
                      className="min-h-[120px] rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none resize-none transition-all duration-200 ease-out focus:scale-[1.005] focus:shadow-md focus:shadow-primary/10"
                      placeholder="답변을 작성해주세요..."
                    />
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      2026년도 1학기 활동 일정
                    </CardTitle>
                    <CardDescription>
                      타 동아리나, 학생회, 아르바이트, 대외활동 관련하여 서술해주세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      id="schedule2026"
                      value={formData.schedule2026}
                      onChange={(e) => setFormData({ ...formData, schedule2026: e.target.value })}
                      className="min-h-[120px] rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none resize-none transition-all duration-200 ease-out focus:scale-[1.005] focus:shadow-md focus:shadow-primary/10"
                      placeholder="답변을 작성해주세요..."
                    />
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <Award className="w-5 h-5 text-primary" />
                      취득한 자격증 및 수상이력
                    </CardTitle>
                    <CardDescription>해당 사항이 없는 경우 작성하지 않으셔도 됩니다.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      id="certificates"
                      value={formData.certificates}
                      onChange={(e) => setFormData({ ...formData, certificates: e.target.value })}
                      className="min-h-[120px] rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none resize-none transition-all duration-200 ease-out focus:scale-[1.005] focus:shadow-md focus:shadow-primary/10"
                      placeholder="답변을 작성해주세요..."
                    />
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <Heart className="w-5 h-5 text-primary" />
                      KHUDA 9기에게 바라는 내용
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      id="expectations"
                      value={formData.expectations}
                      onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
                      className="min-h-[120px] rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none resize-none transition-all duration-200 ease-out focus:scale-[1.005] focus:shadow-md focus:shadow-primary/10"
                      placeholder="답변을 작성해주세요..."
                    />
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      면접 가능 일정
                      <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">필수</Badge>
                    </CardTitle>
                    <CardDescription>
                      면접 가능한 날짜와 시간을 모두 선택해주세요. 여러 날짜와 시간을 선택할 수 있습니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 bg-primary rounded-full" />
                        <h3 className="text-sm font-semibold text-foreground">면접 가능 날짜</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "1월 9일 (금)", label: "1월 9일", subLabel: "금요일" },
                          { value: "1월 10일 (토)", label: "1월 10일", subLabel: "토요일" },
                          { value: "1월 11일 (일)", label: "1월 11일", subLabel: "일요일" },
                        ].map((date) => (
                          <div
                            key={date.value}
                            data-interview-select="true"
                            className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                              formData.interviewDates.includes(date.value)
                                ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                                : "border-border/40 bg-secondary/10 hover:border-primary/40 hover:bg-secondary/20"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const isSelected = formData.interviewDates.includes(date.value);
                              handleCheckboxChange("interviewDates", date.value, !isSelected);
                              // 날짜 선택 시 해당 날짜로 전환
                              if (!isSelected) {
                                setFormData((prev) => ({
                                  ...prev,
                                  selectedInterviewDate: date.value,
                                }));
                              }
                            }}
                          >
                            <div className="cursor-pointer w-full flex flex-col items-center gap-1.5">
                              <span className={`text-base font-semibold ${
                                formData.interviewDates.includes(date.value) ? "text-primary" : "text-foreground"
                              }`}>
                                {date.label}
                              </span>
                              <span className="text-xs text-muted-foreground">{date.subLabel}</span>
                              {formData.interviewDates.includes(date.value) && (
                                <div className="mt-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
                                  <CheckCircle className="w-4 h-4 text-primary-foreground" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {formData.selectedInterviewDate ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1 h-4 bg-primary rounded-full" />
                          <h3 className="text-sm font-semibold text-foreground">
                            면접 가능 시간
                            <span className="text-xs text-muted-foreground ml-2">
                              ({formData.selectedInterviewDate} 선택 중)
                            </span>
                          </h3>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2.5">
                          {interviewTimes.map((time) => {
                            const currentTimes = formData.interviewTimesByDate[formData.selectedInterviewDate] || [];
                            const isSelected = currentTimes.includes(time);
                            return (
                              <div
                                key={time}
                                data-interview-select="true"
                                className={getInterviewTimeButtonClass(isSelected)}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                            handleCheckboxChange("interviewTimes", time, !isSelected);
                          }}
                        >
                                <div className="cursor-pointer w-full flex flex-col items-center gap-1">
                                  <span className={`text-sm font-medium ${
                                    isSelected ? "text-primary" : "text-foreground"
                                  }`}>
                            {time}
                                  </span>
                              {isSelected && (
                                <CheckCircle className="w-3.5 h-3.5 text-primary animate-in fade-in zoom-in-95 duration-200" />
                              )}
                        </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 rounded-xl bg-secondary/20 border border-border/40 text-center">
                        <p className="text-sm text-muted-foreground">
                          날짜를 먼저 선택해주세요
                        </p>
                      </div>
                    )}

                    {formData.interviewDates.length > 0 && Object.keys(formData.interviewTimesByDate).length > 0 && (
                      <div className="pt-4 border-t border-border/50 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-start gap-2 p-4 rounded-xl bg-primary/5 border border-primary/20 transition-all duration-200 ease-out hover:bg-primary/10">
                          <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <div className="flex-1 space-y-3">
                            <p className="text-xs font-semibold text-foreground">선택된 일정</p>
                            <div className="space-y-2.5">
                              {formData.interviewDates.map((date, idx) => {
                                const times = formData.interviewTimesByDate[date] || [];
                                if (times.length === 0) return null;
                                return (
                                  <div key={date} className="space-y-1.5 animate-in fade-in slide-in-from-left-2 duration-200" style={{ animationDelay: `${idx * 50}ms` }}>
                                    <div className="flex items-center gap-2">
                                      <div className="w-1 h-4 bg-primary rounded-full" />
                                      <span className="text-sm font-medium text-foreground">{date}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 pl-3">
                                      {times.map((time, timeIdx) => (
                                        <Badge 
                                          key={`${date}-${time}`} 
                                          variant="default" 
                                          className="text-[10px] px-2 py-0.5 rounded-md animate-in fade-in zoom-in-95 duration-200 transition-all duration-200 ease-out hover:scale-105"
                                          style={{ animationDelay: `${(idx * 50) + (timeIdx * 30)}ms` }}
                                        >
                                          {time}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {formData.applicationType === "ob" && (
              <div className="space-y-8">
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <ClipboardList className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">OB 설문섹션</CardTitle>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      OB 지원자의 경우 별도 면접 없이 진행되며, 본 학기 OB 스터디 및 다양한 활동 프로그램이 준비되어 있습니다. 적극적인 참여를 기대합니다.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      수료조건
                    </CardTitle>
                    <CardDescription>스터디와 트랙 모두 참여 가능합니다.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 flex items-center justify-center">
                        <p className="text-sm font-medium text-foreground text-center">스터디 1회 + KHUDA 학술제</p>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 flex items-center justify-center">
                        <p className="text-sm font-medium text-foreground text-center">심화 트랙 + KHUDA 학술제</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary" />
                      스터디 개설 여부
                    </CardTitle>
                    <CardDescription>
                      KHUDA는 강의 및 교재비를 일부 지원하고 있습니다. 많은 관심과 참여 부탁드립니다.
                      <br />
                      <span className="text-destructive font-medium">※ 트랙 참여와 스터디 개설 중 최소한 하나는 선택해주셔야 합니다.</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div 
                        className={getCheckboxContainerClass(formData.studyIntention === "yes")}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setFormData((prev) => {
                            if (prev.studyIntention !== "yes") {
                              return { ...prev, studyIntention: "yes" };
                            }
                            return prev;
                          });
                        }}
                      >
                        <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          formData.studyIntention === "yes"
                            ? "border-primary bg-primary"
                            : "border-border"
                        }`}>
                          {formData.studyIntention === "yes" && (
                            <Circle className="h-2.5 w-2.5 fill-current text-primary-foreground" />
                          )}
                        </div>
                        <div className="cursor-pointer font-medium flex-1 flex items-center gap-2">
                          <span className="transition-all duration-200">개설 의사 있다</span>
                          {formData.studyIntention === "yes" && (
                            <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                              선택됨
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div 
                        className={getCheckboxContainerClass(formData.studyIntention === "no")}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setFormData((prev) => {
                            if (prev.studyIntention !== "no") {
                              return { ...prev, studyIntention: "no" };
                            }
                            return prev;
                          });
                        }}
                      >
                        <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          formData.studyIntention === "no"
                            ? "border-primary bg-primary"
                            : "border-border"
                        }`}>
                          {formData.studyIntention === "no" && (
                            <Circle className="h-2.5 w-2.5 fill-current text-primary-foreground" />
                          )}
                        </div>
                        <div className="cursor-pointer font-medium flex-1 flex items-center gap-2">
                          <span className="transition-all duration-200">개설 의사 없다</span>
                          {formData.studyIntention === "no" && (
                            <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                              선택됨
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {formData.studyIntention === "yes" && (
                  <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        스터디를 개설한다면 세부 사항
                      </CardTitle>
                      <CardDescription>스터디 개설에 대한 세부 사항을 작성해주세요.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        id="studyDetails"
                        value={formData.studyDetails}
                        onChange={(e) => setFormData({ ...formData, studyDetails: e.target.value })}
                        className="min-h-[180px] rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none resize-none"
                        placeholder="스터디 주제, 진행 방식, 예상 일정 등을 작성해주세요..."
                      />
                    </CardContent>
                  </Card>
                )}

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <Layers className="w-5 h-5 text-primary" />
                      참여하고자 하는 심화 트랙
                    </CardTitle>
                    <CardDescription>
                      심화 트랙 참여를 희망하시는 경우에만 선택해주세요.
                      <br />
                      <span className="text-destructive font-medium">※ 트랙 참여와 스터디 개설 중 최소한 하나는 선택해주셔야 합니다.</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { value: "nlp", label: "NLP (자연어처리)" },
                        { value: "cv", label: "CV (컴퓨터비전)" },
                        { value: "de", label: "DE (데이터엔지니어링)" },
                        { value: "da", label: "DA (데이터분석)" },
                        { value: "aie", label: "AIE (AI엔지니어링)" },
                        { value: "fin", label: "FIN (금융)" },
                      ].map((track) => (
                        <div 
                          key={track.value} 
                          className={getCheckboxContainerClass(formData.trackInterest === track.value)}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFormData((prev) => {
                              if (prev.trackInterest !== track.value) {
                                return { ...prev, trackInterest: track.value };
                              }
                              return prev;
                            });
                          }}
                        >
                          <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            formData.trackInterest === track.value
                              ? "border-primary bg-primary"
                              : "border-border"
                          }`}>
                            {formData.trackInterest === track.value && (
                              <Circle className="h-2.5 w-2.5 fill-current text-primary-foreground" />
                            )}
                          </div>
                          <div className="cursor-pointer font-medium flex-1 flex items-center gap-2">
                            <span className="transition-all duration-200">{track.label}</span>
                            {formData.trackInterest === track.value && (
                              <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                                선택됨
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                      <div 
                        className={getCheckboxContainerClass(formData.trackInterest === "none")}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setFormData((prev) => {
                            if (prev.trackInterest !== "none") {
                              return { ...prev, trackInterest: "none" };
                            }
                            return prev;
                          });
                        }}
                      >
                        <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          formData.trackInterest === "none"
                            ? "border-primary bg-primary"
                            : "border-border"
                        }`}>
                          {formData.trackInterest === "none" && (
                            <Circle className="h-2.5 w-2.5 fill-current text-primary-foreground" />
                          )}
                        </div>
                        <div className="cursor-pointer font-medium flex-1 flex items-center gap-2">
                          <span className="transition-all duration-200">참여 의사 없음</span>
                          {formData.trackInterest === "none" && (
                            <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                              선택됨
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <Heart className="w-5 h-5 text-primary" />
                      KHUDA에게 바라는 것
                      {formData.obExpectations.length > 0 && (
                        <span 
                          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                          style={{
                            animation: 'tossAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          }}
                        >
                          좋은 의견 감사합니다
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      id="obExpectations"
                      value={formData.obExpectations}
                      onChange={(e) => setFormData({ ...formData, obExpectations: e.target.value })}
                      className="min-h-[120px] rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none resize-none transition-all duration-200 ease-out focus:scale-[1.005] focus:shadow-md focus:shadow-primary/10"
                      placeholder="KHUDA에 대한 바람이나 제안사항을 작성해주세요..."
                    />
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="sticky bottom-0 pb-8 pt-4 bg-background/80 backdrop-blur-md border-t border-border/50 -mx-6 md:-mx-12 px-6 md:px-12">
              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full rounded-xl h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                disabled={isSubmitting || !isFormValid()}
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
