import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import Grainient from "@/components/Grainient";
import KhudaLogo from "@/components/KhudaLogo";

// 구글 로고
const GoogleIcon = () => (
  <svg className="size-5" viewBox="0 0 24 24" aria-hidden>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
  </svg>
);

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
    <div className="flex min-h-screen">
      {/* 좌측 브랜드 패널: 공식 홈페이지와 동일한 Grainient 배경 (데스크톱) */}
      <div className="relative hidden w-1/2 overflow-hidden md:flex lg:w-3/5">
        <div className="absolute inset-0 z-0">
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
            className="h-full w-full"
          />
        </div>
        <div className="relative z-10 flex animate-fade-in flex-col justify-center p-12 lg:p-16">
          <div className="flex items-center gap-3 lg:gap-4">
            <KhudaLogo className="h-auto w-44 lg:w-56" />
            <span className="font-display text-4xl font-semibold tracking-tight text-[#191f28] lg:text-5xl">
              Recruiting
            </span>
          </div>
        </div>
      </div>

      {/* 우측 로그인 폼 */}
      <div className="flex w-full flex-col justify-center bg-background px-6 py-12 md:w-1/2 lg:w-2/5">
        <div className="mx-auto w-full max-w-sm animate-fade-up">
          <KhudaLogo className="h-auto w-28 md:hidden" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#191f28] md:mt-0">
            로그인
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#4e5968]">
            쿠다 공식 구글 계정으로 로그인하세요.
          </p>

          <Button
            onClick={handleLogin}
            variant="outline"
            size="lg"
            className="mt-10 h-14 w-full gap-3 rounded-2xl border-[#e5e8eb] text-[15px] font-semibold shadow-sm transition-all hover:bg-[#f2f4f6] active:scale-[0.99]"
          >
            <GoogleIcon />
            Google로 로그인
          </Button>
        </div>
      </div>
    </div>
  );
};
