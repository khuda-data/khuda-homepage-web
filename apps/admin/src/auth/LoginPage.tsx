import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "./AuthContext";
import { ApiError } from "@/lib/apiClient";
import Grainient from "@/components/Grainient";
import KhudaLogo from "@/components/KhudaLogo";

const GRAINIENT_PROPS = {
  color1: "#e1dbdb",
  color2: "#4079c4",
  color3: "#bb5d5d",
  timeSpeed: 0,
  colorBalance: 0,
  warpStrength: 1,
  warpFrequency: 5,
  warpSpeed: 2,
  warpAmplitude: 50,
  blendAngle: 0,
  blendSoftness: 0.2,
  rotationAmount: 500,
  noiseScale: 1,
  grainAmount: 0.08,
  grainScale: 2,
  grainAnimated: false,
  contrast: 1.5,
  gamma: 1.5,
  saturation: 1,
  centerX: 0,
  centerY: 0,
  zoom: 0.7,
};

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
      {/* 데스크톱 좌측 브랜드 패널 */}
      <div className="relative hidden w-1/2 overflow-hidden md:flex lg:w-3/5">
        <div className="absolute inset-0 z-0">
          <Grainient {...GRAINIENT_PROPS} className="h-full w-full" />
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

      {/* 우측 폼 패널 (모바일에선 배경 전체에 Grainient) */}
      <div className="relative flex w-full flex-col justify-center px-6 py-12 md:w-1/2 md:bg-background lg:w-2/5">
        {/* 모바일 배경 */}
        <div className="absolute inset-0 z-0 md:hidden">
          <Grainient {...GRAINIENT_PROPS} className="h-full w-full" />
          <div className="absolute inset-0 bg-white/25" />
        </div>

        {/* 폼 카드 (모바일: 흰 카드, 데스크톱: 배경에 그대로). 좌측 정렬. */}
        <div className="relative z-10 mx-auto w-full max-w-sm animate-fade-up rounded-3xl bg-white/95 p-6 shadow-xl backdrop-blur-sm sm:p-8 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
          <KhudaLogo className="h-auto w-24 md:hidden" />
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-[#191f28] md:mt-0 md:text-3xl">
            로그인
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#4e5968] md:text-[15px]">
            KHUDA 운영진분들의 개별 이메일로 로그인해주세요. 쿠다 공식 구글 계정으로도 가능해요.
          </p>

          <div className="mt-8 md:mt-10">
            {/* 모바일 버튼 */}
            <div className="md:hidden">
              <GoogleLogin
                onSuccess={(res) => handleCredential(res.credential)}
                onError={() => setError("구글 로그인에 실패했습니다. 다시 시도해주세요.")}
                width="300"
                text="signin_with"
                shape="pill"
              />
            </div>
            {/* 데스크톱 버튼 (조금 더 길게) */}
            <div className="hidden md:block">
              <GoogleLogin
                onSuccess={(res) => handleCredential(res.credential)}
                onError={() => setError("구글 로그인에 실패했습니다. 다시 시도해주세요.")}
                width="380"
                text="signin_with"
                shape="pill"
              />
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-[#f04452]">{error}</p>}
        </div>
      </div>
    </div>
  );
};
