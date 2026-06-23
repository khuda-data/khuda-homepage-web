import { NavLink, Outlet } from "react-router-dom";
import { FileText, LogOut } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/applications", label: "지원서", icon: FileText },
];

export const AppLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* 좌측 사이드바 */}
      <aside className="hidden w-56 flex-shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex h-14 items-center gap-2 px-5">
          <img
            src="/images/logos/khuda-icon.png"
            alt="KHUDA"
            className="h-6 w-6"
          />
          <span className="text-sm font-semibold text-white">운영진</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* 본문 영역 */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* 상단바 */}
        <header className="flex h-14 items-center justify-end gap-4 border-b border-border bg-background px-6">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <LogOut className="size-4" />
            로그아웃
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
