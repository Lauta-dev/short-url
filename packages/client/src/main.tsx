import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App.tsx";
import "./index.css";
import LoginForm from "./components/me/LoginForm.tsx";
import { Layout } from "./layout.tsx";
import { ThemeProvider } from "@/components/ui/theme-provider";
import RegistrationForm from "./components/me/Register.tsx";
import UrlManager from "@/components/me/m.tsx";

createRoot(document.getElementById("root")!).render(
	<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Layout>
							<App />
						</Layout>
					}
				/>
				<Route
					path="login"
					element={
						<Layout className="flex justify-center">
							<LoginForm />
						</Layout>
					}
				/>
				<Route
					path="register"
					element={
						<Layout className="flex justify-center">
							<RegistrationForm />
						</Layout>
					}
				/>
				<Route
					path="/urls"
					element={
						<Layout>
							<UrlManager />
						</Layout>
					}
				/>
			</Routes>
		</BrowserRouter>
	</ThemeProvider>,
);
