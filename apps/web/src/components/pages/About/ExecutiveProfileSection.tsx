"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { IMAGE_PATHS } from "@/lib/constants/app";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EXECUTIVE_PROFILES, type ExecutiveProfile } from "@/data/executives";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

/** 운영진 이메일 클릭 시 Gmail 작성 화면 열기 */
const openExecutiveEmail = (executive: ExecutiveProfile) => {
  if (!executive.email) return;
  const subject = `[KHUDA 문의] ${executive.name}님께`;
  const body = `안녕하세요, ${executive.name}님.\n\nKHUDA 관련 문의드립니다.\n\n`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(executive.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&tf=cm`;
  window.open(gmailUrl, "_blank", "noopener,noreferrer");
};

/** 카드에 표시할 직책 라벨 (트랙장은 트랙명을 앞에 붙인다) */
const getRoleLabel = (executive: ExecutiveProfile): string => {
  if (executive.role === "트랙장" && executive.department) {
    return `${executive.department} 트랙장`;
  }
  // 겸임(예: 부회장 + 트랙장)인 경우 구분자로 두 직책을 나란히 표기한다.
  if (executive.department && executive.role !== "트랙장") {
    return `${executive.role} / ${executive.department} 트랙장`;
  }
  return executive.role;
};

const ExecutiveCard = ({ executive }: { executive: ExecutiveProfile }) => (
  // 명함 스타일: 정식 명함 비율(90:55) + 좌측 정렬 정보 + 우상단 KHUDA 아이콘
  <div className="group relative flex aspect-[90/55] flex-col justify-between rounded-2xl border border-[#E8EBED] bg-white p-5 sm:p-6 text-left shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
    {/* 우상단 KHUDA 아이콘 */}
    <img
      src={IMAGE_PATHS.icon}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute right-5 top-5 h-9 w-9 sm:h-11 sm:w-11 opacity-90"
    />

    {/* 이름 + 직책 */}
    <div className="pr-12">
      <h4 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
        {executive.name}
      </h4>
      <p className="mt-1 text-xs sm:text-sm font-semibold text-gray-500">
        {getRoleLabel(executive)}
      </p>
    </div>

    {/* 소속 + 이메일 */}
    <div className="mt-4 space-y-1.5">
      {executive.affiliation && (
        <p className="text-[11px] sm:text-xs leading-relaxed text-gray-400 break-keep">
          {executive.affiliation}
        </p>
      )}
      {executive.email && (
        <button
          type="button"
          onClick={() => openExecutiveEmail(executive)}
          className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-1 rounded"
          aria-label={`${executive.name}님에게 이메일 보내기`}
        >
          <Mail className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">{executive.email}</span>
        </button>
      )}
    </div>
  </div>
);

const ExecutiveGrid = ({ executives }: { executives: ExecutiveProfile[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 w-full">
    {executives.map((executive, index) => (
      <ExecutiveCard key={`${executive.name}-${index}`} executive={executive} />
    ))}
  </div>
);

// 운영진 명단 확정 전 기수에 노출되는 안내 블록
const ComingSoonBlock = () => (
  <div className="py-2 sm:py-4">
    <p className="mb-6 sm:mb-8 text-base sm:text-lg font-bold text-gray-900">
      곧 새로운 운영진으로 업데이트됩니다
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="aspect-[90/55] rounded-2xl border border-[#E8EBED] bg-white p-5 sm:p-6"
        >
          <div className="mb-3 h-4 w-16 rounded-full bg-[#F2F4F6]" />
          <div className="h-3 w-12 rounded-full bg-[#F2F4F6]/80" />
        </div>
      ))}
    </div>
  </div>
);

const ExecutiveProfileSection = () => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  // 현재 기수는 기본으로 펼쳐둔다.
  const currentGeneration = EXECUTIVE_PROFILES[0];

  return (
    <section className="relative bg-background text-foreground pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-12">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* 섹션 제목 (기존 스타일: 가운데 정렬 큰 제목) */}
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight px-2 break-keep">
              KHUDA를 이끌어가는 {currentGeneration.generation} 운영진을 소개합니다
            </h2>
          </div>

          {/* 기수 단위 아코디언 (다중 펼침, 얇은 구분선) */}
          <Accordion
            type="multiple"
            defaultValue={[currentGeneration.generation]}
            className="mt-10 sm:mt-14 md:mt-16 w-full border-t border-border"
          >
            {EXECUTIVE_PROFILES.map((generation) => (
              <AccordionItem
                key={generation.generation}
                value={generation.generation}
                className="border-b border-border"
              >
                <AccordionTrigger className="py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl font-bold text-gray-900 hover:no-underline">
                  {generation.generation}
                </AccordionTrigger>
                <AccordionContent className="pb-6 sm:pb-7 md:pb-8">
                  {generation.comingSoon ? (
                    <ComingSoonBlock />
                  ) : (
                    <ExecutiveGrid executives={generation.executives} />
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveProfileSection;
