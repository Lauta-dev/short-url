import { Github, Linkedin, Link } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { NavLink } from "react-router";
import { m } from "node_modules/react-router/dist/development/fog-of-war-BhhVTjSZ.d.mts";
import { Button } from "../ui/button";

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
			text: "Login",
		},
		{
			to: "/register",
			text: "sign Up",
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
				{login.map(({ text, to }) => (
					<Button variant="ghost">
						<NavLink key={text} to={to} className="">
							{text}
						</NavLink>
					</Button>
				))}
				<ModeToggle />
			</div>
		</header>
	);
}

export default Header;
