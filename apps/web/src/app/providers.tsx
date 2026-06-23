"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { trackPageView } from "@/utils/analytics";

// 라우트 전환 시 스크롤 상단 이동 + 페이지뷰 추적 (기존 ScrollToTop + PageTracker 통합)
const RouteEffects = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    trackPageView(pathname);
  }, [pathname]);

  return null;
};

export const Providers = ({ children }: { children: ReactNode }) => {
  // QueryClient는 클라이언트당 1회만 생성 (App Router 권장 패턴)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouteEffects />
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
};
