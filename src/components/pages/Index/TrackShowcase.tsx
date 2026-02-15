import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG, ROUTES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import LogoLoop from "@/components/pages/Sponsor/LogoLoop";

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
  type: "description" | "info";
  content: string;
  trackId?: string;
  trackLabel?: string;
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
    label: "Data Engineering",
    title: "데이터엔지니어링",
    description:
      "대규모 데이터를 효율적으로 수집, 저장, 처리하는 인프라를 구축하는 기술을 학습합니다. ETL 파이프라인, 분산 처리 시스템, 클라우드 서비스를 활용한 데이터 플랫폼 구축을 다룹니다.",
    topics: [{ title: "데이터 파이프라인" }, { title: "분산 처리" }, { title: "클라우드 인프라" }],
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
    id: "da",
    label: "Data Business",
    title: "데이터비즈니스",
    description:
      "데이터에서 인사이트를 도출하고 비즈니스 문제를 해결하는 방법을 학습합니다. XAI로 AI 모델의 예측 근거를 해석하여 투명성과 신뢰성을 확보합니다.",
    topics: [{ title: "비즈니스 인사이트" }, { title: "XAI" }, { title: "신뢰성 확보" }],
  },
  {
    id: "fin",
    label: "Finance",
    title: "금융",
    description:
      "기업 부도 예측, 주가 수익률 예측, 뉴스 감성 분석 등 금융 데이터 분석 프로젝트를 수행합니다.",
    topics: [{ title: "부도 예측(ML)" }, { title: "주가 예측(DL)" }, { title: "감성 분석(NLP)" }],
  },
];

const getCardsForTrack = (track: TrackInfo): TrackCardInfo[] => {
  // 각 트랙별 1개 카드 - 핵심 내용 한 줄
  // description의 첫 문장만 사용 (핵심 내용)
  const coreContent = track.description.split('.')[0] + '.';
  return [
    {
      type: "description",
      content: coreContent,
    },
  ];
};

const TrackShowcase = () => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  // 모든 트랙의 카드를 합쳐서 하나의 배열로 만들기 (tracks 배열 순서대로)
  const cards = useMemo(() => {
    const allCards: TrackCardInfo[] = [];
    // tracks 배열 순서대로: NLP -> CV -> Data Engineering -> AI Engineering -> Data Business -> Finance
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      const trackCards = getCardsForTrack(track).map((card) => ({
        ...card,
        trackId: track.id,
        trackLabel: track.label,
      }));
      allCards.push(...trackCards);
    }
    return allCards;
  }, []);

  // LogoLoop용 로고 아이템 배열 생성 (모든 트랙의 카드)
  const logoItems = useMemo(() => {
    return cards.map((card, index) => ({
      node: undefined, // renderItem에서 처리
      ariaLabel: `트랙 카드 ${index + 1}`,
    }));
  }, [cards]);

  const handleTrackClick = (trackId: string) => {
    // 버튼 클릭 시 활동 페이지로 이동
    window.location.href = ROUTES.activities;
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
      <div className="mb-8 sm:mb-10 md:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2.5 sm:gap-0 sm:items-start">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight sm:leading-[1.15] tracking-tight">
                IN
                <br />
                <span className="text-blue-700">
                  KHUDA
                </span>
              </h2>
              {/* 모바일에서만 글씨 옆 중간 높이에 화살표 표시 */}
              <Link
                to={ROUTES.activities}
                className="flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 group sm:hidden"
              >
                <ArrowRight className="w-3.5 h-3.5 text-gray-900 group-hover:text-white transition-colors duration-300" />
              </Link>
            </div>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-black leading-relaxed max-w-xl">
              각 분야의 열정 넘치는 트랙원들과 함께 깊이 있는 학습을 경험하세요.
              <br className="sm:hidden" />
              <br className="hidden sm:block" />
              6가지 심화트랙에서 전문성을 키워갑니다.
            </p>
          </div>
          {/* 데스크톱에서만 오른쪽에 화살표 표시 */}
          <Link
            to={ROUTES.activities}
            className="hidden sm:flex flex-shrink-0 w-12 sm:w-12 md:w-14 md:h-14 rounded-full border-2 border-gray-300 items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 group mt-3 self-start"
          >
            <ArrowRight className="w-6 sm:w-6 text-gray-900 group-hover:text-white transition-colors duration-300" />
          </Link>
        </div>
      </div>

      {/* 트랙 탭 */}
      <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10 lg:mb-12 -mx-2 px-2 overflow-x-auto md:overflow-visible flex-nowrap md:flex-wrap scrollbar-hide">
        {tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => handleTrackClick(track.id)}
            className={cn(
              "group relative px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0",
              "bg-black text-white border-2 border-white hover:bg-blue-700 hover:text-white hover:border-blue-700 hover:shadow-lg"
            )}
          >
            <span className="block group-hover:hidden">{track.label}</span>
            <span className="hidden group-hover:block">자세히 보기</span>
          </button>
        ))}
      </div>

      {/* 가로 루프 카드 */}
      <div className="relative overflow-hidden -mx-6 sm:-mx-8 md:-mx-16 lg:-mx-20 px-6 sm:px-8 md:px-16 lg:px-20">
        <div className="h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] relative">
          <LogoLoop
            logos={logoItems}
            speed={40}
            direction="left"
            gap={16}
            pauseOnHover={true}
            hoverSpeed={0}
            fadeOut={false}
            ariaLabel="트랙 소개 카드"
            renderItem={useCallback((item, key) => {
              // key 형식: "copyIndex-itemIndex" 또는 숫자
              let itemIndex: number;
              if (typeof key === 'string' && key.includes('-')) {
                const parts = key.split('-');
                itemIndex = parts.length > 1 ? parseInt(parts[1], 10) : parseInt(parts[0], 10);
              } else {
                itemIndex = typeof key === 'number' ? key : parseInt(String(key), 10);
              }
              // 배열 범위 내로 제한
              itemIndex = itemIndex % cards.length;
              const card = cards[itemIndex];
              if (!card) return null;

              return (
                <div
                  className={cn(
                    "rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[300px] w-[220px] sm:w-[260px] md:w-[300px] lg:w-[320px] flex flex-col justify-between transition-all duration-500 ease-out",
                    "bg-gray-50 border border-gray-200 text-gray-900 hover:bg-gray-100 hover:border-gray-300"
                  )}
                >
                  {/* 트랙 라벨 표시 */}
                  <div className="mb-1.5 sm:mb-2 text-[10px] sm:text-xs text-gray-400 font-medium">
                    {card.trackLabel}
                  </div>

                  <p
                    className={cn(
                      "leading-relaxed whitespace-pre-line",
                      card.type === "info"
                        ? "text-[10px] sm:text-[11px] md:text-xs text-gray-500"
                        : "text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800"
                    )}
                  >
                    {card.content}
                  </p>
                </div>
              );
            }, [cards])}
          />
        </div>
      </div>
    </div>
  );
};

export default TrackShowcase;
