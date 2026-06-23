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
  const [flippedId, setFlippedId] = useState<string | null>(null);
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

  const handlePointerEnter = (e: React.PointerEvent, id: string) => {
    if (e.pointerType === "mouse") setFlippedId(id);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setFlippedId(null);
  };

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    if (e.pointerType === "mouse") return;
    isTouchAction.current = true;
    isLongPress.current = false;
    touchStartPos.current = { x: e.clientX, y: e.clientY };
    setPressingId(id);

    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setPressingId(null);
      router.push(ROUTES.activities);
    }, LONG_PRESS_MS);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" || !longPressTimer.current) return;
    const dx = Math.abs(e.clientX - touchStartPos.current.x);
    const dy = Math.abs(e.clientY - touchStartPos.current.y);
    if (dx > 10 || dy > 10) cancelLongPress();
  };

  const handlePointerUp = (e: React.PointerEvent, id: string) => {
    if (e.pointerType === "mouse") return;
    cancelLongPress();
    if (!isLongPress.current) {
      setFlippedId((prev) => (prev === id ? null : id));
    }
  };

  const handlePointerCancel = () => cancelLongPress();

  const handleCardClick = () => {
    if (isTouchAction.current) {
      isTouchAction.current = false;
      return;
    }
    router.push(ROUTES.activities);
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
                href={ROUTES.activities}
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
            href={ROUTES.activities}
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
              className={cn(
                "h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] cursor-pointer select-none transition-all duration-150",
                pressingId === track.id && "ring-2 ring-blue-500 ring-offset-2 rounded-xl sm:rounded-2xl"
              )}
              style={{ perspective: "800px" }}
              onPointerEnter={(e) => handlePointerEnter(e, track.id)}
              onPointerLeave={handlePointerLeave}
              onPointerDown={(e) => handlePointerDown(e, track.id)}
              onPointerMove={handlePointerMove}
              onPointerUp={(e) => handlePointerUp(e, track.id)}
              onPointerCancel={handlePointerCancel}
              onContextMenu={(e) => e.preventDefault()}
              onClick={handleCardClick}
            >
              <div
                className={cn(
                  "relative w-full h-full transition-transform duration-500 ease-in-out [transform-style:preserve-3d]",
                  isFlipped && "[transform:rotateY(180deg)]"
                )}
              >
                {/* 앞면 */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between [backface-visibility:hidden] bg-blue-200/70 text-gray-900 overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                      {track.label}
                    </h3>
                    <p className="text-[11px] sm:text-xs mt-0.5 sm:mt-1 text-gray-600">
                      {track.title}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold">
                      자세히 보기
                    </span>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-900/20 flex items-center justify-center">
                      <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-900" />
                    </div>
                  </div>
                </div>

                {/* 뒷면 */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] bg-blue-200/70 text-gray-900 overflow-hidden">
                  <div className="min-h-0 overflow-hidden">
                    <h3 className="text-xs sm:text-base font-bold mb-1 sm:mb-2">
                      {track.label}
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed line-clamp-3 sm:line-clamp-5 text-gray-700">
                      {track.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1.5 sm:mt-2 flex-shrink-0">
                    {track.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium bg-gray-900/20 text-gray-700"
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
