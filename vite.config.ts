import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    // Cloudflare plugin is for production build only — including it during
    // `vite dev` creates a Worker environment that breaks esbuild pre-bundling
    // of TanStack Start's virtual modules (#tanstack-router-entry etc.)
    command === "build" ? cloudflare() : null,
  ],
}));
