import { useState } from "react";
import { cn } from "@/lib/utils";

const phases = [
  { id: "vacation", name: "방학", fullName: "방학 기초 세션" },
  { id: "semester", name: "학기", fullName: "학기 중 심화 트랙" },
];

const tracks = [
  { id: "nlp", name: "NLP", fullName: "자연어처리" },
  { id: "cv", name: "CV", fullName: "컴퓨터비전" },
  { id: "de", name: "DE", fullName: "데이터엔지니어링" },
  { id: "da", name: "DA", fullName: "데이터분석" },
  { id: "aie", name: "AIE", fullName: "AI엔지니어링" },
  { id: "fin", name: "FIN", fullName: "금융AI" },
];

const vacationCurriculum = [
  { week: "Week 1-2", title: "Python 기초", description: "Python 문법, 자료구조, 함수와 클래스" },
  { week: "Week 3-4", title: "데이터 분석 기초", description: "Numpy, Pandas 활용 데이터 처리" },
  { week: "Week 5-6", title: "머신러닝 기초", description: "지도학습, 비지도학습 핵심 알고리즘" },
  { week: "Week 7-8", title: "ML 프로젝트 실습", description: "Scikit-learn 활용 미니 프로젝트" },
];

const semesterCurriculumData: Record<string, { week: string; title: string; description: string }[]> = {
  nlp: [
    { week: "Week 1-2", title: "NLP 기초와 텍스트 전처리", description: "토큰화, 정규화, 임베딩 기초" },
    { week: "Week 3-4", title: "언어 모델의 이해", description: "RNN, LSTM, Transformer 아키텍처" },
    { week: "Week 5-6", title: "사전학습 모델 활용", description: "BERT, GPT 계열 모델 Fine-tuning" },
    { week: "Week 7-8", title: "프로젝트 수행", description: "팀 프로젝트 및 발표" },
  ],
  cv: [
    { week: "Week 1-2", title: "컴퓨터비전 기초", description: "이미지 처리 및 CNN 아키텍처" },
    { week: "Week 3-4", title: "객체 탐지와 분할", description: "YOLO, Mask R-CNN 실습" },
    { week: "Week 5-6", title: "생성 모델", description: "GAN, Diffusion 모델 이해" },
    { week: "Week 7-8", title: "프로젝트 수행", description: "팀 프로젝트 및 발표" },
  ],
  de: [
    { week: "Week 1-2", title: "데이터 파이프라인 기초", description: "ETL 프로세스와 데이터 웨어하우스" },
    { week: "Week 3-4", title: "분산 처리 시스템", description: "Spark, Kafka 활용" },
    { week: "Week 5-6", title: "클라우드 인프라", description: "AWS/GCP 데이터 서비스" },
    { week: "Week 7-8", title: "프로젝트 수행", description: "팀 프로젝트 및 발표" },
  ],
  da: [
    { week: "Week 1-2", title: "데이터 분석 기초", description: "EDA와 통계적 분석 방법론" },
    { week: "Week 3-4", title: "시각화와 스토리텔링", description: "효과적인 데이터 커뮤니케이션" },
    { week: "Week 5-6", title: "머신러닝 기반 분석", description: "예측 모델링과 해석" },
    { week: "Week 7-8", title: "프로젝트 수행", description: "팀 프로젝트 및 발표" },
  ],
  aie: [
    { week: "Week 1-2", title: "MLOps 기초", description: "ML 파이프라인과 버전 관리" },
    { week: "Week 3-4", title: "모델 서빙", description: "FastAPI, Docker 기반 배포" },
    { week: "Week 5-6", title: "모니터링과 최적화", description: "성능 추적 및 A/B 테스트" },
    { week: "Week 7-8", title: "프로젝트 수행", description: "팀 프로젝트 및 발표" },
  ],
  fin: [
    { week: "Week 1-2", title: "금융 데이터 이해", description: "시계열 분석과 금융 지표" },
    { week: "Week 3-4", title: "퀀트 전략", description: "알고리즘 트레이딩 기초" },
    { week: "Week 5-6", title: "리스크 모델링", description: "VaR, 포트폴리오 최적화" },
    { week: "Week 7-8", title: "프로젝트 수행", description: "팀 프로젝트 및 발표" },
  ],
};

const CurriculumSection = () => {
  const [activePhase, setActivePhase] = useState("vacation");
  const [activeTrack, setActiveTrack] = useState("nlp");

  const currentCurriculum = activePhase === "vacation" 
    ? vacationCurriculum 
    : semesterCurriculumData[activeTrack];

  return (
    <section id="curriculum" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            활동 소개
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            KHUDA만의 체계적인 커리큘럼을 통해<br />
            이론과 실습을 넘나들며, 차별화된 성장을 경험합니다.
          </p>
        </div>

        {/* Phase tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={cn(
                "px-6 md:px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 border",
                activePhase === phase.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border-border"
              )}
            >
              {phase.fullName}
            </button>
          ))}
        </div>

        {/* Track tabs (only show for semester) */}
        {activePhase === "semester" && (
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id)}
                className={cn(
                  "px-4 md:px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                  activeTrack === track.id
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                )}
              >
                <span className="hidden md:inline">{track.fullName}</span>
                <span className="md:hidden">{track.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Phase description */}
        <div className="text-center mb-8">
          {activePhase === "vacation" ? (
            <p className="text-muted-foreground">
              방학 중 진행되는 기초 세션으로, Python과 머신러닝의 기본기를 다집니다.
            </p>
          ) : (
            <p className="text-muted-foreground">
              학기 중 진행되는 심화 트랙으로, 관심 분야를 깊이 있게 학습합니다.
            </p>
          )}
        </div>

        {/* Curriculum cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentCurriculum?.map((item, index) => (
            <div
              key={index}
              className="card-glass p-6 rounded-lg hover:border-primary/50 transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className={cn(
                "text-xs font-medium tracking-wider uppercase mb-3 block",
                activePhase === "vacation" ? "text-accent" : "text-primary"
              )}>
                {item.week}
              </span>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-4 md:gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm">주 1회 오프라인 세션</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm">멘토링 지원</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm">프로젝트 발표회</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
