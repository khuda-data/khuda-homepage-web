import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { getQuestions, submitApplication, type QuestionsResponse, type ApplicationResponse, type Question } from "@/lib/api";
import { filterOBQuestions } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, XCircle, Lock, Settings, Eye, EyeOff, Send, Copy, FileText } from "lucide-react";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 
  (() => {
    const year = new Date().getFullYear();
    return `khuda-admin-${year}`;
  })();
const ADMIN_STORAGE_KEY = "khuda_admin_authenticated";

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [applicantType, setApplicantType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<QuestionsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitApplicantType, setSubmitApplicantType] = useState<string>("");
  const [answersJson, setAnswersJson] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitResponse, setSubmitResponse] = useState<ApplicationResponse | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitQuestions, setSubmitQuestions] = useState<Question[]>([]);
  const [loadingSubmitQuestions, setLoadingSubmitQuestions] = useState(false);

  useEffect(() => {
    const authenticated = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "true";
    setIsAuthenticated(authenticated);
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
      toast({
        title: "인증 성공",
        description: "관리자 페이지에 접근할 수 있습니다.",
        variant: "default",
      });
      setPassword("");
    } else {
      toast({
        title: "인증 실패",
        description: "비밀번호가 올바르지 않습니다.",
        variant: "destructive",
      });
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    setResponse(null);
    setError(null);
    setSubmitResponse(null);
    setSubmitError(null);
    toast({
      title: "로그아웃",
      description: "관리자 페이지에서 로그아웃했습니다.",
      variant: "default",
    });
  };

  useEffect(() => {
    const fetchSubmitQuestions = async () => {
      if (!submitApplicantType) {
        setSubmitQuestions([]);
        setAnswersJson("");
        return;
      }

      setLoadingSubmitQuestions(true);
      setAnswersJson("");
      try {
        const data = await getQuestions(submitApplicantType as "yb" | "ob" | "common");
        let sortedQuestions = data.questions.sort((a, b) => a.position - b.position);
        
        if (submitApplicantType === "ob") {
          sortedQuestions = filterOBQuestions(sortedQuestions);
        }
        
        setSubmitQuestions(sortedQuestions);
      } catch (err) {
        setSubmitQuestions([]);
        toast({
          title: "질문 목록 로드 실패",
          description: err instanceof Error ? err.message : "질문 목록을 가져오는데 실패했습니다.",
          variant: "destructive",
        });
      } finally {
        setLoadingSubmitQuestions(false);
      }
    };

    fetchSubmitQuestions();
  }, [submitApplicantType, toast]);

  const validateAnswers = (answers: Record<string, string>, questions: Question[], applicantType: string): string | null => {
    const questionMap = new Map(questions.map(q => [q.id.toString(), q]));
    
    if (applicantType === "yb") {
      const interviewDatesQuestion = questions.find(q => 
        q.question.includes("면접") && (q.question.includes("날짜") || q.question.includes("일정"))
      );
      const interviewTimesQuestion = questions.find(q => 
        q.question.includes("면접") && q.question.includes("시간")
      );
      
      if (interviewDatesQuestion) {
        const datesAnswer = answers[interviewDatesQuestion.id.toString()];
        if (!datesAnswer || datesAnswer === "[]" || datesAnswer === "{}") {
          return `필수 질문 #${interviewDatesQuestion.id} "${interviewDatesQuestion.question}"에 대한 답변이 없습니다.`;
        }
      }
      
      if (interviewTimesQuestion) {
        const timesAnswer = answers[interviewTimesQuestion.id.toString()];
        if (!timesAnswer || timesAnswer === "[]" || timesAnswer === "{}") {
          return `필수 질문 #${interviewTimesQuestion.id} "${interviewTimesQuestion.question}"에 대한 답변이 없습니다.`;
        }
      }
    }
    
    for (const question of questions) {
      if (question.required) {
        if (applicantType === "yb" && 
            ((question.question.includes("면접") && (question.question.includes("날짜") || question.question.includes("일정"))) ||
             (question.question.includes("면접") && question.question.includes("시간")))) {
          continue;
        }
        
        const answer = answers[question.id.toString()];
        if (!answer || answer.trim() === "" || answer === "[]" || answer === "{}") {
          return `필수 질문 #${question.id} "${question.question}"에 대한 답변이 없습니다.`;
        }
      }
    }

    for (const [questionId, answer] of Object.entries(answers)) {
      const question = questionMap.get(questionId);
      if (question && question.max_len !== null && answer.length > question.max_len) {
        return `질문 #${question.id} "${question.question}"의 답변이 최대 길이(${question.max_len}자)를 초과했습니다. (현재: ${answer.length}자)`;
      }
    }

    return null;
  };

  const handleSubmitTest = async () => {
    if (!submitApplicantType) {
      toast({
        title: "선택 필요",
        description: "지원자 유형을 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (!answersJson.trim()) {
      toast({
        title: "입력 필요",
        description: "답변 JSON을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    let answers: Record<string, string>;
    try {
      answers = JSON.parse(answersJson);
    } catch (err) {
      toast({
        title: "JSON 오류",
        description: "올바른 JSON 형식이 아닙니다.",
        variant: "destructive",
      });
      return;
    }

    if (submitQuestions.length > 0) {
      const validationError = validateAnswers(answers, submitQuestions, submitApplicantType);
      if (validationError) {
        toast({
          title: "검증 실패",
          description: validationError,
          variant: "destructive",
        });
        setSubmitError(validationError);
        return;
      }
    }

    setSubmitLoading(true);
    setSubmitError(null);
    setSubmitResponse(null);

    try {
      const data = await submitApplication(submitApplicantType as "yb" | "ob" | "common", answers);
      setSubmitResponse(data);
      toast({
        title: "성공",
        description: `지원서가 성공적으로 제출되었습니다. (ID: ${data.application_id})`,
        variant: "default",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      setSubmitError(errorMessage);
      toast({
        title: "실패",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleTest = async () => {
    if (!applicantType) {
      toast({
        title: "선택 필요",
        description: "지원자 유형을 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const data = await getQuestions(applicantType as "yb" | "ob" | "common");
      setResponse(data);
      toast({
        title: "성공",
        description: `${data.questions.length}개의 질문을 가져왔습니다.`,
        variant: "default",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      setError(errorMessage);
      toast({
        title: "실패",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>관리자 페이지</CardTitle>
            <CardDescription>
              이 페이지는 관리자만 접근할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                  placeholder="비밀번호를 입력하세요"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <Button onClick={handleLogin} className="w-full" disabled={!password}>
              로그인
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">관리자 페이지</h1>
          <p className="text-muted-foreground mt-1">
            질문 목록 테스트 및 향후 설정 관리 페이지
          </p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          로그아웃
        </Button>
      </div>

      <Tabs defaultValue="test" className="space-y-4">
        <TabsList>
          <TabsTrigger value="test">
            <Settings className="mr-2 h-4 w-4" />
            API 테스트
          </TabsTrigger>
          <TabsTrigger value="settings" disabled>
            설정 관리 (준비 중)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>질문 목록 API 테스트</CardTitle>
              <CardDescription>
                API에서 질문 목록을 가져와서 테스트할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">지원자 유형</label>
                  <Select value={applicantType} onValueChange={setApplicantType}>
                    <SelectTrigger>
                      <SelectValue placeholder="지원자 유형을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yb">YB (Young Blood)</SelectItem>
                      <SelectItem value="ob">OB (Old Blood)</SelectItem>
                      <SelectItem value="common">Common</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleTest} disabled={loading || !applicantType}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      로딩 중...
                    </>
                  ) : (
                    "API 호출 테스트"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  오류 발생
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                  {error}
                </pre>
              </CardContent>
            </Card>
          )}

          {response && (
            <>
              <Card className="border-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    응답 성공
                  </CardTitle>
                  <CardDescription>
                    지원자 유형: <Badge variant="outline">{response.applicant_type}</Badge> | 
                    질문 개수: <Badge variant="outline">{response.questions.length}개</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">전체 응답 JSON:</h3>
                      <pre className="bg-muted p-4 rounded-md overflow-auto text-xs max-h-96">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>질문 목록 상세</CardTitle>
                  <CardDescription>
                    position 순서대로 정렬된 질문 목록입니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {response.questions.map((question) => (
                        <Card key={question.id} className="border-l-4 border-l-primary">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="secondary">#{question.id}</Badge>
                                  <Badge variant="outline">Position: {question.position}</Badge>
                                  <Badge variant={question.required ? "destructive" : "secondary"}>
                                    {question.required ? "필수" : "선택"}
                                  </Badge>
                                  <Badge variant="outline">{question.field_type}</Badge>
                                  <Badge variant="outline">{question.applicant_type}</Badge>
                                </div>
                                <h4 className="font-semibold text-lg mb-2">{question.question}</h4>
                                <div className="text-sm text-muted-foreground space-y-1">
                                  <div>
                                    최대 길이: {question.max_len === null ? "제한 없음" : `${question.max_len}자`}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>지원서 제출 API 테스트</CardTitle>
              <CardDescription>
                POST /api/applications 엔드포인트를 테스트할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="submit-applicant-type">지원자 유형</Label>
                    {loadingSubmitQuestions && (
                      <Badge variant="secondary" className="text-xs">
                        <Loader2 className="mr-1 h-3 w-3 animate-spin inline" />
                        질문 목록 로딩 중...
                      </Badge>
                    )}
                    {submitQuestions.length > 0 && !loadingSubmitQuestions && (
                      <Badge variant="outline" className="text-xs">
                        {submitQuestions.length}개 질문 로드됨
                      </Badge>
                    )}
                  </div>
                  <Select value={submitApplicantType} onValueChange={setSubmitApplicantType}>
                    <SelectTrigger id="submit-applicant-type" className="mt-2">
                      <SelectValue placeholder="지원자 유형을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yb">YB (Young Blood)</SelectItem>
                      <SelectItem value="ob">OB (Old Blood)</SelectItem>
                      <SelectItem value="common">Common</SelectItem>
                    </SelectContent>
                  </Select>
                  {submitQuestions.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      필수 질문: {submitQuestions.filter(q => q.required).length}개 | 
                      선택 질문: {submitQuestions.filter(q => !q.required).length}개
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="answers-json">답변 JSON</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (submitQuestions.length === 0) {
                            toast({
                              title: "질문 목록 없음",
                              description: "먼저 질문 목록을 가져와주세요.",
                              variant: "destructive",
                            });
                            return;
                          }

                          const exampleAnswers: Record<string, string> = {};
                          
                          const generateTextExample = (question: Question): string => {
                            const q = question.question.toLowerCase();
                            if (q.includes("개인정보") || q.includes("동의")) return "agree";
                            if (q.includes("이름")) return "홍길동";
                            if (q.includes("학번")) return "202012345";
                            if (q.includes("학년") || q.includes("학기")) return "3학년 2학기";
                            if (q.includes("주전공") || q.includes("전공")) return "컴퓨터공학과";
                            if (q.includes("다전공") || q.includes("부전공")) return "경영학과";
                            if (q.includes("이메일")) return "hong@example.com";
                            if (q.includes("휴대폰") || q.includes("번호")) return "010-1234-5678";
                            if (q.includes("거주지역") || q.includes("거주")) return "서울";
                            if (q.includes("파이썬") || q.includes("익숙")) return "중급";
                            if (q.includes("소모임") || (q.includes("스터디") && !q.includes("세부") && !q.includes("개설"))) return "데이터 분석 스터디";
                            if (q.includes("스터디") && q.includes("개설")) return "yes"; // 스터디 개설 여부는 yes/no
                            if (q.includes("트랙")) return "da"; // 트랙은 값으로 (nlp, cv, de, da, aie, fin, none)
                            return "예시 답변";
                          };

                          const generateTextareaExample = (question: Question): string => {
                            const maxLen = question.max_len || 500;
                            const q = question.question.toLowerCase();
                            
                            let baseText = "";
                            if (q.includes("동기") || q.includes("역량")) {
                              baseText = "데이터 분석과 AI 분야에 깊은 관심을 가지고 있어 KHUDA에 지원하게 되었습니다. 학부 과정에서 통계학과 머신러닝 관련 과목을 수강하며 이론적 기반을 다졌고, 캡스톤 디자인 프로젝트를 통해 실제 데이터를 활용한 분석 경험을 쌓았습니다. 특히 파이썬을 활용한 데이터 전처리와 시각화에 능숙하며, 팀 프로젝트에서 리더 역할을 수행한 경험이 있습니다.";
                            } else if (q.includes("도전") || q.includes("끈기")) {
                              baseText = "대학 입학 후 처음 접한 프로그래밍 과목에서 어려움을 겪었지만, 매일 2시간씩 코딩 연습을 하며 성적을 향상시켰습니다. 온라인 강의와 교재를 병행하며 자가 학습 능력을 기르고, 동아리 프로젝트에서 어려운 기술 스택을 직접 학습하여 적용한 경험이 있습니다. 이러한 끈기와 도전 정신으로 여러 프로젝트를 성공적으로 완료할 수 있었습니다.";
                            } else if (q.includes("프로젝트") || q.includes("탐구")) {
                              baseText = "2학년 때 진행한 캡스톤 디자인 프로젝트에서 서울시 대기질 데이터를 분석하여 미세먼지 농도 예측 모델을 개발했습니다. 데이터 수집부터 전처리, 모델링, 평가까지 전 과정을 담당했으며, XGBoost와 Random Forest 알고리즘을 비교 분석하여 최적의 모델을 선택했습니다. 이 프로젝트를 통해 실제 데이터 분석 프로세스를 경험하고, 팀원들과 협업하는 방법을 배웠습니다.";
                            } else if (q.includes("기타 활동") || (q.includes("활동") && q.includes("기타"))) {
                              baseText = "학부 연구생으로 6개월간 데이터 마이닝 연구에 참여했습니다. 또한 데이터 분석 동아리에서 정기적으로 프로젝트를 진행하며 실무 경험을 쌓았습니다. 해커톤 대회에 참가하여 팀 프로젝트로 우수상을 수상한 경험이 있습니다.";
                            } else if (q.includes("활동 일정") || q.includes("일정") || (q.includes("스케줄") && q.includes("학기"))) {
                              baseText = "2026년 1학기에는 매주 화요일과 목요일 오후에 KHUDA 활동에 참여할 예정입니다. 정기 세미나와 프로젝트 활동에 적극적으로 참여하겠습니다. 학기 중에는 주 2회, 방학 중에는 주 3회 참여 가능합니다.";
                            } else if (q.includes("자격증") || q.includes("수상") || q.includes("수상이력")) {
                              baseText = "정보처리기사, SQLD 자격증 보유. 2024년 캡스톤 디자인 경진대회 우수상 수상. 2023년 데이터 분석 경진대회 장려상 수상.";
                            } else if (q.includes("9기") || q.includes("바라는") || (q.includes("기대") && q.includes("9기"))) {
                              baseText = "KHUDA 9기에서 데이터 분석 전문성을 더욱 발전시키고, 다양한 프로젝트를 통해 실무 역량을 키우고 싶습니다. 또한 선배들과의 네트워킹을 통해 진로에 대한 인사이트를 얻고, 함께 성장하는 동료들과 협업하는 경험을 쌓고 싶습니다.";
                            } else if (q.includes("스터디") && q.includes("세부")) {
                              baseText = "파이썬을 활용한 데이터 분석 스터디를 개설하고 싶습니다. 주 1회 모임을 통해 실습 위주의 학습을 진행하고, 프로젝트를 통해 실전 경험을 쌓는 것을 목표로 합니다.";
                            } else if (q.includes("활동")) {
                              baseText = "학부 연구생으로 6개월간 데이터 마이닝 연구에 참여했습니다. 또한 데이터 분석 동아리에서 정기적으로 프로젝트를 진행하며 실무 경험을 쌓았습니다.";
                            } else {
                              baseText = "관련 경험과 역량을 바탕으로 KHUDA 활동에 적극적으로 참여하겠습니다.";
                            }
                            
                            return baseText.substring(0, Math.min(baseText.length, maxLen));
                          };

                          for (const question of submitQuestions) {
                            const id = question.id.toString();
                            
                            if (submitApplicantType === "yb" && question.question.includes("면접")) {
                              if (question.question.includes("날짜") || question.question.includes("일정")) {
                                exampleAnswers[id] = JSON.stringify(["1월 9일 (금)", "1월 10일 (토)"]);
                              } else if (question.question.includes("시간")) {
                                exampleAnswers[id] = JSON.stringify({
                                  "1월 9일 (금)": ["10:20", "10:40", "14:00"],
                                  "1월 10일 (토)": ["11:00", "15:20"]
                                });
                              }
                            } else if (question.field_type === "checkbox_multi") {
                              if (question.required) {
                                exampleAnswers[id] = JSON.stringify(["머신러닝", "딥러닝"]);
                              } else {
                                exampleAnswers[id] = JSON.stringify([]);
                              }
                            } else if (question.field_type === "textarea") {
                              const exampleText = generateTextareaExample(question);
                              exampleAnswers[id] = exampleText || "";
                            } else {
                              const exampleText = generateTextExample(question);
                              exampleAnswers[id] = exampleText || "";
                            }
                          }
                          
                          const exampleJson = JSON.stringify(exampleAnswers, null, 2);
                          setAnswersJson(exampleJson);
                          toast({
                            title: "예시 로드됨",
                            description: `필수 질문 ${submitQuestions.filter(q => q.required).length}개 포함, 검증 통과 예시가 생성되었습니다.`,
                            variant: "default",
                          });
                        }}
                        disabled={!submitApplicantType || loadingSubmitQuestions || submitQuestions.length === 0}
                        className="h-8"
                      >
                        <FileText className="mr-2 h-3 w-3" />
                        {loadingSubmitQuestions ? "로딩 중..." : "예시 불러오기"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(answersJson);
                            toast({
                              title: "복사됨",
                              description: "답변 JSON이 클립보드에 복사되었습니다.",
                              variant: "default",
                            });
                          } catch {
                            toast({
                              title: "복사 실패",
                              description: "클립보드 복사에 실패했습니다.",
                              variant: "destructive",
                            });
                          }
                        }}
                        disabled={!answersJson.trim()}
                        className="h-8"
                      >
                        <Copy className="mr-2 h-3 w-3" />
                        복사
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    id="answers-json"
                    value={answersJson}
                    onChange={(e) => setAnswersJson(e.target.value)}
                    placeholder={`{\n  "1": "동의합니다",\n  "2": "홍길동",\n  "3": "202012345"\n}`}
                    className="font-mono text-sm min-h-[200px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    질문 ID를 키로 하고 답변을 값으로 하는 JSON 형식입니다. 지원자 유형을 선택한 후 "예시 불러오기" 버튼을 클릭하면 예시를 자동으로 불러올 수 있습니다.
                  </p>
                </div>
                <Button 
                  onClick={handleSubmitTest} 
                  disabled={submitLoading || !submitApplicantType || !answersJson.trim()}
                  className="w-full"
                >
                  {submitLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      제출 중...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      지원서 제출 테스트
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {submitError && (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  제출 오류 발생
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                  {submitError}
                </pre>
              </CardContent>
            </Card>
          )}

          {submitResponse && (
            <Card className="border-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  제출 성공
                </CardTitle>
                <CardDescription>
                  지원서 ID: <Badge variant="outline">{submitResponse.application_id}</Badge> | 
                  상태: <Badge variant="outline">{submitResponse.status}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">응답 JSON:</h3>
                    <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">
                      {JSON.stringify(submitResponse, null, 2)}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>설정 관리</CardTitle>
              <CardDescription>
                다음 기수에서 질문 및 옵션을 관리할 수 있는 기능이 추가될 예정입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                향후 구현 예정 기능:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                <li>질문 추가/수정/삭제</li>
                <li>질문 순서 변경 (position 관리)</li>
                <li>필수/선택 옵션 변경</li>
                <li>최대 길이 제한 설정</li>
                <li>필드 타입 변경</li>
                <li>지원자 유형별 질문 관리</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;

