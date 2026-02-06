import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG, ROUTES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
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
  topics: { title: string }[];
}

interface TrackCardInfo {
  type: "description" | "cta" | "info";
  content: string;
  subContent?: string;
}

const tracks: TrackInfo[] = [
  {
    id: "nlp",
    label: "NLP",
    title: "자연어처리",
    description:
      "텍스트 데이터를 컴퓨터가 이해하고 활용하도록 만드는 기술을 다루는 트랙입니다. 뉴스/댓글/문서 같은 실제 데이터를 기반으로 분류·요약·검색·챗봇 등 실전 과제를 직접 구현하며 NLP 파이프라인을 경험합니다.",
    topics: [{ title: "분류/요약" }, { title: "검색/챗봇" }, { title: "NLP 파이프라인" }],
  },
  {
    id: "cv",
    label: "CV",
    title: "컴퓨터비전",
    description:
      "이미지와 비디오에서 의미 있는 데이터를 해석하고 분석하며 추출하는 기술을 학습합니다. 딥러닝과 신경망을 활용해 사물 인식, 상황 인지, 이미지 생성까지 경험합니다.",
    topics: [{ title: "사물 인식" }, { title: "상황 인지" }, { title: "이미지 생성" }],
  },
  {
    id: "de",
    label: "DE",
    title: "데이터엔지니어링",
    description:
      "대규모 데이터를 효율적으로 수집, 저장, 처리하는 인프라를 구축하는 기술을 학습합니다. ETL 파이프라인, 분산 처리 시스템, 클라우드 서비스를 활용한 데이터 플랫폼 구축을 다룹니다.",
    topics: [{ title: "데이터 파이프라인" }, { title: "분산 처리" }, { title: "클라우드 인프라" }],
  },
  {
    id: "da",
    label: "Data Business",
    title: "데이터비즈니스",
    description:
      "데이터에서 인사이트를 도출하고 비즈니스 문제를 해결하는 방법을 학습합니다. XAI로 AI 모델의 예측 근거를 해석하여 투명성과 신뢰성을 확보합니다.",
    topics: [{ title: "비즈니스 인사이트" }, { title: "XAI" }, { title: "신뢰성 확보" }],
  },
  {
    id: "aie",
    label: "AI Engineering",
    title: "AI엔지니어링",
    description:
      "파운데이션 모델을 실제 애플리케이션에 적용하기 위한 엔지니어링 과정을 다룹니다. 프롬프트 설계, RAG/에이전트, 파인튜닝과 최적화까지 전 과정을 학습합니다.",
    topics: [{ title: "프롬프트 설계" }, { title: "RAG/에이전트" }, { title: "파인튜닝/최적화" }],
  },
  {
    id: "fin",
    label: "Finance",
    title: "금융",
    description:
      "오픈소스를 활용하여 기업 부도 예측, 주가 수익률 예측, 뉴스 감성 분석 등 미니프로젝트를 수행하며 실전 데이터 파이프라인을 직접 구축합니다.",
    topics: [{ title: "부도 예측(ML)" }, { title: "주가 예측(DL)" }, { title: "감성 분석(NLP)" }],
  },
];

const getCardsForTrack = (track: TrackInfo): TrackCardInfo[] => {
  // 각 트랙별 4개 카드: 설명1, 설명2, CTA, 설명3
  return [
    {
      type: "description",
      content: `${track.title} 트랙은\n${track.topics.map((t) => t.title).join(", ")} 등\n다양한 주제를 다루며\n실전 역량을 키웁니다.`,
    },
    {
      type: "info",
      content: track.description,
    },
    {
      type: "cta",
      content: `트랙 자세히\n보러가기`,
      subContent: "→",
    },
    {
      type: "description",
      content: `데이터와 AI 지식을\n공유하며 성장하는\n네트워크를\n형성하는 것이\n목표에요.`,
    },
  ];
};

const TrackShowcase = () => {
  const [activeTrack, setActiveTrack] = useState(tracks[0].id);
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isUserInteractingRef = useRef(false);

  const currentTrack = tracks.find((t) => t.id === activeTrack) || tracks[0];
  const cards = getCardsForTrack(currentTrack);

  // 자동 루프 기능
  useEffect(() => {
    if (!isVisible) return;

    const startAutoLoop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (!isUserInteractingRef.current) {
          setActiveTrack((prev) => {
            const currentIndex = tracks.findIndex((t) => t.id === prev);
            const nextIndex = (currentIndex + 1) % tracks.length;
            return tracks[nextIndex].id;
          });
        }
      }, 4000); // 4초마다 자동 전환
    };

    startAutoLoop();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible]);

  const handleTrackChange = (trackId: string) => {
    setActiveTrack(trackId);
    isUserInteractingRef.current = true;
    
    // 사용자 상호작용 후 10초 뒤에 다시 자동 루프 활성화
    setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 10000);
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
      <div className="mb-10 sm:mb-14 md:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight sm:leading-[1.15] tracking-tight">
              IN
              <br />
              <span className="bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                KHUDA
              </span>
            </h2>
            <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-white/60 leading-relaxed max-w-xl">
              각 분야의 열정 넘치는 동료들과 함께 깊이 있는 학습을 경험하세요.
              <br className="sm:hidden" />
              <br className="hidden sm:block" />
              6가지 심화트랙에서 전문성을 키워갑니다.
            </p>
          </div>
          <Link
            to={ROUTES.activities}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group mt-1 sm:mt-3 self-start"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-black transition-colors duration-300" />
          </Link>
        </div>
      </div>

      {/* 트랙 탭 */}
      <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12 -mx-2 px-2 overflow-x-auto md:overflow-visible flex-nowrap md:flex-wrap">
        {tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => handleTrackChange(track.id)}
            className={cn(
              "px-3 sm:px-5 md:px-6 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0",
              activeTrack === track.id
                ? "bg-gradient-to-r from-red-500 to-purple-500 text-white border-transparent shadow-lg shadow-purple-500/20"
                : "bg-transparent text-white/80 border-2 border-white hover:border-white hover:text-white"
            )}
          >
            {track.label}
          </button>
        ))}
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card, index) => (
          <div
            key={`${activeTrack}-${index}`}
            className={cn(
              "rounded-2xl p-5 sm:p-7 md:p-8 min-h-[180px] sm:min-h-[220px] md:min-h-[260px] flex flex-col justify-between transition-all duration-500 ease-out",
              card.type === "cta"
                ? "bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 text-white cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30"
                : "bg-white/[0.04] border border-white/10 text-white hover:bg-white/[0.07] hover:border-white/15"
            )}
            style={{
              animationDelay: `${index * 80}ms`,
            }}
          >
            {card.type === "cta" ? (
              <Link to={ROUTES.activities} className="flex flex-col justify-between h-full">
                <p className="text-lg sm:text-xl md:text-2xl font-bold leading-snug whitespace-pre-line">
                  {card.content}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </Link>
            ) : (
              <>
                <p
                  className={cn(
                    "leading-relaxed whitespace-pre-line",
                    card.type === "info"
                      ? "text-xs sm:text-sm text-white/60"
                      : "text-base sm:text-lg md:text-xl font-semibold text-white/90"
                  )}
                >
                  {card.content}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackShowcase;
