import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
	title?: string;
	description?: string;
	error?: Error;
	reset?: () => void;
}

export default function ErrorDisplay({
	title = "Error al cargar datos",
	description = "Lo sentimos, ha ocurrido un error al intentar cargar los datos.",
	error,
	reset,
}: ErrorDisplayProps) {
	return (
		<div className="flex items-center justify-center min-h-[50vh]">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<AlertCircle className="h-5 w-5 text-red-500" />
						{title}
					</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent>
					{error && (
						<p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
							{error.message}
						</p>
					)}
				</CardContent>
				<CardFooter className="flex justify-end">
					{reset && <Button onClick={reset}>Intentar de nuevo</Button>}
				</CardFooter>
			</Card>
		</div>
	);
}
