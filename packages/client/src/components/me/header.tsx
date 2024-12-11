import MenuMobile from "@/components/me/menuMobile";
import { Github, Linkedin, Link } from "lucide-react";

function Header() {
	const links = [
		{ site: "GitHub", link: "https://github.com/lauta-dev/" },
		{ site: "aedin", link: "#" },
	];

	return (
		<header className="flex items-center justify-between py-6">
			<h1 className="text-xl font-bold flex items-center gap-4">
				<Link />
				URL Shortener
			</h1>
			<div className="flex items-center gap-4">
				<a
					href="https://github.com"
					className="text-muted-foreground hover:text-primary"
				>
					<Github className="h-5 w-5" />
					<span className="sr-only">GitHub</span>
				</a>
				<a
					href="https://linkedin.com"
					className="text-muted-foreground hover:text-primary"
				>
					<Linkedin className="h-5 w-5" />
					<span className="sr-only">aedIn</span>
				</a>
			</div>
		</header>
	);
}

export default Header;
