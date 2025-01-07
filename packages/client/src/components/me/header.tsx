import { Github, Linkedin, Link } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/getSetLocalStorage";

function Header() {
	const links = [
		{
			site: "GitHub",
			link: "https://github.com/lauta-dev/",
			component: <Github />,
		},
		{ site: "aedin", link: "#", component: <Linkedin /> },
	];

	const login = [
		{
			to: "/login",
			text: "Iniciar sesión",
		},
		{
			to: "/register",
			text: "Crear cuenta",
		},
	];

	return (
		<header className="flex items-center justify-between py-6">
			<h1 className="text-xl font-bold flex items-center gap-4">
				<Link />
				<NavLink to="/">URL Shortener</NavLink>
			</h1>
			<div className="flex items-center gap-4">
				{links.map((link) => (
					<a
						key={link.site}
						href={link.link}
						className="text-muted-foreground hover:text-primary"
					>
						{link.component}
						<span className="sr-only">{link.site}</span>
					</a>
				))}
				{getToken() ? (
					<NavLink to="/urls">
						<Button variant="ghost">Ver todas las URLS</Button>
					</NavLink>
				) : (
					login.map(({ text, to }) => (
						<NavLink key={text} to={to}>
							<Button variant="ghost">{text}</Button>
						</NavLink>
					))
				)}
				<ModeToggle />
			</div>
		</header>
	);
}

export default Header;
