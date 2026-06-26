import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "./AuthContext";
import { ApiError } from "@/lib/apiClient";
import Grainient from "@/components/Grainient";
import KhudaLogo from "@/components/KhudaLogo";

export const LoginPage = () => {
  const { loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    return <Navigate to="/applications" replace />;
  }

  const handleCredential = async (idToken: string | undefined) => {
    if (!idToken) {
      setError("구글 로그인에 실패했습니다. 다시 시도해주세요.");
      return;
    }
    setError(null);
    try {
      await loginWithGoogle(idToken);
      navigate("/applications", { replace: true });
    } catch (e) {
      if (e instanceof ApiError && e.status === 403) {
        setError("운영진 계정만 로그인할 수 있습니다.");
      } else {
        setError(e instanceof Error ? e.message : "로그인 중 오류가 발생했습니다.");
      }
    }
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

          <div className="mt-10 flex justify-center">
            <GoogleLogin
              onSuccess={(res) => handleCredential(res.credential)}
              onError={() => setError("구글 로그인에 실패했습니다. 다시 시도해주세요.")}
              width="320"
              text="signin_with"
              shape="pill"
            />
          </div>

          {error && (
            <p className="mt-4 text-center text-sm text-[#f04452]">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};
