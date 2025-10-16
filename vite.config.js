import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: [
      "all",
      "b22334c3-c443-4b27-b3aa-45f0fb2d3d2d-00-pwhm71zd6o4t.spock.replit.dev",
    ],
    strictPort: true,
  },
});
