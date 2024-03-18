import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createStyleImportPlugin } from "vite-plugin-style-import";
import path from "path";
const __dirname = path.resolve();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: "zarm",
          esModule: true,
          resolveStyle: (name) => {
            return `zarm/es/${name}/style/css`;
          },
        },
      ],
    }),
  ],
  css: {
    modules: {
      localsConvention: "dashesOnly",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 将 /api 重写为空
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // src 路径
      utils: path.resolve(__dirname, "src/utils"), // src 路径
    },
  },
});
