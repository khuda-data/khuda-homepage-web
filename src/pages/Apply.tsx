import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle, Calendar, Users, Mail, Phone, MapPin, Code, BookOpen, Award, Clock, FileText, Instagram, Copy, UserCircle, Layers, Info, Activity, Heart, Circle, Check, HelpCircle } from "lucide-react";
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
import { 
  CONTACT_EMAIL, 
  CONTACT_PHONE, 
  RECRUITMENT_SCHEDULE, 
  RECRUITMENT_INFO,
  filterOBQuestions,
  APPLICATION_FORM_CONFIG,
  CURRICULUM_INFO,
  SOCIAL_LINKS,
  COMMON_STYLES,
} from "@/lib/constants";

const interviewTimes = generateInterviewTimes();

const Apply = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commonQuestions, setCommonQuestions] = useState<Question[]>([]);
  const [typeQuestions, setTypeQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [formData, setFormData] = useState({
    applicationType: "",
    answers: {} as Record<string, string>,
    interviewDates: [] as string[],
    interviewTimesByDate: {} as Record<string, string[]>,
    selectedInterviewDate: "" as string,
  });

  useEffect(() => {
    const fetchCommonQuestions = async () => {
      setIsLoadingQuestions(true);
      try {
        const response = await getQuestions("common");
        const sortedQuestions = response.questions.sort((a, b) => a.position - b.position);
        setCommonQuestions(sortedQuestions);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "질문을 가져오는데 실패했습니다.";
        toast({
          title: "질문 로드 실패",
          description: errorMessage,
          variant: "destructive",
        });
        setCommonQuestions([]);
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    fetchCommonQuestions();
  }, [toast]);

  useEffect(() => {
    const fetchTypeQuestions = async () => {
      if (!formData.applicationType) {
        setTypeQuestions([]);
        return;
      }

      setIsLoadingQuestions(true);
      try {
        const response = await getQuestions(formData.applicationType as "yb" | "ob" | "common");
        let sortedQuestions = response.questions.sort((a, b) => a.position - b.position);
        
        if (formData.applicationType === "ob") {
          sortedQuestions = filterOBQuestions(sortedQuestions);
        }
        
        setTypeQuestions(sortedQuestions);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "질문을 가져오는데 실패했습니다.";
        toast({
          title: "질문 로드 실패",
          description: errorMessage,
          variant: "destructive",
        });
        setTypeQuestions([]);
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    fetchTypeQuestions();
  }, [formData.applicationType, toast]);

  const questions = [...commonQuestions, ...typeQuestions];

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

    const privacyQuestion = questions.find(q => q.question.includes("개인정보") || q.question.includes("동의"));
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

    if (formData.applicationType === "yb") {
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
      
      const interviewDatesQuestion = questions.find(q => 
        q.question.includes("면접") && (q.question.includes("날짜") || q.question.includes("일정"))
      );
      const interviewTimesQuestion = questions.find(q => 
        q.question.includes("면접") && q.question.includes("시간")
      );
      
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

    if (formData.applicationType === "ob") {
      const studyIntentionQuestionId = findQuestionId(["스터디 개설"]);
      const trackInterestQuestionId = findQuestionId(["트랙"]);
      
      const studyIntentionValue = studyIntentionQuestionId ? getAnswer(studyIntentionQuestionId) : "";
      const trackInterestValue = trackInterestQuestionId ? getAnswer(trackInterestQuestionId) : "";
      
      const hasStudyIntention = studyIntentionValue === "yes";
      const hasTrackInterest = trackInterestValue && trackInterestValue !== "none" && trackInterestValue !== "";
      
      if (!hasStudyIntention && !hasTrackInterest) {
        toast({
          title: APPLICATION_FORM_CONFIG.errorMessages.obRequirement.title,
          description: APPLICATION_FORM_CONFIG.errorMessages.obRequirement.description,
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);
    
    try {
      const filteredAnswers: Record<string, string> = {};
      const questionIds = new Set(questions.map(q => q.id.toString()));
      
      Object.keys(formData.answers).forEach(questionId => {
        if (questionIds.has(questionId)) {
          filteredAnswers[questionId] = formData.answers[questionId];
        }
      });

      if (formData.applicationType === "yb") {
        const interviewDatesQuestion = questions.find(q => 
          q.question.includes("면접") && (q.question.includes("날짜") || q.question.includes("일정"))
        );
        if (interviewDatesQuestion) {
          filteredAnswers[interviewDatesQuestion.id.toString()] = JSON.stringify(formData.interviewDates);
        }

        const interviewTimesQuestion = questions.find(q => 
          q.question.includes("면접") && q.question.includes("시간")
        );
        if (interviewTimesQuestion) {
          filteredAnswers[interviewTimesQuestion.id.toString()] = JSON.stringify(formData.interviewTimesByDate);
        }
      }

      questions.forEach(question => {
        const questionId = question.id.toString();
        if (question.required && !filteredAnswers[questionId]) {
          if (question.question.includes("면접") && question.question.includes("시간")) {
            filteredAnswers[questionId] = JSON.stringify({});
          } else if (question.question.includes("면접") && question.question.includes("날짜")) {
            filteredAnswers[questionId] = JSON.stringify([]);
          } else {
            filteredAnswers[questionId] = "";
          }
        }
      });

      const response = await submitApplication(formData.applicationType as "yb" | "ob", filteredAnswers);
      
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

  const findQuestionId = (keywords: string[]): number | null => {
    const question = questions.find(q => 
      keywords.some(keyword => q.question.includes(keyword))
    );
    return question ? question.id : null;
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

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    const success = await copyToClipboard(CONTACT_EMAIL);
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

  const renderQuestion = (question: Question) => {
    const questionId = question.id.toString();
    const answer = formData.answers[questionId] || "";
    
    const studyIntentionQuestionId = formData.applicationType === "ob" ? findQuestionId(["스터디 개설"]) : null;
    const studyIntentionValue = studyIntentionQuestionId ? getAnswer(studyIntentionQuestionId) : "";
    const isStudyDisabled = formData.applicationType === "ob" && studyIntentionValue === "no" && 
                            question.question.includes("스터디") && question.question.includes("세부");
    
    if (formData.applicationType === "yb" && question.question.includes("면접") && question.question.includes("날짜")) {
      return null;
    }
    if (formData.applicationType === "yb" && question.question.includes("면접") && question.question.includes("시간")) {
      return null;
    }

    if (question.question.includes("개인정보") || question.question.includes("동의")) {
      return null;
    }

    const isCommonQuestion = question.applicant_type === "common";
    
    const getPlaceholder = (q: string) => {
      if (q.includes("이름")) return APPLICATION_FORM_CONFIG.placeholderTexts.name;
      if (q.includes("학번")) return APPLICATION_FORM_CONFIG.placeholderTexts.studentId;
      if (q.includes("학년") || q.includes("학기")) return APPLICATION_FORM_CONFIG.placeholderTexts.grade;
      if (q.includes("주전공")) return APPLICATION_FORM_CONFIG.placeholderTexts.major;
      if (q.includes("다전공") || q.includes("부전공")) return APPLICATION_FORM_CONFIG.placeholderTexts.doubleMajor;
      if (q.includes("이메일")) return APPLICATION_FORM_CONFIG.placeholderTexts.email;
      if (q.includes("휴대폰") || q.includes("전화번호")) return APPLICATION_FORM_CONFIG.placeholderTexts.phone;
      return APPLICATION_FORM_CONFIG.commonTexts.defaultPlaceholder;
    };

    const getIcon = (q: string) => {
      if (q.includes("거주") || q.includes("지역")) return <MapPin className="w-5 h-5 text-primary" />;
      if (q.includes("파이썬") || q.includes("Python")) return <Code className="w-5 h-5 text-primary" />;
      if (q.includes("데이터 분석") || q.includes("AI 분야")) return <BookOpen className="w-5 h-5 text-primary" />;
      if (q.includes("지원 동기") || q.includes("역량")) return null; // 번호로 표시
      if (q.includes("도전") || q.includes("끈기")) return null; // 번호로 표시
      if (q.includes("프로젝트") || q.includes("탐구")) return null; // 번호로 표시
      if (q.includes("소모임") || q.includes("스터디")) return <Users className="w-5 h-5 text-primary" />;
      if (q.includes("활동")) return <Activity className="w-5 h-5 text-primary" />;
      if (q.includes("일정")) return <Calendar className="w-5 h-5 text-primary" />;
      if (q.includes("자격증") || q.includes("수상")) return <Award className="w-5 h-5 text-primary" />;
      if (q.includes("바라는") || q.includes("9기에게")) return <Heart className="w-5 h-5 text-primary" />;
      if (q.includes("트랙")) return <Layers className="w-5 h-5 text-primary" />;
      if (q.includes("스터디 개설")) return <BookOpen className="w-5 h-5 text-primary" />;
      return <FileText className="w-5 h-5 text-primary" />;
    };

    const getQuestionNumber = (q: string) => {
      if (q.includes("지원 동기") || q.includes("역량")) return APPLICATION_FORM_CONFIG.questionNumbers.motivation;
      if (q.includes("도전") || q.includes("끈기")) return APPLICATION_FORM_CONFIG.questionNumbers.challenge;
      if (q.includes("프로젝트") || q.includes("탐구")) return APPLICATION_FORM_CONFIG.questionNumbers.project;
      return null;
    };

    if (isCommonQuestion && question.field_type === "text") {
      const isPhoneField = question.question.includes("휴대폰") || question.question.includes("전화번호");
      
      return (
        <div key={question.id} className="space-y-2">
          <Label htmlFor={questionId} className="text-sm font-semibold">
            {question.question}
            {question.required && (
              <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md ml-2">
                필수
              </Badge>
            )}
          </Label>
          <Input
            id={questionId}
            value={answer}
            onChange={(e) => {
              const value = e.target.value;
              if (question.max_len === null || value.length <= question.max_len) {
                updateAnswer(question.id, value);
              }
            }}
            placeholder={getPlaceholder(question.question)}
            required={question.required}
            maxLength={question.max_len || undefined}
            className="h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none transition-all duration-200 ease-out focus:scale-[1.005] focus:shadow-md focus:shadow-primary/10"
          />
          {isPhoneField && (
            <p className="text-xs text-muted-foreground">하이픈(-)을 포함하여 입력해주세요. 예: 010-1234-5678</p>
          )}
        </div>
      );
    }

    if (question.question.includes("거주지역") || question.question.includes("거주")) {
      const residenceOptions = APPLICATION_FORM_CONFIG.residenceOptions;
      
      return (
        <Card key={question.id} className={COMMON_STYLES.cardBase}>
          <div className={COMMON_STYLES.cardGradient}></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-xl flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              {question.question}
              {question.required && (
                <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">{APPLICATION_FORM_CONFIG.commonTexts.required}</Badge>
              )}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {APPLICATION_FORM_CONFIG.residenceDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <Select
              value={answer}
              onValueChange={(value) => updateAnswer(question.id, value)}
              required={question.required}
            >
              <SelectTrigger 
                className={`h-14 rounded-2xl text-base font-medium transition-all duration-200 ease-out transform ${
                  answer
                    ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/60 shadow-md shadow-primary/10 scale-[1.01]"
                    : "bg-secondary/20 border-2 border-border/40 hover:border-primary/30 hover:bg-secondary/30 hover:scale-[1.01] active:scale-[0.99]"
                } focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none focus:scale-[1.01]`}
              >
                <div className="flex items-center gap-2.5 flex-1">
                  {answer && (
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  )}
                  <SelectValue placeholder={APPLICATION_FORM_CONFIG.commonTexts.selectRegion} />
                </div>
              </SelectTrigger>
              <SelectContent 
                className="rounded-2xl border-2 border-border/50 bg-card/95 backdrop-blur-md shadow-xl max-h-[320px] p-2"
                position="popper"
              >
                {residenceOptions.map((option) => (
                  <SelectItem 
                    key={option}
                    value={option} 
                    className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02]"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      );
    }

    if (question.question.includes("파이썬") || question.question.includes("Python")) {
      const pythonLevels = APPLICATION_FORM_CONFIG.pythonLevels;
      
      return (
        <Card key={question.id} className={COMMON_STYLES.cardBase}>
          <div className={COMMON_STYLES.cardGradient}></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-xl flex items-center gap-3">
              <Code className="w-5 h-5 text-primary" />
              {question.question}
              {question.required && (
                <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">{APPLICATION_FORM_CONFIG.commonTexts.required}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <p className="text-sm font-medium text-foreground">{APPLICATION_FORM_CONFIG.pythonLevelGuide.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {APPLICATION_FORM_CONFIG.pythonLevelGuide.description}
                    <span className="block mt-1.5 font-medium text-foreground/90">{APPLICATION_FORM_CONFIG.pythonLevelGuide.note}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {pythonLevels.map((level) => (
                <div 
                  key={level.value} 
                  className={`group relative flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ease-out cursor-pointer transform ${
                    answer === level.value
                      ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/10 scale-[1.02]"
                      : "border-border/50 hover:border-primary/30 hover:bg-secondary/20 hover:scale-[1.01] active:scale-[0.99]"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateAnswer(question.id, level.value);
                  }}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                    answer === level.value
                      ? "border-primary bg-primary"
                      : "border-border"
                  }`}>
                    {answer === level.value && (
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
                          {answer === level.value && (
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
      );
    }

    if (question.question.includes("데이터 분석") || question.question.includes("AI 분야")) {
      const dataAnalysisFields = APPLICATION_FORM_CONFIG.dataAnalysisFields;
      
      const dataAnalysisFieldsArray = getArrayAnswer(question.id);
      
      return (
        <Card key={question.id} className={COMMON_STYLES.cardBase}>
          <div className={COMMON_STYLES.cardGradient}></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-xl flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-primary" />
              {question.question}
            </CardTitle>
            <CardDescription>해당하는 항목을 모두 선택해주세요.</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-3">
              {dataAnalysisFields.map((field) => (
                <div 
                  key={field} 
                  className={getCheckboxContainerClass(dataAnalysisFieldsArray.includes(field))}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCheckboxChange(question.id, field, !dataAnalysisFieldsArray.includes(field));
                  }}
                >
                  <div className={getCheckboxIconClass(dataAnalysisFieldsArray.includes(field))}>
                    {dataAnalysisFieldsArray.includes(field) && (
                      <Check className="h-3 w-3 text-primary-foreground" />
                    )}
                  </div>
                  <div className="cursor-pointer flex-1 text-sm flex items-center gap-2">
                    <span>{field}</span>
                    {dataAnalysisFieldsArray.includes(field) && (
                      <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                        선택됨
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              <div 
                className={getCheckboxContainerClass(dataAnalysisFieldsArray.some((f) => f.startsWith("기타")))}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const isSelected = dataAnalysisFieldsArray.some((f) => f.startsWith("기타"));
                  const newArray = isSelected
                    ? dataAnalysisFieldsArray.filter((f) => !f.startsWith("기타"))
                    : [...dataAnalysisFieldsArray, "기타"];
                  updateAnswer(question.id, JSON.stringify(newArray));
                }}
              >
                <div className={getCheckboxIconClass(dataAnalysisFieldsArray.some((f) => f.startsWith("기타")))}>
                  {dataAnalysisFieldsArray.some((f) => f.startsWith("기타")) && (
                    <Check className="h-3 w-3 text-primary-foreground" />
                  )}
                </div>
                <div className="cursor-pointer flex-1 text-sm flex items-center gap-2">
                  <span>기타</span>
                  {dataAnalysisFieldsArray.some((f) => f.startsWith("기타")) && (
                    <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                      선택됨
                    </Badge>
                  )}
                </div>
                {dataAnalysisFieldsArray.some((f) => f.startsWith("기타")) && (
                  <Input
                    placeholder="기타 항목을 입력해주세요"
                    className="ml-2 flex-1 h-10 rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none transition-all duration-200 ease-out focus:scale-[1.01] focus:shadow-md focus:shadow-primary/10"
                    onClick={(e) => e.stopPropagation()}
                    value={dataAnalysisFieldsArray.find((f) => f.startsWith("기타"))?.replace("기타: ", "") || ""}
                    onChange={(e) => {
                      const otherValue = e.target.value;
                      const newArray = otherValue
                        ? [...dataAnalysisFieldsArray.filter((f) => !f.startsWith("기타")), `기타: ${otherValue}`]
                        : dataAnalysisFieldsArray.filter((f) => !f.startsWith("기타"));
                      updateAnswer(question.id, JSON.stringify(newArray));
                    }}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    const questionNumber = getQuestionNumber(question.question);
    if (questionNumber && (question.field_type === "textarea" || question.question.includes("지원 동기") || question.question.includes("도전") || question.question.includes("프로젝트"))) {
      const maxLen = question.max_len || 500;
      const getDescription = (q: string) => {
        if (q.includes("지원 동기") || q.includes("역량")) {
          return "KHUDA에 지원한 이유와 자기가 가지고 있는 역량을 바탕으로 쿠다에서 어떠한 장점을 발휘할 수 있는지 서술해주세요.";
        }
        if (q.includes("도전") || q.includes("끈기")) {
          return "힘들었거나 끈기있게 무언가를 수행해 본 경험이 있다면 서술해주세요.";
        }
        if (q.includes("프로젝트") || q.includes("탐구")) {
          return "자신이 했던 프로젝트나, 탐구했던 경험이 있다면 서술해주세요.";
        }
        return "";
      };
      
      return (
        <Card key={question.id} className={COMMON_STYLES.cardBase}>
          <div className={COMMON_STYLES.cardGradient}></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-xl flex items-center gap-3">
              {question.question}
              {question.required && (
                <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">{APPLICATION_FORM_CONFIG.commonTexts.required}</Badge>
              )}
            </CardTitle>
            <CardDescription>
              {getDescription(question.question)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 relative z-10">
            <div className="relative">
              <Textarea
                id={`question-${question.id}`}
                value={answer}
                onChange={(e) => {
                  const value = e.target.value;
                  if (maxLen === null || value.length <= maxLen) {
                    updateAnswer(question.id, value);
                  }
                }}
                required={question.required}
                maxLength={maxLen || undefined}
                className={`min-h-[180px] rounded-xl bg-secondary/30 border-border/50 focus:border-primary/60 focus:outline-none resize-none pr-20 transition-all duration-200 ease-out focus:scale-[1.005] focus:shadow-md focus:shadow-primary/10 ${
                  maxLen && answer.length >= maxLen * 0.9 ? "border-orange-500/50" : ""
                }`}
                placeholder="답변을 작성해주세요..."
              />
              {maxLen && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-200 ease-out ${
                    answer.length >= maxLen 
                      ? "bg-orange-500/10 border border-orange-500/30" 
                      : answer.length > 0
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-background/80 backdrop-blur-sm border border-border/40"
                  }`}>
                    <span className={`text-xs font-semibold ${
                      answer.length >= maxLen 
                        ? "text-orange-600" 
                        : answer.length >= maxLen * 0.9
                        ? "text-orange-500"
                        : answer.length > 0 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    }`}>
                      {answer.length}
                    </span>
                    <span className="text-xs text-muted-foreground">/</span>
                    <span className="text-xs text-muted-foreground">{maxLen}</span>
                  </div>
                </div>
              )}
            </div>
            {maxLen && answer.length >= maxLen * 0.9 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/5 border border-orange-500/20 animate-in fade-in slide-in-from-top-1 duration-200">
                <Info className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <p className="text-xs text-orange-600">
                  {answer.length >= maxLen 
                    ? "최대 글자수에 도달했습니다" 
                    : `${maxLen - answer.length}자 남았습니다`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      );
    }

    const questionIcon = getIcon(question.question);
    
    const isOBStudyOrTrack = formData.applicationType === "ob" && 
      (question.question.includes("스터디 개설") || question.question.includes("트랙"));
    
    const getOBRequirementStatus = () => {
      if (!isOBStudyOrTrack) return null;
      
      const studyIntentionQuestionId = findQuestionId(["스터디 개설"]);
      const trackInterestQuestionId = findQuestionId(["트랙"]);
      
      const studyIntentionValue = studyIntentionQuestionId ? getAnswer(studyIntentionQuestionId) : "";
      const trackInterestValue = trackInterestQuestionId ? getAnswer(trackInterestQuestionId) : "";
      
      const hasStudyIntention = studyIntentionValue === "yes";
      const hasTrackInterest = trackInterestValue && trackInterestValue !== "none" && trackInterestValue !== "";
      
      const isFulfilled = hasStudyIntention || hasTrackInterest;
      
      if (question.question.includes("스터디 개설")) {
        return {
          isFulfilled: hasStudyIntention || hasTrackInterest,
          message: hasStudyIntention 
            ? "스터디 개설을 선택하셨습니다" 
            : hasTrackInterest
            ? "심화 트랙을 선택하셔서 조건을 충족했습니다"
            : "스터디 개설 또는 심화 트랙 중 하나는 선택해주세요"
        };
      }
      
      if (question.question.includes("트랙")) {
        return {
          isFulfilled: hasStudyIntention || hasTrackInterest,
          message: hasTrackInterest
            ? "심화 트랙을 선택하셨습니다"
            : hasStudyIntention
            ? "스터디 개설을 선택하셔서 조건을 충족했습니다"
            : "스터디 개설 또는 심화 트랙 중 하나는 선택해주세요"
        };
      }
      
      return null;
    };
    
    const requirementStatus = getOBRequirementStatus();
    
    return (
      <Card key={question.id} className="relative border border-white/10 shadow-lg bg-black/70 backdrop-blur-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-primary/25 rounded-lg opacity-50"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="text-xl flex items-center gap-3">
            {questionIcon}
            {question.question}
            {question.required && (
              <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">
                {APPLICATION_FORM_CONFIG.commonTexts.required}
              </Badge>
            )}
            {((question.question.includes("바라는") || question.question.includes("9기에게") || question.question.includes("KHUDA에게")) && answer && answer.length > 0) && (
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-pink-500/10 text-pink-400 rounded-full border border-pink-500/20"
                style={{
                  animation: 'tossAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <span>💖</span>
                {APPLICATION_FORM_CONFIG.commonTexts.thankYouMessage}
              </span>
            )}
          </CardTitle>
          {question.question.includes("스터디 개설") && formData.applicationType === "ob" ? (
            <CardDescription>
              KHUDA는 강의 및 교재비를 일부 지원하고 있습니다. 많은 관심과 참여 부탁드립니다.
            </CardDescription>
          ) : question.question.includes("트랙") && formData.applicationType === "ob" ? (
            <CardDescription>
              심화 트랙 참여를 희망하시는 경우에만 선택해주세요.
            </CardDescription>
          ) : isStudyDisabled ? (
            <CardDescription className="text-muted-foreground">
              스터디 개설을 선택하지 않으셔서 이 항목은 비활성화되었습니다.
            </CardDescription>
          ) : question.question.includes("소모임") || question.question.includes("스터디") ? (
            <CardDescription>
              KHUDA는 스터디 및 소모임을 적극 권장하고 있으며, KHUDA 9기에서는 더욱 강조하여 활성화할 생각입니다. (산학협력 프로젝트, SQL 스터디, 공모전 스터디 등이 예정되어 있습니다)
            </CardDescription>
          ) : question.question.includes("기타 활동") || question.question.includes("활동") ? (
            <CardDescription>데이터 분석과 관련이 없더라도 괜찮습니다.</CardDescription>
          ) : question.question.includes("일정") ? (
            <CardDescription>
              타 동아리나, 학생회, 아르바이트, 대외활동 관련하여 서술해주세요.
            </CardDescription>
          ) : question.question.includes("자격증") || question.question.includes("수상") ? (
            <CardDescription>해당 사항이 없는 경우 작성하지 않으셔도 됩니다.</CardDescription>
          ) : null}
          
          {/* OB 스터디/트랙 필수 선택 안내 */}
          {isOBStudyOrTrack && requirementStatus && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-1 duration-300">
              <div className={`flex items-start gap-2.5 p-3 rounded-xl transition-all duration-200 ${
                requirementStatus.isFulfilled
                  ? "bg-blue-50/10 border border-blue-500/30"
                  : "bg-orange-50/10 border border-orange-500/30"
              }`}>
                <div className={`mt-0.5 flex-shrink-0 ${
                  requirementStatus.isFulfilled ? "text-blue-400" : "text-orange-400"
                }`}>
                  <Info className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium leading-relaxed ${
                    requirementStatus.isFulfilled ? "text-blue-100" : "text-orange-100"
                  }`}>
                    {requirementStatus.message}
                  </p>
                  {!requirementStatus.isFulfilled && (
                    <p className="text-xs text-orange-200/80 mt-1 leading-relaxed">
                      트랙 참여와 스터디 개설 중 최소한 하나는 선택해주셔야 지원서를 제출할 수 있습니다.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4 relative z-10">
          {question.question.includes("스터디 개설") && formData.applicationType === "ob" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateAnswer(question.id, answer === "yes" ? "" : "yes");
                  }}
                  className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ease-out ${
                    answer === "yes"
                      ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                      : "border-border/50 bg-secondary/20 hover:border-primary/40 hover:bg-secondary/30"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                    answer === "yes"
                      ? "bg-primary"
                      : "bg-secondary/40 border-2 border-border/50 group-hover:border-primary/40"
                  }`}>
                    {answer === "yes" ? (
                      <CheckCircle className="w-3.5 h-3.5 text-primary-foreground animate-in zoom-in-95 duration-200" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-muted-foreground/50 group-hover:border-primary/50 transition-colors" />
                    )}
                  </div>
                  <span className={`text-sm font-semibold transition-colors duration-200 ${
                    answer === "yes" ? "text-primary" : "text-foreground group-hover:text-primary/80"
                  }`}>
                    예
                  </span>
                  <span className={`text-xs mt-0.5 transition-colors duration-200 ${
                    answer === "yes" ? "text-primary/70" : "text-muted-foreground"
                  }`}>
                    스터디 개설 희망
                  </span>
                  {answer === "yes" && (
                    <div className="absolute top-1.5 right-1.5">
                      <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                        선택됨
                      </Badge>
                    </div>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateAnswer(question.id, answer === "no" ? "" : "no");
                  }}
                  className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ease-out ${
                    answer === "no"
                      ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                      : "border-border/50 bg-secondary/20 hover:border-primary/40 hover:bg-secondary/30"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                    answer === "no"
                      ? "bg-primary"
                      : "bg-secondary/40 border-2 border-border/50 group-hover:border-primary/40"
                  }`}>
                    {answer === "no" ? (
                      <CheckCircle className="w-3.5 h-3.5 text-primary-foreground animate-in zoom-in-95 duration-200" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-muted-foreground/50 group-hover:border-primary/50 transition-colors" />
                    )}
                  </div>
                  <span className={`text-sm font-semibold transition-colors duration-200 ${
                    answer === "no" ? "text-primary" : "text-foreground group-hover:text-primary/80"
                  }`}>
                    아니오
                  </span>
                  <span className={`text-xs mt-0.5 transition-colors duration-200 ${
                    answer === "no" ? "text-primary/70" : "text-muted-foreground"
                  }`}>
                    스터디 개설 없음
                  </span>
                  {answer === "no" && (
                    <div className="absolute top-1.5 right-1.5">
                      <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                        선택됨
                      </Badge>
                    </div>
                  )}
                </button>
              </div>
            </div>
          ) : question.question.includes("트랙") && formData.applicationType === "ob" ? (
            <div className="space-y-4">
              <Select
                value={answer || ""}
                onValueChange={(value) => updateAnswer(question.id, value)}
                required={question.required}
              >
                <SelectTrigger 
                  className={`h-14 rounded-2xl text-base font-medium transition-all duration-200 ease-out transform ${
                    answer && answer !== "none"
                      ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/60 shadow-md shadow-primary/10 scale-[1.01]"
                      : "bg-secondary/20 border-2 border-border/40 hover:border-primary/30 hover:bg-secondary/30 hover:scale-[1.01] active:scale-[0.99]"
                  } focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none focus:scale-[1.01]`}
                >
                  <div className="flex items-center gap-2.5 flex-1">
                    {answer && answer !== "none" && (
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 animate-in zoom-in-95 duration-200" />
                    )}
                    <SelectValue placeholder="트랙을 선택해주세요 (선택사항)" />
                  </div>
                </SelectTrigger>
                <SelectContent 
                  className="rounded-2xl border-2 border-border/50 bg-card/95 backdrop-blur-md shadow-xl max-h-[400px] p-2"
                  position="popper"
                >
                  {[
                    ...CURRICULUM_INFO.tracks.map(track => ({
                      value: track.id,
                      label: `${track.label} (${track.title})`,
                      description: track.description.split(".")[0] + ".",
                    })),
                    ...APPLICATION_FORM_CONFIG.trackSelectOptions,
                  ].map((track) => (
                    <SelectItem 
                      key={track.value}
                      value={track.value} 
                      className="rounded-xl px-4 py-3 pl-4 cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-all duration-150 ease-out data-[highlighted]:bg-primary/10 data-[highlighted]:scale-[1.02] group [&>span:has(svg)]:hidden"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-base font-medium">{track.label}</span>
                        {track.description && (
                          <span className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">
                            {track.description}
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : question.field_type === "text" && (
            <Input
              value={answer}
              onChange={(e) => {
                const value = e.target.value;
                if (question.max_len === null || value.length <= question.max_len) {
                  updateAnswer(question.id, value);
                }
              }}
              placeholder={question.question.includes("소모임") || question.question.includes("스터디") ? "ex) 자격증 스터디, 수학 스터디, 운동 소모임 등" : "답변을 입력해주세요"}
              required={question.required && !isStudyDisabled}
              disabled={isStudyDisabled}
              maxLength={question.max_len || undefined}
              className={`h-12 rounded-xl border-border/50 focus:outline-none transition-all duration-200 ease-out ${
                isStudyDisabled 
                  ? "bg-secondary/10 border-border/30 text-muted-foreground cursor-not-allowed opacity-50" 
                  : "bg-secondary/30 focus:border-primary/60 focus:scale-[1.01] focus:shadow-md focus:shadow-primary/10"
              }`}
            />
          )}
          
          {question.field_type === "textarea" && (
            <Textarea
              value={answer}
              onChange={(e) => {
                const value = e.target.value;
                if (question.max_len === null || value.length <= question.max_len) {
                  updateAnswer(question.id, value);
                }
              }}
              placeholder={question.question.includes("바라는") || question.question.includes("9기에게") || question.question.includes("KHUDA에게") ? "KHUDA에 대한 바람이나 제안사항을 작성해주세요..." : "답변을 작성해주세요..."}
              required={question.required && !isStudyDisabled}
              disabled={isStudyDisabled}
              maxLength={question.max_len || undefined}
              rows={question.question.includes("기타 활동") ? 5 : 5}
              className={`min-h-[120px] rounded-xl border-border/50 focus:outline-none resize-none transition-all duration-200 ease-out ${
                isStudyDisabled 
                  ? "bg-secondary/10 border-border/30 text-muted-foreground cursor-not-allowed opacity-50" 
                  : "bg-secondary/30 focus:border-primary/60 focus:scale-[1.005] focus:shadow-md focus:shadow-primary/10"
              }`}
            />
          )}

          {question.field_type === "checkbox_multi" && (
            <div className="space-y-2">
              {question.question.includes("데이터 분석") || question.question.includes("AI 분야") ? (
                ["머신러닝", "딥러닝", "자연어처리", "컴퓨터비전", "강화학습", "추천시스템"].map((option) => {
                  const currentArray: string[] = answer ? JSON.parse(answer) : [];
                  const isChecked = currentArray.includes(option);
                  return (
                    <div
                      key={option}
                      className={getCheckboxContainerClass(isChecked)}
                      onClick={() => handleCheckboxChange(question.id, option, !isChecked)}
                    >
                      <div className={getCheckboxIconClass(isChecked)}>
                        {isChecked && <Check className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                    );
                  })
              ) : (
                <p className="text-sm text-muted-foreground">체크박스 옵션을 설정해주세요</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-6 animate-fade-up">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-primary" />
                </div>
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-20"></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {APPLICATION_FORM_CONFIG.submissionSuccess.title}
              </h1>
              <div className="h-1 w-12 bg-primary/30 mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-4 pt-4">
              <p className="text-lg text-foreground leading-relaxed">
                {APPLICATION_FORM_CONFIG.submissionSuccess.subtitle}
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                {APPLICATION_FORM_CONFIG.submissionSuccess.description}
              </p>
            </div>
          </div>
          
          <div className="pt-4 animate-fade-up animation-delay-200">
            <Link to="/">
              <Button 
                variant="default" 
                size="lg"
                className="w-full h-14 text-base font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                {APPLICATION_FORM_CONFIG.submissionSuccess.backToHome}
              </Button>
            </Link>
          </div>
        </div>
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
              {APPLICATION_FORM_CONFIG.pageTitle.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < APPLICATION_FORM_CONFIG.pageTitle.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {APPLICATION_FORM_CONFIG.pageDescription}
            </p>
          </div>

          <Card className="relative border border-white/10 shadow-lg bg-black/70 backdrop-blur-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-primary/25 rounded-lg opacity-50"></div>
            <CardHeader className="pb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl">{APPLICATION_FORM_CONFIG.sections.schedule}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 p-5 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-200">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">서류 모집기간</p>
                  <p className="text-lg font-semibold leading-relaxed">{RECRUITMENT_SCHEDULE.application.full}</p>
                </div>
                <div className="space-y-2 p-5 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-200">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">서류 합격자 발표</p>
                  <p className="text-lg font-semibold leading-relaxed">{RECRUITMENT_SCHEDULE.announcement.full}</p>
                </div>
                <div className="space-y-2 p-5 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-200">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">면접</p>
                  <p className="text-lg font-semibold leading-relaxed">{RECRUITMENT_SCHEDULE.interview.full}</p>
                </div>
                <div className="space-y-2 p-5 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-200">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">최종 합격자 발표</p>
                  <p className="text-lg font-semibold leading-relaxed">{RECRUITMENT_SCHEDULE.final.full}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm font-semibold text-muted-foreground mb-4">모집대상</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="default" className="text-xs">YB</Badge>
                      <span className="text-sm font-semibold">{APPLICATION_FORM_CONFIG.applicationTypes.yb.label(RECRUITMENT_INFO.generation)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {APPLICATION_FORM_CONFIG.applicationTypes.yb.description}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="default" className="text-xs">OB</Badge>
                      <span className="text-sm font-semibold">{APPLICATION_FORM_CONFIG.applicationTypes.ob.label(RECRUITMENT_INFO.generation)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {APPLICATION_FORM_CONFIG.applicationTypes.ob.description}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative border border-white/10 shadow-lg bg-black/70 backdrop-blur-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-primary/25 rounded-lg opacity-50"></div>
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl">{APPLICATION_FORM_CONFIG.sections.faq}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-4 text-sm">
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Q. 학기 중 세션은 어디서 진행되나요?
                  </p>
                  <p className="text-muted-foreground">A. 국제캠퍼스에서 진행되며, 구체적 일정과 장소는 합격자 발표 시 안내드립니다.</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Q. 활동비가 있나요?
                  </p>
                  <p className="text-muted-foreground">A. YB 학회비 45,000원 / OB 학회비 5,000원으로 합격자 발표 시 안내드립니다.</p>
                </div>
              </div>
              <div className="pt-6 border-t border-border/50">
                <p className="text-sm font-semibold text-foreground mb-4 text-center">문의는 SNS 또는 운영진 연락처로 연락바랍니다!</p>
                <div className="space-y-2">
                  <a 
                    href={SOCIAL_LINKS.instagram} 
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
                    href={`mailto:${CONTACT_EMAIL}`} 
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
                      <p className="text-xs text-muted-foreground mt-0.5">{CONTACT_EMAIL}</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">운영진 연락처</p>
                      <p className="text-xs text-muted-foreground">회장 조윤수 {CONTACT_PHONE.회장} / 부회장 신진수 {CONTACT_PHONE.부회장}</p>
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
            <Card className="relative border border-white/10 shadow-lg bg-black/70 backdrop-blur-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-primary/25 rounded-lg opacity-50"></div>
              <CardHeader className="relative z-10">
                  <CardTitle className="text-xl flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  {APPLICATION_FORM_CONFIG.sections.privacy}
                  <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">
                    필수
                  </Badge>
                </CardTitle>
                <CardDescription>개인정보 수집 및 이용에 동의해주세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="bg-secondary/30 p-6 rounded-xl border border-border/50">
                  <h3 className="text-lg font-semibold mb-4 text-center">{APPLICATION_FORM_CONFIG.privacyConsent.title}</h3>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <div>
                      <p className="font-semibold mb-2">{APPLICATION_FORM_CONFIG.privacyConsent.section1.title}</p>
                      <p className="mb-2 text-muted-foreground">{APPLICATION_FORM_CONFIG.privacyConsent.section1.description}</p>
                      <p className="mb-2"><strong>{APPLICATION_FORM_CONFIG.privacyConsent.section1.purpose}</strong></p>
                      <p><strong>{APPLICATION_FORM_CONFIG.privacyConsent.section1.items}</strong></p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">{APPLICATION_FORM_CONFIG.privacyConsent.section2.title}</p>
                      <p className="text-muted-foreground">{APPLICATION_FORM_CONFIG.privacyConsent.section2.description}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">{APPLICATION_FORM_CONFIG.privacyConsent.section3.title}</p>
                      <p className="text-muted-foreground">{APPLICATION_FORM_CONFIG.privacyConsent.section3.description}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {(() => {
                    const privacyQuestion = questions.find(q => q.question.includes("개인정보") || q.question.includes("동의"));
                    if (!privacyQuestion) return null;
                    const privacyAnswer = formData.answers[privacyQuestion.id.toString()] || "";
                    return (
                      <>
                        <div 
                          className={getCheckboxContainerClass(privacyAnswer === "agree")}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateAnswer(privacyQuestion.id, privacyAnswer === "agree" ? "" : "agree");
                          }}
                        >
                          <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            privacyAnswer === "agree"
                              ? "border-primary bg-primary"
                              : "border-border"
                          }`}>
                            {privacyAnswer === "agree" && (
                              <Circle className="h-2.5 w-2.5 fill-current text-primary-foreground" />
                            )}
                          </div>
                          <div className="cursor-pointer font-medium flex-1 flex items-center gap-2">
                            <span className="transition-all duration-200">{APPLICATION_FORM_CONFIG.privacyConsent.agreeText}</span>
                            {privacyAnswer === "agree" && (
                              <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                                선택됨
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div 
                          className={getCheckboxContainerClass(privacyAnswer === "disagree")}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateAnswer(privacyQuestion.id, privacyAnswer === "disagree" ? "" : "disagree");
                          }}
                        >
                          <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            privacyAnswer === "disagree"
                              ? "border-primary bg-primary"
                              : "border-border"
                          }`}>
                            {privacyAnswer === "disagree" && (
                              <Circle className="h-2.5 w-2.5 fill-current text-primary-foreground" />
                            )}
                          </div>
                          <div className="cursor-pointer font-medium flex-1 flex items-center gap-2">
                            <span className="transition-all duration-200">{APPLICATION_FORM_CONFIG.privacyConsent.disagreeText}</span>
                            {privacyAnswer === "disagree" && (
                              <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 rounded-md animate-in fade-in zoom-in-95 duration-200">
                                선택됨
                              </Badge>
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>

            {commonQuestions.filter(q => !q.question.includes("개인정보") && !q.question.includes("동의")).length > 0 && (
              <Card className="relative border border-white/10 shadow-lg bg-black/70 backdrop-blur-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-primary/25 rounded-lg opacity-50"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <UserCircle className="w-5 h-5 text-primary" />
                    {APPLICATION_FORM_CONFIG.sections.basicInfo}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    지원에 필요한 기본 정보를 입력해주세요.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    {commonQuestions
                      .filter(q => {
                        if (q.question.includes("개인정보") || q.question.includes("동의")) return false;
                        return true;
                      })
                      .map(question => renderQuestion(question))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="relative border border-white/10 shadow-lg bg-black/70 backdrop-blur-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-primary/25 rounded-lg opacity-50"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-xl flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  {APPLICATION_FORM_CONFIG.sections.applicationType}
                  <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">{APPLICATION_FORM_CONFIG.commonTexts.required}</Badge>
                </CardTitle>
                <CardDescription>지원하실 분야를 선택해주세요.</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
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
                      <span className="transition-all duration-200">{APPLICATION_FORM_CONFIG.applicationTypes.yb.label(RECRUITMENT_INFO.generation)}</span>
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
                      <span className="transition-all duration-200">{APPLICATION_FORM_CONFIG.applicationTypes.ob.label(RECRUITMENT_INFO.generation)}</span>
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
            
            {/* yb/ob 질문은 선택 후에만 표시 */}
            {formData.applicationType && typeQuestions
              .filter(q => {
                if (formData.applicationType === "yb" && q.question.includes("면접")) return false;
                return true;
              })
              .map(question => renderQuestion(question))}

            {formData.applicationType === "yb" && (
              <div className="space-y-8">
                <Card className="relative border border-white/10 shadow-lg bg-black/70 backdrop-blur-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-primary/25 rounded-lg opacity-50"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      {APPLICATION_FORM_CONFIG.sections.interviewSchedule}
                      <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-md">{APPLICATION_FORM_CONFIG.commonTexts.required}</Badge>
                    </CardTitle>
                    <CardDescription>
                      면접 가능한 날짜와 시간을 모두 선택해주세요. 여러 날짜와 시간을 선택할 수 있습니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 relative z-10">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 bg-primary rounded-full" />
                        <h3 className="text-sm font-semibold text-foreground">면접 가능 날짜</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {RECRUITMENT_SCHEDULE.interview.dates.map((date) => (
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
                              setFormData((prev) => ({
                                ...prev,
                                interviewDates: isSelected
                                  ? prev.interviewDates.filter((d) => d !== date.value)
                                  : [...prev.interviewDates, date.value],
                                selectedInterviewDate: !isSelected ? date.value : prev.selectedInterviewDate,
                              }));
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
                                  const selectedDate = formData.selectedInterviewDate;
                                  const currentTimes = formData.interviewTimesByDate[selectedDate] || [];
                                  setFormData((prev) => ({
                                    ...prev,
                                    interviewTimesByDate: {
                                      ...prev.interviewTimesByDate,
                                      [selectedDate]: isSelected
                                        ? currentTimes.filter((t) => t !== time)
                                        : [...currentTimes, time],
                                    },
                                  }));
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


            <div className="sticky bottom-0 pb-8 pt-4 bg-background/80 backdrop-blur-md border-t border-border/50 -mx-6 md:-mx-12 px-6 md:px-12">
              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full rounded-xl h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                disabled={isSubmitting || questions.length === 0}
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
