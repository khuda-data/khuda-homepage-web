import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { apiPost, clearToken, setToken, setUnauthorizedHandler } from "@/lib/apiClient";

interface AdminUser {
  email: string;
  name: string | null;
}

interface AuthContextValue {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => void;
}

const USER_KEY = "khuda-admin-user";

interface LoginResponse {
  access_token: string;
  admin: { email: string; name: string | null };
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    clearToken();
    localStorage.removeItem(USER_KEY);
  }, []);

  useEffect(() => {
    // 401(세션 만료)이면 자동 로그아웃한다.
    setUnauthorizedHandler(logout);
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // 손상된 값은 무시
    }
    setIsLoading(false);
  }, [logout]);

  const loginWithGoogle = async (idToken: string) => {
    const data = await apiPost<LoginResponse>("/api/admin/auth/google", { id_token: idToken });
    setToken(data.access_token);
    const nextUser = { email: data.admin.email, name: data.admin.name };
    setUser(nextUser);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
