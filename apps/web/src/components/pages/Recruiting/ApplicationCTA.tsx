import { useMemo } from "react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  SECTION_STYLES,
  RECRUITMENT_SCHEDULE,
  APPLICATION_CTA_MESSAGES,
  ROUTES,
  IMAGE_PATHS,
  SCROLL_ANIMATION_CONFIG,
  KHUDA_GENERATION,
  NEXT_RECRUITMENT_MONTH,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { parseKoreanDate } from "@/lib/date-utils";

const ApplicationCTA = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });

  // 모집 기간 확인
  const isApplicationPeriod = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const startDate = parseKoreanDate(RECRUITMENT_SCHEDULE.application.start);
    const endDate = parseKoreanDate(RECRUITMENT_SCHEDULE.application.end);

    if (!startDate || !endDate) {
      return false;
    }

    const normalizedStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const normalizedEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    return today >= normalizedStartDate && today <= normalizedEndDate;
  }, []);

  return (
    <section
      ref={ref}
      className={cn(
        "relative transition-all duration-1000 ease-out",
        // 모집중일 때만 배경을 좌우 끝까지 꽉 채우고 상단 흰 띠 제거
        isApplicationPeriod &&
          "overflow-hidden -mx-4 -mt-8 sm:-mx-6 sm:-mt-12 md:-mx-12 md:-mt-16 lg:-mt-20",
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
      style={
        isApplicationPeriod
          ? { background: "linear-gradient(180deg, #E2EFFF 0%, #EAF3FF 45%, #F4F9FF 75%, #ffffff 100%)" }
          : undefined
      }
    >
      {/* 모집중일 때만: 뒷배경 로고 + 경계 페이드 */}
      {isApplicationPeriod && (
        <>
          <img
            src={IMAGE_PATHS.icon}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 w-[20rem] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.1] blur-[3px] sm:w-[26rem] md:w-[32rem]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 sm:h-16 bg-gradient-to-t from-background to-transparent"
          />
        </>
      )}

      <div
        className={cn(
          "container relative z-10 mx-auto px-4 sm:px-6 md:px-12 lg:px-16",
          isApplicationPeriod
            ? "pt-36 pb-16 sm:pt-44 sm:pb-24 md:pt-52 md:pb-28"
            : "py-12 sm:py-16 md:py-20"
        )}
      >
        {isApplicationPeriod ? (
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug tracking-tight text-foreground break-keep sm:whitespace-nowrap">
              KHUDA {KHUDA_GENERATION}기 지원이 시작됐어요!
            </h2>

            <p className="mt-4 text-base sm:text-lg md:text-xl font-semibold text-foreground break-keep">
              {RECRUITMENT_SCHEDULE.application.compact}
            </p>

            <Link
              href={ROUTES.apply}
              className="mt-8 inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-full bg-foreground px-12 text-base font-semibold text-background shadow-lg shadow-black/15 transition-all duration-200 hover:brightness-125 active:scale-[0.97]"
            >
              {APPLICATION_CTA_MESSAGES.buttonText}
            </Link>
          </div>
        ) : (
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <h2 className="text-xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
              지금은 모집 기간이 아니에요
            </h2>
            <p className="mt-6 whitespace-nowrap text-sm sm:text-lg md:text-xl leading-relaxed text-muted-foreground">
              다음 모집은 {NEXT_RECRUITMENT_MONTH}이에요. 다음 기수에서 꼭 만나요!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicationCTA;
