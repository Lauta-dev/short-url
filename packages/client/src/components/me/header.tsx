import { Github, Linkedin, Link } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

function Header() {
	const links = [
		{
			site: "GitHub",
			link: "https://github.com/lauta-dev/",
			component: <Github />,
		},
		{ site: "aedin", link: "#", component: <Linkedin /> },
	];

	return (
		<header className="flex items-center justify-between py-6">
			<h1 className="text-xl font-bold flex items-center gap-4">
				<Link />
				URL Shortener
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
				<ModeToggle />
			</div>
		</header>
	);
}

export default Header;
