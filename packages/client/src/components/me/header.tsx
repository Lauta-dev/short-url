function Header() {
	// TODO: Sacar a un archivo aparte
	const links = [
		{ site: "GitHub", link: "https://lauta-dev/" },
		{ site: "Linkedin", link: "#" },
	];

	return (
		<header className="pb-4 pt-4">
			<nav className="flex justify-between items-center">
				<h2>Acortador de URL</h2>
				<ul className="flex gap-4">
					{links.map((data) => (
						<li key={data.site}>
							<a href={data.link}>{data.site}</a>
						</li>
					))}

					{/*TODO: Hacer una modal*/}
				</ul>
			</nav>
		</header>
	);
}

export default Header;
