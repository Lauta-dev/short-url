import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router";

export default function Unauthorized() {
	return (
		<div className="flex items-center justify-center ">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Acceso No Autorizado</CardTitle>
					<CardDescription>
						No tienes permiso para acceder a esta página.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-gray-600">
						Por favor, inicia sesión con una cuenta que tenga los permisos
						necesarios o contacta al administrador si crees que esto es un
						error.
					</p>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline" asChild>
						<NavLink to="/">Volver al Inicio</NavLink>
					</Button>
					<Button asChild>
						<NavLink to="/login">Iniciar Sesión</NavLink>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
