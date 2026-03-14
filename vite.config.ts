import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://3.38.172.201:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    // public/ 이미지 빌드 시 압축 (JPEG 85, PNG 90)
    ViteImageOptimizer({
      includePublic: true,
      logStats: true,
      jpeg: { quality: 85 },
      jpg: { quality: 85 },
      png: { quality: 90 },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React 코어 — 불변에 가까우므로 장기 캐시 효율 극대화
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // 데이터 패칭 레이어
          "vendor-query": ["@tanstack/react-query"],
          // 애니메이션 — Recruiting/Index에서만 사용
          "vendor-motion": ["motion"],
          // Radix UI 컴포넌트 묶음
          "vendor-radix": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-label",
            "@radix-ui/react-select",
            "@radix-ui/react-slot",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
          ],
        },
      },
    },
  },
});
