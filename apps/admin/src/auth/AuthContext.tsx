import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// 인증은 백엔드(구글 OAuth, 단일 공식 계정 검증)가 담당한다.
// 백엔드가 준비되기 전까지는 로컬 mock 게이트로 보호 라우트 흐름만 구현한다.
// 백엔드 연동 시 login/logout/세션 확인 부분만 실제 API로 교체하면 된다.

interface AdminUser {
  email: string;
  name: string;
}

interface AuthContextValue {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const STORAGE_KEY = "khuda-admin-auth";

// 백엔드 연동 전까지 사용할 mock 공식 계정
const MOCK_USER: AdminUser = {
  email: "khuda.official@gmail.com",
  name: "KHUDA 운영진",
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 새로고침 후에도 로그인 상태 유지 (mock: localStorage)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // 무시
    }
    setIsLoading(false);
  }, []);

  const login = async () => {
    // TODO: 백엔드 구글 OAuth 플로우로 교체
    setUser(MOCK_USER);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USER));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
