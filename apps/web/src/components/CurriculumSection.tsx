import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    description: "금융 데이터를 활용한 AI 모델 개발과 퀀트 전략을 학습합니다. 시계열 분석, 알고리즘 트레이딩, 리스크 모델링, 포트폴리오 최적화 등 금융 분야의 AI 응용을 다룹니다.",
    topics: [
      { title: "시계열 분석", color: "bg-amber-400 text-gray-900 hover:bg-amber-500" },
      { title: "퀀트 전략", color: "bg-blue-500 text-white hover:bg-blue-600" },
      { title: "리스크 모델링", color: "bg-violet-500 text-white hover:bg-violet-600" },
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

  return (
    <section id="curriculum" className="py-16 md:py-20 px-6 md:px-12 relative bg-background">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      
      <div className="container mx-auto relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            {sessionType === "basic" ? "방학세션으로 시작해요" : "6가지 심화트랙 중에서 선택할 수 있어요"}
          </h2>
          <p className="text-base md:text-lg text-foreground max-w-3xl mb-8">
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
              "px-6 py-3 rounded-lg text-base font-semibold transition-all duration-200",
              sessionType === "basic"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            기초 세션
          </button>
          <button
            onClick={() => setSessionType("advanced")}
            className={cn(
              "px-6 py-3 rounded-lg text-base font-semibold transition-all duration-200",
              sessionType === "advanced"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            심화 세션
          </button>
        </div>

        {sessionType === "basic" ? (
          <div className="rounded-3xl bg-black/95 backdrop-blur-xl p-6 md:p-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/30 to-black rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-red-950/20 via-transparent to-transparent rounded-3xl"></div>
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                기초 트랙
              </h3>

              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-semibold text-foreground mb-4">세션 구성</h4>
                <ul className="space-y-3">
                  <li className="text-foreground/80">파이썬 실습 (약 1시간)</li>
                  <li className="text-foreground/80">머신러닝 기초 세션 (약 1시간 20분)</li>
                  <li className="text-foreground/80">개인 랜덤 발제</li>
                  <li className="text-foreground/80">퀴즈 및 해설</li>
                  <li className="text-foreground/80">팀별 토의</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-semibold text-foreground mb-2">토이프로젝트</h4>
                <p className="text-foreground/70 leading-relaxed">
                  방학세션 팀 단위로 진행하는 프로젝트입니다.
                </p>
              </div>

              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-semibold text-foreground mb-2">트랙 설명회</h4>
                <p className="text-foreground/70 leading-relaxed">
                  4-5주차에 각 심화트랙 설명회가 진행되어 본격적인 트랙 선택을 준비할 수 있어요.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleTrackChange(track.id)}
                  className={cn(
                    "px-3 md:px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    activeTrack === track.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  {track.fullName}
                </button>
              ))}
            </div>

            <div className="relative rounded-3xl bg-black/95 backdrop-blur-xl p-6 md:p-8 min-h-[200px] md:min-h-[240px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/30 to-black rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-red-950/20 via-transparent to-transparent rounded-3xl"></div>
              
              <button
                onClick={() => {
                  const currentIndex = tracks.findIndex(t => t.id === activeTrack);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
                  handleTrackChange(tracks[prevIndex].id);
                }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 z-20 backdrop-blur-sm"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
              <button
                onClick={() => {
                  const currentIndex = tracks.findIndex(t => t.id === activeTrack);
                  const nextIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
                  handleTrackChange(tracks[nextIndex].id);
                }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 z-20 backdrop-blur-sm"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>

              <div className="relative z-10">
                <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 h-full pl-8 md:pl-12 pr-8 md:pr-12">
                  <div className={cn(
                    "flex-1 flex flex-col justify-center transition-all duration-300",
                    isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
                  )}>
                    <div className="mb-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-2">
                        {currentTrack.label}
                      </span>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                        {currentTrack.title}
                      </h3>
                    </div>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl">
                      {currentTrack.description}
                    </p>
                  </div>

                  <div className={cn(
                    "flex flex-col gap-2 md:gap-3 justify-center transition-all duration-300",
                    isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
                  )}>
                    {currentTrack.topics.map((topic, index) => (
                      <button
                        key={`${currentTrack.id}-${index}`}
                        className={cn(
                          "px-5 py-2.5 md:px-6 md:py-3 rounded-xl text-left font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl",
                          topic.color
                        )}
                      >
                        {topic.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CurriculumSection;
