import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const cwd = process.cwd();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const env = { ...loadEnv(mode, cwd, "VITE_") };

  // reusable config for both server and preview
  const serverConfig = {
    open: true,
    host: true,
    port: Number(env.VITE_PORT || 3000),
    strictPort: true,
  };

  return {
    plugins: [react()],
    preview: serverConfig,
    server: serverConfig,

    resolve: {
      alias: {
        "@": `${cwd}/src`,
      },
    },
  };
});
