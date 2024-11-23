import { Button } from "@/components/ui/button";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
function Terms() {
	return (
		<ul>
			<li>No se guardará ningún dato personal</li>
			<li>Se utilizará el servicio de URL corta por usted solamente</li>
			<li>El servicio de URL corta no es una empresa ni una organización</li>
			<li>
				El servicio de URL corta no tiene ninguna relación con la empresa o
				organización que lo utiliza
			</li>
			<li>El servicio no se debe utilizar para fines ilícitos</li>
		</ul>
	);
}

function Footer() {
	return (
		<footer className="fixed left-0 bottom-0 w-full">
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="link">Términos y condiciones</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Términos y condiciones</DialogTitle>
						<DialogDescription>
							<Terms />
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</footer>
	);
}

export default Footer;
