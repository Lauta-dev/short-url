import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App.tsx";
import "./index.css";
import LoginForm from "./components/me/LoginForm.tsx";
import { Layout } from "./layout.tsx";
import { ThemeProvider } from "@/components/ui/theme-provider";
import RegistrationForm from "./components/me/Register.tsx";

createRoot(document.getElementById("root")!).render(
	<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
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
			</Routes>
		</BrowserRouter>
	</ThemeProvider>,
);
