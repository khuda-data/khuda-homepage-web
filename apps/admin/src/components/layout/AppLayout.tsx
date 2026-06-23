import { Outlet, useNavigate, useMatch } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";

export const AppLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  // 지원서 상세 화면일 때만 헤더를 "뒤로 가기"로 전환
  const isDetail = useMatch("/applications/:id");

  return (
    <div className="min-h-screen bg-muted">
      {/* 상단바: 목록에서는 브랜드, 상세에서는 뒤로 가기 */}
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background px-4 sm:px-6">
        {isDetail ? (
          <button
            onClick={() => navigate("/applications")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            뒤로 가기
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <img src="/images/logos/khuda-icon.png" alt="KHUDA" className="h-7 w-7" />
            <span className="text-base font-bold">KHUDA 리크루팅</span>
          </div>
        )}
        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="size-4" />
          로그아웃
        </button>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
};
