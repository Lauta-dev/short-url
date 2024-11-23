import MenuMobile from "@/components/me/menuMobile";

function Header() {
	const links = [
		{ site: "GitHub", link: "https://github.com/lauta-dev/" },
		{ site: "Linkedin", link: "#" },
	];

	return (
		<header className="pb-4 pt-4 flex justify-between items-center">
			<h2>Acortador de URL</h2>
			<nav className="flex justify-between items-center max-[425px]:hidden md:block">
				<ul className="flex gap-4">
					{links.map((data) => (
						<li key={data.site}>
							<a href={data.link}>{data.site}</a>
						</li>
					))}
				</ul>
			</nav>
			<MenuMobile divClassName={"flex md:hidden"} />
		</header>
	);
}

export default Header;
