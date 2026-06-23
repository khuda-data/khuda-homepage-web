"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Timer, ChevronRight } from "lucide-react";
import { RECRUITMENT_SCHEDULE, RECRUITMENT_BANNER, ROUTES } from "@/lib/constants";

// 이 배너는 서류 모집 시작일부터 띄운다.
// 노출 시작일은 RECRUITMENT_BANNER.showFromISO(모집 시작일)로 관리하고, 그 전에는 숨긴다.
// 카운트다운 기준은 RECRUITMENT_SCHEDULE.application.deadlineISO(서류 마감)이고, 마감 후에는 자동으로 숨겨진다.
const DEADLINE = new Date(RECRUITMENT_SCHEDULE.application.deadlineISO);
const SHOW_FROM = new Date(RECRUITMENT_BANNER.showFromISO);

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// 마감까지 남은 시간 계산. 이미 지났으면 null.
const getRemaining = (): Remaining | null => {
  const now = Date.now();
  // 홍보 게시일 전에는 숨긴다.
  if (now < SHOW_FROM.getTime()) return null;

  const diff = DEADLINE.getTime() - now;
  if (Number.isNaN(diff) || diff <= 0) return null;

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
};

const pad = (value: number) => String(value).padStart(2, "0");

const RecruitmentBanner = () => {
  // SSR과 클라이언트의 시간 계산 차이로 인한 하이드레이션 불일치를 막기 위해
  // 초기값은 null로 두고 마운트 후 클라이언트에서만 계산한다.
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const timerId = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(timerId);
  }, []);

  // 모집 마감 이후에는 배너를 숨긴다.
  if (!remaining) return null;

  return (
    <div className="bg-zinc-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex h-10 items-center justify-between gap-3 text-xs sm:h-12 sm:text-sm">
          {/* 모집 문구 + 타이머를 왼쪽에 붙여서 배치 */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <p className="truncate font-semibold">{RECRUITMENT_BANNER.message}</p>
            <span className="flex items-center gap-1.5 whitespace-nowrap font-medium tabular-nums text-white/90">
              <Timer className="h-3.5 w-3.5 text-white/80 sm:h-4 sm:w-4" />
              {remaining.days}일 {pad(remaining.hours)}:{pad(remaining.minutes)}:{pad(remaining.seconds)}
            </span>
          </div>

          {/* 지원하러 가기 링크만 오른쪽에 배치 */}
          <Link
            href={ROUTES.recruiting}
            className="hidden flex-shrink-0 items-center gap-0.5 whitespace-nowrap font-medium text-white/90 transition-colors hover:text-white sm:flex"
          >
            {RECRUITMENT_BANNER.ctaLabel}
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentBanner;
