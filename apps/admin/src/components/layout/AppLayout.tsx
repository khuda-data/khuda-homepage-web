import { Outlet } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";

export const AppLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-muted">
      {/* 상단바 */}
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background px-6">
        <div className="flex items-center gap-2">
          <img src="/images/logos/khuda-icon.png" alt="KHUDA" className="h-7 w-7" />
          <span className="text-base font-bold">KHUDA 리크루팅</span>
        </div>
        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="size-4" />
          로그아웃
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
