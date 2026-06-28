"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { RECRUITMENT_SCHEDULE, INTERVIEW_REFERENCE } from "@/lib/constants";

// 서류 접수 기간(application.startISO ~ deadlineISO)에만 노출하는 기술 면접 참고 자료 카드.
// SSR과 클라이언트의 시간 차이로 인한 하이드레이션 불일치를 막기 위해
// 초기에는 숨기고 마운트 후 클라이언트에서만 노출 여부를 계산한다. (RecruitmentBanner와 같은 패턴)
const START = new Date(RECRUITMENT_SCHEDULE.application.startISO);
const DEADLINE = new Date(RECRUITMENT_SCHEDULE.application.deadlineISO);

const isWithinApplicationPeriod = () => {
  const now = Date.now();
  return now >= START.getTime() && now <= DEADLINE.getTime();
};

// 노션 로고 (브랜드 SVG). lucide에는 브랜드 아이콘이 없어 인라인으로 둔다.
const NotionLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.561.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.328s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.216-1.632z" />
  </svg>
);

const InterviewReferenceCard = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isWithinApplicationPeriod());
    // 마감 시점에 자동으로 사라지도록 1분마다 다시 확인한다.
    const timerId = setInterval(() => setVisible(isWithinApplicationPeriod()), 60_000);
    return () => clearInterval(timerId);
  }, []);

  if (!visible) return null;

  return (
    <div className="max-w-6xl mx-auto mt-3 sm:mt-4 md:mt-5 lg:mt-6 px-4 sm:px-6 md:px-8">
      <a
        href={INTERVIEW_REFERENCE.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-2xl sm:rounded-3xl border border-blue-100 bg-white p-5 sm:p-6 md:p-7 lg:p-8 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md"
      >
        <div className="flex items-start gap-4 sm:gap-5">
          {/* 노션 아이콘 배지 */}
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <NotionLogo className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>

          {/* 본문 */}
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
              {INTERVIEW_REFERENCE.title}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
              {INTERVIEW_REFERENCE.description}
            </p>
            <span className="mt-3 sm:mt-4 inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600">
              {INTERVIEW_REFERENCE.linkLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

InterviewReferenceCard.displayName = "InterviewReferenceCard";

export default InterviewReferenceCard;
