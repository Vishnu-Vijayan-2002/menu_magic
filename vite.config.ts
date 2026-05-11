import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

// Deployment target: "cloudflare" | "vercel" (default)
// Set DEPLOY_TARGET=cloudflare in env to build for Cloudflare Workers.
const deployTarget = process.env.DEPLOY_TARGET ?? "vercel";

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    // Cloudflare plugin: only for Cloudflare builds, never during dev
    command === "build" && deployTarget === "cloudflare" ? cloudflare() : null,
  ],
}));
