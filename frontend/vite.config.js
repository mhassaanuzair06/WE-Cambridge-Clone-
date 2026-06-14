import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendTarget = env.VITE_BACKEND_URL || "http://127.0.0.1:3000";

  return defineConfig({
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        "/api": backendTarget
      }
    }
  });
};
