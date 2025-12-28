import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const tracks = [
  { 
    id: "nlp", 
    name: "NLP", 
    fullName: "자연어처리",
    label: "NLP",
    title: "자연어처리",
    description: "텍스트 데이터를 이해하고 처리하는 기술을 학습합니다. 토큰화, 임베딩, 언어 모델 등 자연어처리의 핵심 개념부터 BERT, GPT 같은 최신 모델까지 다룹니다.",
    topics: [
      { title: "텍스트 전처리", color: "bg-amber-400 text-gray-900 hover:bg-amber-500" },
      { title: "언어 모델", color: "bg-blue-500 text-white hover:bg-blue-600" },
      { title: "Fine-tuning", color: "bg-violet-500 text-white hover:bg-violet-600" },
    ],
  },
  { 
    id: "cv", 
    name: "CV", 
    fullName: "컴퓨터비전",
    label: "CV",
    title: "컴퓨터비전",
    description: "이미지와 비디오 데이터를 분석하고 이해하는 기술을 학습합니다. CNN 아키텍처부터 객체 탐지, 이미지 분할, 생성 모델까지 컴퓨터비전의 전반적인 내용을 다룹니다.",
    topics: [
      { title: "이미지 처리", color: "bg-amber-400 text-gray-900 hover:bg-amber-500" },
      { title: "객체 탐지", color: "bg-blue-500 text-white hover:bg-blue-600" },
      { title: "생성 모델", color: "bg-violet-500 text-white hover:bg-violet-600" },
    ],
  },
  { 
    id: "de", 
    name: "DE", 
    fullName: "데이터엔지니어링",
    label: "DE",
    title: "데이터엔지니어링",
    description: "대규모 데이터를 효율적으로 수집, 저장, 처리하는 인프라를 구축하는 기술을 학습합니다. ETL 파이프라인, 분산 처리 시스템, 클라우드 서비스를 활용한 데이터 플랫폼 구축을 다룹니다.",
    topics: [
      { title: "데이터 파이프라인", color: "bg-amber-400 text-gray-900 hover:bg-amber-500" },
      { title: "분산 처리", color: "bg-blue-500 text-white hover:bg-blue-600" },
      { title: "클라우드 인프라", color: "bg-violet-500 text-white hover:bg-violet-600" },
    ],
  },
  { 
    id: "da", 
    name: "DA", 
    fullName: "데이터분석",
    label: "DA",
    title: "데이터분석",
    description: "데이터에서 인사이트를 도출하고 비즈니스 문제를 해결하는 방법을 학습합니다. 탐색적 데이터 분석, 통계적 분석, 시각화, 머신러닝 기반 예측 모델링까지 데이터 분석의 전 과정을 다룹니다.",
    topics: [
      { title: "EDA", color: "bg-amber-400 text-gray-900 hover:bg-amber-500" },
      { title: "시각화", color: "bg-blue-500 text-white hover:bg-blue-600" },
      { title: "예측 모델링", color: "bg-violet-500 text-white hover:bg-violet-600" },
    ],
  },
  { 
    id: "aie", 
    name: "AIE", 
    fullName: "AI엔지니어링",
    label: "AIE",
    title: "AI엔지니어링",
    description: "머신러닝 모델을 실제 서비스로 배포하고 운영하는 기술을 학습합니다. MLOps 파이프라인 구축, 모델 서빙, 모니터링, A/B 테스트 등 프로덕션 환경에서의 AI 시스템 운영을 다룹니다.",
    topics: [
      { title: "MLOps", color: "bg-amber-400 text-gray-900 hover:bg-amber-500" },
      { title: "모델 서빙", color: "bg-blue-500 text-white hover:bg-blue-600" },
      { title: "모니터링", color: "bg-violet-500 text-white hover:bg-violet-600" },
    ],
  },
  { 
    id: "fin", 
    name: "FIN", 
    fullName: "금융",
    label: "FIN",
    title: "금융",
    description: "금융 데이터 분석과 시장 인사이트 도출을 학습합니다. 금융 데이터 전처리, 시계열 분석, 리스크 분석, 포트폴리오 분석 등 금융 분야의 데이터 분석 기법을 다룹니다.",
    topics: [
      { title: "금융 데이터 분석", color: "bg-amber-400 text-gray-900 hover:bg-amber-500" },
      { title: "시계열 분석", color: "bg-blue-500 text-white hover:bg-blue-600" },
      { title: "리스크 분석", color: "bg-violet-500 text-white hover:bg-violet-600" },
    ],
  },
];

const CurriculumSection = () => {
  const [sessionType, setSessionType] = useState<"basic" | "advanced">("basic");
  const [activeTrack, setActiveTrack] = useState("nlp");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentTrack = tracks.find(track => track.id === activeTrack) || tracks[0];

  const handleTrackChange = (newTrackId: string) => {
    if (newTrackId === activeTrack || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTrack(newTrackId);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      id="curriculum" 
      ref={ref}
      className={cn(
        "py-12 md:py-20 px-6 md:px-12 relative bg-background transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      
      <div className="container mx-auto relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-foreground">
            {sessionType === "basic" ? "방학세션으로 시작해요" : "6가지 심화트랙 중에서 선택할 수 있어요"}
          </h2>
          <p className="text-sm md:text-lg text-foreground max-w-3xl mb-6 md:mb-8">
            {sessionType === "basic" ? (
              <>
                방학 동안 파이썬 실습과 머신러닝 기초를 함께 배워요.
                <br />
                개인 랜덤 발제, 퀴즈, 팀별 토의를 통해 기초를 탄탄히 다지고, 방학세션 팀 단위로 토이프로젝트를 진행합니다.
              </>
            ) : (
              <>
                각 심화트랙의 트랙장들과 함께 한 학기 동안 선택한 분야를 깊이 있게 탐구해요.
                <br />
                자연어처리, 컴퓨터비전, 데이터분석 등 6가지 트랙에서 전문 지식을 쌓고 실전 프로젝트까지 완성합니다.
              </>
            )}
          </p>
        </div>

        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setSessionType("basic")}
            className={cn(
              "px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300",
              sessionType === "basic"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95"
            )}
          >
            기초 세션
          </button>
          <button
            onClick={() => setSessionType("advanced")}
            className={cn(
              "px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300",
              sessionType === "advanced"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95"
            )}
          >
            심화 세션
          </button>
        </div>

        {sessionType === "basic" ? (
          <div className="relative rounded-3xl bg-black/98 backdrop-blur-2xl border border-white/10 p-8 md:p-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-blue-950/25 to-primary/15 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/12 via-transparent to-transparent rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="mb-10">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                  기초 트랙
                </h3>
                <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-3xl">
                  방학 기간 동안 파이썬 프로그래밍과 머신러닝 기초를 체계적으로 학습합니다. 
                  프로그래밍 기초부터 머신러닝 알고리즘까지, 단계별로 실력을 쌓아갑니다.
                </p>
              </div>

              <div className="mb-8">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-white">학습 목표</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["파이썬 프로그래밍 기초", "머신러닝 알고리즘 이해", "실습을 통한 실전 경험", "프로젝트 기획 및 구현"].map((goal) => (
                    <span key={goal} className="px-3 py-1.5 rounded-lg bg-white/10 text-white/90 text-sm border border-white/20">
                      {goal}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white">주차별 세션 구성</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-200 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <h5 className="text-base font-semibold text-white">파이썬 프로그래밍</h5>
                      <span className="text-xs text-white/60 ml-auto">약 1시간</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed mb-3">
                      파이썬 기초 문법부터 객체지향 프로그래밍까지, 실습 중심으로 프로그래밍 역량을 기릅니다.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["변수/연산자", "자료구조", "제어문", "함수", "클래스/객체지향"].map((topic) => (
                        <span key={topic} className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/70 border border-white/10">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-200 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <h5 className="text-base font-semibold text-white">머신러닝 기초</h5>
                      <span className="text-xs text-white/60 ml-auto">약 1시간 20분</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed mb-3">
                      머신러닝의 기본 개념부터 주요 알고리즘까지, 이론과 실습을 통해 체계적으로 학습합니다.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["지도학습", "비지도학습", "회귀/분류", "평가 지표", "실습 프로젝트"].map((topic) => (
                        <span key={topic} className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/70 border border-white/10">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white">세부 활동</h4>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <h5 className="text-sm font-semibold text-white mb-2">개인 랜덤 발제</h5>
                    <p className="text-xs text-white/70 leading-relaxed">
                      매주 랜덤으로 선정된 주제에 대해 발제하며, 발표 능력과 이해도를 향상시킵니다.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <h5 className="text-sm font-semibold text-white mb-2">퀴즈 및 해설</h5>
                    <p className="text-xs text-white/70 leading-relaxed">
                      학습한 내용을 퀴즈로 점검하고, 해설을 통해 복습하며 이해도를 높입니다.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <h5 className="text-sm font-semibold text-white mb-2">팀별 토의</h5>
                    <p className="text-xs text-white/70 leading-relaxed">
                      팀 단위로 주제를 토의하며 다양한 관점을 공유하고 협업 능력을 기릅니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors duration-200 border border-white/10">
                  <h4 className="text-base font-semibold text-white mb-3">토이프로젝트</h4>
                  <p className="text-sm text-white/80 leading-relaxed mb-4">
                    방학세션 기간 동안 팀 단위로 진행하는 실전 프로젝트입니다. 
                    학습한 파이썬 프로그래밍과 머신러닝 기초 지식을 활용하여 프로젝트를 기획하고 구현합니다.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["팀 프로젝트", "파이썬 활용", "머신러닝 모델", "발표"].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/70 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors duration-200 border border-white/10">
                  <h4 className="text-base font-semibold text-white mb-3">트랙 설명회</h4>
                  <p className="text-sm text-white/80 leading-relaxed mb-4">
                    4-5주차에 각 심화트랙(NLP, CV, DE, DA, AIE, FIN)의 트랙장들이 
                    직접 설명회를 진행합니다. 본격적인 트랙 선택을 위한 정보를 얻을 수 있습니다.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["6개 트랙", "트랙장 소개", "커리큘럼 안내", "Q&A"].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/70 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-8">
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleTrackChange(track.id)}
                  className={cn(
                    "px-4 md:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300",
                    activeTrack === track.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95 border border-border/50"
                  )}
                >
                  {track.fullName}
                </button>
              ))}
            </div>

            <div className="relative flex items-center gap-4">
              <button
                onClick={() => {
                  const currentIndex = tracks.findIndex(t => t.id === activeTrack);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
                  handleTrackChange(tracks[prevIndex].id);
                }}
                className="hidden md:flex w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex-shrink-0 items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/10 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <div className="relative flex-1 rounded-3xl bg-black/98 backdrop-blur-2xl border border-white/10 p-8 md:p-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-blue-950/25 to-primary/15 rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-primary/12 via-transparent to-transparent rounded-3xl"></div>

                <div className="relative z-10">
                  <div className={cn(
                    "flex flex-col md:flex-row gap-8 md:gap-10 transition-all duration-300",
                    isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
                  )}>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-3">
                          {currentTrack.label}
                        </span>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                          {currentTrack.title}
                        </h3>
                      </div>
                      <p className="text-white/90 text-base md:text-lg leading-relaxed">
                        {currentTrack.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 justify-center">
                      {currentTrack.topics.map((topic, index) => (
                        <div
                          key={`${currentTrack.id}-${index}`}
                          className={cn(
                            "px-5 py-3 rounded-xl text-left font-semibold text-sm transition-all duration-200 hover:scale-[1.02] border",
                            topic.color,
                            "border-white/20"
                          )}
                        >
                          {topic.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                  <button
                    onClick={() => {
                      const currentIndex = tracks.findIndex(t => t.id === activeTrack);
                      const prevIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
                      handleTrackChange(tracks[prevIndex].id);
                    }}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/10"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = tracks.findIndex(t => t.id === activeTrack);
                      const nextIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
                      handleTrackChange(tracks[nextIndex].id);
                    }}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/10"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  const currentIndex = tracks.findIndex(t => t.id === activeTrack);
                  const nextIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
                  handleTrackChange(tracks[nextIndex].id);
                }}
                className="hidden md:flex w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex-shrink-0 items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/10 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CurriculumSection;
