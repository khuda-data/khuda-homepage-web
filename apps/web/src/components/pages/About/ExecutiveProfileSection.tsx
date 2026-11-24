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
import type { ReactNode } from "react";

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

const ExecutiveCard = ({ executive, roleLabel }: { executive: ExecutiveProfile; roleLabel?: string }) => (
  // 명함 스타일: 정식 명함 비율(90:55) + 좌측 정렬 정보 + 우상단 KHUDA 아이콘
  <div className="group relative flex aspect-auto min-h-[128px] sm:min-h-0 sm:aspect-[90/55] flex-col justify-between gap-3 rounded-2xl border border-[#E8EBED] bg-white p-4 sm:p-6 text-left shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
    {/* 우상단 KHUDA 아이콘 */}
    <img
      src={IMAGE_PATHS.icon}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-4 h-8 w-8 sm:right-5 sm:top-5 sm:h-11 sm:w-11 opacity-90"
    />

    {/* 이름 + 직책 */}
    <div className="pr-10 sm:pr-12">
      <h4 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
        {executive.name}
      </h4>
      <p className="mt-1 text-xs sm:text-sm font-semibold text-gray-500">
        {roleLabel ?? getRoleLabel(executive)}
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
          className="inline-flex items-start gap-1.5 text-[11px] sm:text-xs font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-1 rounded text-left"
          aria-label={`${executive.name}님에게 이메일 보내기`}
        >
          <Mail className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
          <span className="break-all">{executive.email}</span>
        </button>
      )}
    </div>
  </div>
);

// 명단을 회장단 / 부서별 / 트랙장으로 나눈다.
// - 부서는 role이 "OO부장", "OO부원"인 사람을 OO부로 묶고 부장을 앞에 둔다. (교육부, 기획부, 대외홍보부 등)
// - 겸임자는 회장단 > 부서 > 트랙장 순으로 우선순위가 높은 한 곳에만 둔다.
//   (예: 대외홍보부장 + 데이터 분석 트랙장 → 부서에만, 카드 직책에 "대외홍보부장 / 데이터 분석 트랙장"으로 표기)
interface OrgGroup {
  title: string;
  members: { executive: ExecutiveProfile; roleLabel?: string }[];
}

const groupExecutives = (executives: ExecutiveProfile[]) => {
  const leaders = executives
    .filter((e) => e.role === "회장" || e.role === "부회장")
    .sort((a, b) => (a.role === "회장" ? -1 : 0) - (b.role === "회장" ? -1 : 0));

  const departments = new Map<string, ExecutiveProfile[]>();
  executives.forEach((e) => {
    const match = e.role.match(/^(.+부)(장|원)$/);
    if (!match || e.role === "부회장") return;
    const list = departments.get(match[1]) ?? [];
    list.push(e);
    departments.set(match[1], list);
  });
  const departmentGroups: OrgGroup[] = [...departments.entries()].map(([name, list]) => ({
    title: name,
    members: [...list]
      .sort((a, b) => Number(b.role.endsWith("장")) - Number(a.role.endsWith("장")))
      .map((executive) => ({ executive })),
  }));

  const trackLeads: OrgGroup["members"] = executives
    .filter((e) => e.role === "트랙장")
    .map((executive) => ({
      executive,
      roleLabel: executive.department ? `${executive.department} 트랙장` : "트랙장",
    }));

  return { leaders, departmentGroups, trackLeads };
};

const GroupLabel = ({ children }: { children: ReactNode }) => (
  <h3 className="mb-3 sm:mb-4 text-sm sm:text-base font-bold text-gray-900">{children}</h3>
);

const OrganizationView = ({ executives }: { executives: ExecutiveProfile[] }) => {
  const { leaders, departmentGroups, trackLeads } = groupExecutives(executives);
  return (
    <div className="space-y-10 sm:space-y-12">
      {leaders.length > 0 && (
        <div>
          <GroupLabel>회장단</GroupLabel>
          <ExecutiveGrid executives={leaders} />
        </div>
      )}

      {departmentGroups.length > 0 && (
        <div>
          <GroupLabel>부서</GroupLabel>
          <div className="space-y-6 sm:space-y-8">
            {departmentGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-2.5 sm:mb-3 text-xs sm:text-sm font-semibold text-blue-600">{group.title}</p>
                <ExecutiveGrid executives={group.members.map((m) => m.executive)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {trackLeads.length > 0 && (
        <div>
          <GroupLabel>트랙장</GroupLabel>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 w-full">
            {trackLeads.map(({ executive, roleLabel }, index) => (
              <ExecutiveCard key={`${executive.name}-track-${index}`} executive={executive} roleLabel={roleLabel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ExecutiveGrid = ({ executives }: { executives: ExecutiveProfile[] }) => (
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 w-full">
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
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="aspect-[90/55] rounded-2xl border border-[#E8EBED] bg-white p-4 sm:p-6"
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

  // 현재 기수는 기수 라벨(예: "10기") 행 없이 카드만 바로 노출한다.
  // 과거 기수만 아코디언으로 접어둔다.
  const currentGeneration = EXECUTIVE_PROFILES[0];
  const pastGenerations = EXECUTIVE_PROFILES.slice(1);

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
            <h2 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight px-2 break-keep">
              KHUDA를 이끌어가는 {currentGeneration.generation} 운영진을 소개합니다
            </h2>
          </div>

          {/* 현재 기수: 기수 라벨 표시 안 함, 카드만 바로 노출 */}
          <div className="mt-10 sm:mt-14 md:mt-16">
            {currentGeneration.comingSoon ? (
              <ComingSoonBlock />
            ) : (
              <OrganizationView executives={currentGeneration.executives} />
            )}
          </div>

          {/* 과거 기수: 아코디언 (다중 펼침, 얇은 구분선) */}
          {pastGenerations.length > 0 && (
            <Accordion
              type="multiple"
              className="mt-12 sm:mt-16 md:mt-20 w-full border-t border-border"
            >
              {pastGenerations.map((generation) => (
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
                      <OrganizationView executives={generation.executives} />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveProfileSection;
