// 백엔드 API 클라이언트. JWT를 Bearer로 붙이고 ApiResponse 래퍼의 data를 언랩한다.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.khuda.kro.kr";
const TOKEN_KEY = "khuda-admin-token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// 401(세션 만료 등)일 때 호출할 핸들러. AuthProvider가 로그아웃으로 등록한다.
let onUnauthorized: (() => void) | null = null;
export function setUnauthorizedHandler(fn: () => void): void {
  onUnauthorized = fn;
}

export class ApiError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers ?? {}),
    },
  });

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    // 응답 본문이 없을 수 있다.
  }

  if (!res.ok) {
    if (res.status === 401 && onUnauthorized) onUnauthorized();
    const message =
      (body as { message?: string } | null)?.message ?? `요청에 실패했습니다. (${res.status})`;
    const code = (body as { code?: string } | null)?.code;
    throw new ApiError(message, res.status, code);
  }

  // ApiResponse 래퍼에서 data만 꺼낸다.
  if (body && typeof body === "object" && "data" in body) {
    return (body as { data: T }).data;
  }
  return body as T;
}

export const apiGet = <T>(path: string) => request<T>(path, { method: "GET" });
export const apiPost = <T>(path: string, json: unknown) =>
  request<T>(path, { method: "POST", body: JSON.stringify(json) });
export const apiPatch = <T>(path: string, json: unknown) =>
  request<T>(path, { method: "PATCH", body: JSON.stringify(json) });
