import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BookmarkPlus } from "lucide-react";
import { NavLink } from "react-router";

export default function NoSavedURLs() {
	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-center">No tienes URLs guardadas</CardTitle>
				<CardDescription className="text-center">
					Comienza a guardar tus enlaces favoritos para acceder rápidamente a
					ellos.
				</CardDescription>
			</CardHeader>
			<CardContent className="flex justify-center">
				<BookmarkPlus className="h-24 w-24 text-gray-300" />
			</CardContent>
			<CardFooter className="flex justify-center">
				<Button asChild>
					<NavLink to="/">Agregar nueva URL</NavLink>
				</Button>
			</CardFooter>
		</Card>
	);
}
