import { setToken } from "@/lib/getSetLocalStorage";
import { useState } from "react";
import { toast } from "sonner";

function useAuthSubmit(apiEndpoint: string) {
	const [_, setLoading] = useState(false);

	async function handleSubmit(event: React.FormEvent) {
		try {
			event.preventDefault();

			const formData = new FormData(event.target as HTMLFormElement);
			const data = Object.fromEntries(formData) as {
				username: string;
				password: string;
			};

			if (!data.username || !data.password) {
				return toast.error("Algún campo falta por completar");
			}

			const body = JSON.stringify(data);

			setLoading(true);
			const response = await fetch(apiEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body,
			});

			const result = await response.json();

			console.log({ result });
			if (result.statusCode !== 200) {
				return toast.warning(result.message);
			}

			setToken(result.token); // Implementa tu lógica para guardar el token.

			if (result.message === "Login") {
				window.location.href = "/";
				return;
			}

			toast.success(`Usuario ${data.username} procesado con éxito!`);
		} catch (error) {
			toast.error("Error al procesar el usuario, intentelo más tarde");
		} finally {
			setLoading(false);
		}
	}

	return { handleSubmit };
}

export default useAuthSubmit;
