import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// This must match your GitHub repo name exactly, including case, since
// GitHub Pages serves project sites from https://<user>.github.io/<repo>/
export default defineConfig({
  plugins: [react()],
  base: "/Your-Local-Partners/",
});
