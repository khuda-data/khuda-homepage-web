import Link from "next/link";
import { ROUTES } from "@/lib/constants";

const NOT_FOUND_CONFIG = {
  code: "404",
  title: "찾을 수 없는 페이지예요",
  message: "페이지가 사라졌거나 주소가 바뀌었어요.\n아래 버튼으로 다시 이동해 주세요.",
  primary: { label: "홈으로 가기", href: ROUTES.home },
} as const;

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-24">
      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center text-center">
        {/* 404 숫자 */}
        <p className="animate-fade-up bg-gradient-to-b from-[#3182F6] to-[#3182F6]/40 bg-clip-text text-[7rem] font-extrabold leading-none tracking-tight text-transparent opacity-0 sm:text-[9rem]">
          {NOT_FOUND_CONFIG.code}
        </p>

        <h1 className="animate-fade-up animation-delay-200 mt-4 text-2xl font-bold tracking-tight text-[#191F28] opacity-0 sm:text-[28px]">
          {NOT_FOUND_CONFIG.title}
        </h1>

        <p className="animate-fade-up animation-delay-300 mt-3 whitespace-pre-line text-[15px] leading-relaxed text-[#8B95A1] opacity-0">
          {NOT_FOUND_CONFIG.message}
        </p>

        <div className="animate-fade-up animation-delay-400 mt-10 w-full opacity-0">
          <Link
            href={NOT_FOUND_CONFIG.primary.href}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#191F28] text-base font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.16)] transition-all duration-200 hover:brightness-125 active:scale-[0.97]"
          >
            {NOT_FOUND_CONFIG.primary.label}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
