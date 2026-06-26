import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_REVEAL_OPTIONS, ROUTES } from "@/lib/constants";
import type { IndexTrackInfo } from "@/lib/constants";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TrackShowcaseProps {
  tracks: IndexTrackInfo[];
}

const LONG_PRESS_MS = 600;

const TrackShowcase = ({ tracks }: TrackShowcaseProps) => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);
  const [pressingId, setPressingId] = useState<string | null>(null);
  const router = useRouter();

  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);
  const isTouchAction = useRef(false);
  const touchStartPos = useRef({ x: 0, y: 0 });

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setPressingId(null);
  };

  // 해당 트랙의 프로젝트만 필터링된 프로젝트 페이지로 이동
  const goToTrackProjects = (track: IndexTrackInfo) => {
    router.push(`${ROUTES.projects}?track=${encodeURIComponent(track.projectTrack)}`);
  };

  // 모바일: 꾹 누르면(롱프레스) 해당 트랙 프로젝트로 이동하는 인터랙션
  const handlePointerDown = (e: React.PointerEvent, track: IndexTrackInfo) => {
    if (e.pointerType === "mouse") return;
    isTouchAction.current = true;
    isLongPress.current = false;
    touchStartPos.current = { x: e.clientX, y: e.clientY };
    setPressingId(track.id);

    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setPressingId(null);
      goToTrackProjects(track);
    }, LONG_PRESS_MS);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" || !longPressTimer.current) return;
    const dx = Math.abs(e.clientX - touchStartPos.current.x);
    const dy = Math.abs(e.clientY - touchStartPos.current.y);
    if (dx > 10 || dy > 10) cancelLongPress();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    cancelLongPress();
  };

  const handlePointerCancel = () => cancelLongPress();

  // 데스크톱: 카드 클릭 시 해당 트랙 프로젝트로 이동 (모바일 탭은 롱프레스로만 이동)
  const handleCardClick = (track: IndexTrackInfo) => {
    if (isTouchAction.current) {
      isTouchAction.current = false;
      return;
    }
    goToTrackProjects(track);
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
                <span className="text-blue-600">KHUDA</span>
              </h2>
              <Link
                href={ROUTES.projects}
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
            href={ROUTES.projects}
            className="hidden sm:flex flex-shrink-0 w-12 sm:w-12 md:w-14 md:h-14 rounded-full border-2 border-gray-300 items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 group mt-3 self-start"
          >
            <ArrowRight className="w-6 sm:w-6 text-gray-900 group-hover:text-white transition-colors duration-300" />
          </Link>
        </div>
      </div>

      {/* 트랙 카드 그리드 (설명 상시 노출 / 데스크톱 hover 시 자세히 보기 화살표) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className={cn(
              "group relative flex flex-col h-full min-h-[180px] sm:min-h-[205px] md:min-h-[230px] rounded-2xl p-3.5 sm:p-4 md:p-5 bg-white border border-gray-100 text-gray-900 cursor-pointer select-none overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-[0_14px_32px_rgba(0,0,0,0.14)] active:scale-[0.97] active:shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
              pressingId === track.id && "scale-[0.97] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            )}
            onPointerDown={(e) => handlePointerDown(e, track)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onContextMenu={(e) => e.preventDefault()}
            onClick={() => handleCardClick(track)}
          >
            {/* 파이프라인 단계 */}
            <span className="self-start px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-blue-50 text-[10px] sm:text-xs font-semibold text-blue-600">
              {track.stage}
            </span>

            <div className="mt-2.5 sm:mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
              <h3 className="text-sm sm:text-base md:text-lg font-bold leading-tight break-keep">
                {track.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="hidden sm:block h-3.5 w-px bg-gray-300" />
                <span className="text-[10px] sm:text-[11px] font-medium text-gray-500">{track.label}</span>
              </div>
            </div>

            <p className="mt-3 sm:mt-4 flex-1 text-[13px] sm:text-sm md:text-base leading-relaxed text-gray-700">
              {track.description}
            </p>

            {/* 자세히 보기 화살표: 모바일은 상시 표시, 데스크톱은 hover 시 등장 */}
            <div className="flex justify-end">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30 transition-all duration-200 opacity-100 md:opacity-0 md:translate-y-1 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackShowcase;
