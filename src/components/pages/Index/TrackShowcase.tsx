import { useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG, ROUTES } from "@/lib/constants";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

interface TrackInfo {
  id: string;
  label: string;
  title: string;
  description: string;
  topics: string[];
}

const tracks: TrackInfo[] = [
  {
    id: "nlp",
    label: "NLP",
    title: "자연어처리",
    description:
      "텍스트 데이터를 컴퓨터가 이해하고 활용하도록 만드는 기술을 다루는 트랙입니다. 분류·요약·검색·챗봇 등 실전 과제를 직접 구현하며 NLP 파이프라인을 경험합니다.",
    topics: ["분류/요약", "검색/챗봇", "NLP 파이프라인"],
  },
  {
    id: "cv",
    label: "CV",
    title: "컴퓨터비전",
    description:
      "이미지와 비디오에서 의미 있는 데이터를 해석하고 분석하며 추출하는 기술을 학습합니다. 딥러닝과 신경망을 활용해 사물 인식, 상황 인지, 이미지 생성까지 경험합니다.",
    topics: ["사물 인식", "상황 인지", "이미지 생성"],
  },
  {
    id: "de",
    label: "Data Engineering",
    title: "데이터엔지니어링",
    description:
      "대규모 데이터를 효율적으로 수집, 저장, 처리하는 인프라를 구축하는 기술을 학습합니다. ETL 파이프라인, 분산 처리 시스템, 클라우드 서비스를 활용한 데이터 플랫폼 구축을 다룹니다.",
    topics: ["데이터 파이프라인", "분산 처리", "클라우드 인프라"],
  },
  {
    id: "aie",
    label: "AI Engineering",
    title: "AI엔지니어링",
    description:
      "파운데이션 모델을 실제 애플리케이션에 적용하기 위한 엔지니어링 과정을 다룹니다. 프롬프트 설계, RAG/에이전트, 파인튜닝과 최적화까지 전 과정을 학습합니다.",
    topics: ["프롬프트 설계", "RAG/에이전트", "파인튜닝/최적화"],
  },
  {
    id: "da",
    label: "Data Business",
    title: "데이터비즈니스",
    description:
      "데이터에서 인사이트를 도출하고 비즈니스 문제를 해결하는 방법을 학습합니다. XAI로 AI 모델의 예측 근거를 해석하여 투명성과 신뢰성을 확보합니다.",
    topics: ["비즈니스 인사이트", "XAI", "신뢰성 확보"],
  },
  {
    id: "fin",
    label: "Finance",
    title: "금융",
    description:
      "기업 부도 예측, 주가 수익률 예측, 뉴스 감성 분석 등 금융 데이터 분석 프로젝트를 수행합니다.",
    topics: ["부도 예측(ML)", "주가 예측(DL)", "감성 분석(NLP)"],
  },
];

const TrackShowcase = () => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const handlePointerEnter = (e: React.PointerEvent, id: string) => {
    if (e.pointerType === "mouse") setFlippedId(id);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setFlippedId(null);
  };

  const handlePointerUp = (e: React.PointerEvent, id: string) => {
    if (e.pointerType !== "mouse") {
      setFlippedId((prev) => (prev === id ? null : id));
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      {/* 헤더 */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2.5 sm:gap-0 sm:items-start">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight sm:leading-[1.15] tracking-tight">
                IN
                <br />
                <span className="text-blue-700">KHUDA</span>
              </h2>
              <Link
                to={ROUTES.activities}
                className="flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 group sm:hidden"
              >
                <ArrowRight className="w-3.5 h-3.5 text-gray-900 group-hover:text-white transition-colors duration-300" />
              </Link>
            </div>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-black leading-relaxed max-w-xl">
              각 분야의 열정 넘치는 트랙원들과 함께
              <br className="sm:hidden" />
              {" "}깊이 있는 학습을 경험하세요.
              <br />
              6가지 심화트랙에서 전문성을 키워갑니다.
            </p>
          </div>
          <Link
            to={ROUTES.activities}
            className="hidden sm:flex flex-shrink-0 w-12 sm:w-12 md:w-14 md:h-14 rounded-full border-2 border-gray-300 items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 group mt-3 self-start"
          >
            <ArrowRight className="w-6 sm:w-6 text-gray-900 group-hover:text-white transition-colors duration-300" />
          </Link>
        </div>
      </div>

      {/* 트랙 카드 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
        {tracks.map((track) => {
          const isFlipped = flippedId === track.id;

          return (
            <div
              key={track.id}
              className="h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] cursor-pointer"
              style={{ perspective: "800px" }}
              onPointerEnter={(e) => handlePointerEnter(e, track.id)}
              onPointerLeave={handlePointerLeave}
              onPointerUp={(e) => handlePointerUp(e, track.id)}
            >
              <div
                className={cn(
                  "relative w-full h-full transition-transform duration-500 ease-in-out [transform-style:preserve-3d]",
                  isFlipped && "[transform:rotateY(180deg)]"
                )}
              >
                {/* 앞면 */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between [backface-visibility:hidden] bg-gray-900 text-white">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                      {track.label}
                    </h3>
                    <p className="text-[11px] sm:text-xs mt-0.5 sm:mt-1 text-white/50">
                      {track.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold">
                      자세히 보기
                    </span>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/15 flex items-center justify-center">
                      <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                    </div>
                  </div>
                </div>

                {/* 뒷면 */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gray-800 text-white overflow-hidden">
                  <div className="min-h-0 overflow-hidden">
                    <h3 className="text-xs sm:text-base font-bold mb-1 sm:mb-2">
                      {track.label}
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed line-clamp-3 sm:line-clamp-5 text-white/80">
                      {track.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1.5 sm:mt-2 flex-shrink-0">
                    {track.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium bg-white/10 text-white/80"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackShowcase;
