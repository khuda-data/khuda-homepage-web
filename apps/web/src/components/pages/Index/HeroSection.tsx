/**
 * HeroSection.tsx
 *
 * 메인(Index) 페이지 최상단 히어로 섹션
 *
 * ── 구성 요소 ────────────────────────────────────────────────────────────────
 *   1. Grainient   — WebGL 셰이더 그레인 배경 (z-0, 최하단)
 *   2. KhudaLogo   — KHUDA 워드마크 SVG (h1으로 감싸 SEO·접근성 확보)
 *   3. 태그라인     — "KYUNGHEE's Leading Society in Data and AI"
 *   4. CTA 버튼    — "지금 지원하기" → /recruiting
 *   5. 스크롤 인디케이터 (하단 중앙 고정)
 *   6. 하단 페이드 오버레이 — 다음 섹션과의 경계를 자연스럽게 흐려줌 (z-20)
 *
 * ── 반응형 레이아웃 ──────────────────────────────────────────────────────────
 *   모바일:      콘텐츠 중앙 정렬, 태그라인은 로고 아래에 표시
 *   데스크톱(md+): 콘텐츠 좌측 정렬, 태그라인은 로고 위에 표시
 *
 * ── z-index 레이어 구조 ──────────────────────────────────────────────────────
 *   z-0  : Grainient 배경
 *   z-10 : 메인 콘텐츠 (로고, 버튼, 태그라인, 스크롤 인디케이터)
 *   z-20 : 하단 페이드 오버레이 (콘텐츠 위에 살짝 덮음)
 */

import Grainient from "./Grainient";
import KhudaLogo from "./KhudaLogo";
import { Link } from "react-router-dom";
import { ROUTES } from "@/lib/constants";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── 1. Grainient 배경 (z-0) ──────────────────────────────────────────
          absolute + inset-0으로 섹션 전체를 덮음
          파라미터 튜닝은 Grainient.jsx 상단 주석 참고                        */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Grainient
          color1="#e1dbdb"
          color2="#4079c4"
          color3="#bb5d5d"
          timeSpeed={0}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.2}
          rotationAmount={500}
          noiseScale={1}
          grainAmount={0.08}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1.5}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.7}
          className="w-full h-full"
        />
      </div>

      {/* ── 2. 메인 콘텐츠 영역 (z-10) ──────────────────────────────────────
          pt-*: 헤더 높이만큼 상단 여백 (헤더가 fixed이므로 콘텐츠가 가려지지 않게)
          flex-1: 남은 세로 공간을 채워 스크롤 인디케이터가 항상 하단 근처에 위치 */}
      <div className="relative z-10 flex-1 flex flex-col px-6 sm:px-8 md:px-16 lg:px-24 pt-32 sm:pt-40 md:pt-48 lg:pt-56 pb-8 sm:pb-12 md:pb-16 lg:pb-20">

        {/* 콘텐츠 수직 중앙 정렬 컨테이너
            모바일: flex-col + justify-center (세로 중앙)
            데스크톱: flex-row + justify-start (좌측 정렬)             */}
        <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start px-0 md:py-0 gap-0">

          {/* 태그라인 + 로고 + CTA 버튼 묶음
              gap-3 md:gap-5: 세 요소 사이 간격을 균일하게 유지           */}
          <div className="flex flex-col items-center md:items-start gap-6 md:gap-8 flex-shrink-0">

            {/* 태그라인 — 데스크톱에서만 로고 위에 표시 (모바일은 아래 별도 처리) */}
            <p
              className="hidden md:block text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.2em] uppercase opacity-0 animate-fade-up animation-delay-200 text-left"
              style={{ color: "#1a1a2e" }}
            >
              KYUNGHEE&apos;s Leading Society in Data and AI
            </p>

            {/* KHUDA 워드마크
                h1: 스크린 리더·검색 엔진에 "KHUDA" 텍스트로 인식됨 (SEO·접근성)
                    KhudaLogo SVG 자체는 aria-hidden이므로 이 aria-label이 대체 텍스트 역할
                width clamp: 모바일 최소(10rem) ~ 뷰포트 비례(33vw) ~ 데스크톱 최대(22rem)
                             SVG의 viewBox가 이미 여백 없이 크롭돼 있어 별도 마진 조정 불필요 */}
            <h1
              aria-label="KHUDA"
              className="select-none opacity-0 animate-fade-up animation-delay-300"
              style={{ width: "clamp(10rem, 33vw, 22rem)" }}
            >
              <KhudaLogo className="w-full h-auto" />
            </h1>

            {/* CTA 버튼 — 리쿠르팅 페이지로 이동
                hover 시 배경/텍스트 색 반전, active 시 살짝 축소             */}
            <Link
              to={ROUTES.recruiting}
              className="group inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 md:px-7 md:py-3 border border-[#0f172a] text-[#0f172a] font-semibold text-xs sm:text-sm md:text-base rounded-full hover:bg-[#0f172a] hover:text-white transition-all duration-300 active:scale-[0.97] opacity-0 animate-fade-up animation-delay-400"
            >
              지금 지원하기
              {/* 화살표 아이콘 — hover 시 오른쪽으로 살짝 이동 */}
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 태그라인 — 모바일 전용 (로고 아래에 표시)
            데스크톱은 위의 "hidden md:block" 태그라인이 담당                 */}
        <div className="relative z-10 px-0 pb-20 sm:pb-24 md:hidden">
          <p
            className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase opacity-0 animate-fade-up animation-delay-500 text-center"
            style={{ color: "#1a1a2e" }}
          >
            KYUNGHEE&apos;s Leading Society in Data and AI
          </p>
        </div>

      </div>

      {/* ── 3. 스크롤 인디케이터 (z-10) ─────────────────────────────────────
          absolute로 섹션 하단 중앙에 고정
          animation-delay-600: 다른 요소들이 먼저 등장한 뒤 마지막으로 나타남  */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 z-10 opacity-0 animate-fade-in animation-delay-600">
        <span
          className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase"
          style={{ color: "#000000" }}
        >
          Scroll
        </span>
        {/* 수직 라인 — 위(검정)에서 아래(투명)로 페이드아웃 */}
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-black to-transparent" />
      </div>

      {/* ── 4. 하단 페이드 오버레이 (z-20) ──────────────────────────────────
          다음 섹션과의 경계를 배경색(background)으로 자연스럽게 흐려줌
          pointer-events-none: 클릭·호버 이벤트가 이 레이어를 통과해 아래 요소에 전달됨 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none z-20" />

    </section>
  );
};

export default HeroSection;
