import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";

export const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/applications" replace />;
  }

  const handleLogin = async () => {
    await login();
    navigate("/applications", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-xs">
        <div className="mb-10 flex flex-col items-center text-center">
          <img src="/images/logos/khuda-icon.png" alt="KHUDA" className="h-14 w-14" />
          <h1 className="mt-5 text-2xl font-bold tracking-tight">KHUDA 리크루팅</h1>
          <p className="mt-2 text-[15px] text-muted-foreground">운영진 전용 페이지입니다</p>
        </div>

        <Button onClick={handleLogin} variant="outline" size="lg" className="w-full gap-2.5">
          {/* 구글 로고 */}
          <svg className="size-5" viewBox="0 0 24 24" aria-hidden>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
            <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
          </svg>
          Google로 로그인
        </Button>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          KHUDA 공식 구글 계정으로만 로그인할 수 있습니다.
        </p>
      </div>
    </div>
  );
};
