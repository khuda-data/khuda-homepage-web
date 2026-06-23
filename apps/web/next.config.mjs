/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 마이그레이션 단계에서는 ESLint로 빌드를 막지 않는다. 후속 단계에서 lint 정비.
  eslint: { ignoreDuringBuilds: true },
  // 기존 Vite(SWC) 빌드는 타입체크를 하지 않아 잠재 타입 에러가 빌드를 막지 않았다.
  // 동일 동작 유지를 위해 마이그레이션 단계에서는 타입 에러로 빌드를 막지 않는다.
  // (잠재 타입 에러 정리는 후속 작업으로 분리)
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
