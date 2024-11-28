import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 8080,
		proxy: {
			"/api": {
				target: "https://short-url-server.vercel.app/api",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, "api"),
			},
		},
	},
});
