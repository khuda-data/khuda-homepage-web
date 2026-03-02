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
});
