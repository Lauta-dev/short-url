import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
	MenubarSeparator,
} from "@/components/ui/menubar";

function MenuMobile({ divClassName }: {divClassName: string}) {
	return (
		<div className={divClassName}>
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>Menú</MenubarTrigger>
					<MenubarContent>
						<a target="_blank" href="https://github.com/lauta-dev">
							<MenubarItem>GitHub</MenubarItem>
						</a>
						<MenubarSeparator />

						<a
							target="_blank"
							href="https://www.linkedin.com/in/ruben-lautaro-alonso-diaz/"
						>
							<MenubarItem>Linkedin</MenubarItem>
						</a>
						<MenubarSeparator />

						<a target="_blank" href="https://lauta-dev.github.io/portafolio/">
							<MenubarItem>Portafolio</MenubarItem>
						</a>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
}

export default MenuMobile;
