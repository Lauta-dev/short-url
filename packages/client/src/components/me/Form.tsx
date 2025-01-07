import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Re } from "@/interface/ResJson";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import UrlContain from "./UrlContain";
import { apiUrl } from "@/const";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-dropdown-menu";
import { getToken } from "@/lib/getSetLocalStorage";

function FormEstructure({
	setData,
}: {
	setData: React.Dispatch<React.SetStateAction<undefined | Re>>;
}) {
	const [inputText, setInputText] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData);
		let url = data.url;

		const body = JSON.stringify({
			url,
		});

		setLoading(true);

		try {
			const token = getToken();
			const res = await fetch(apiUrl + "/url", {
				method: "POST",
				body,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			});

			if (!res.ok) {
				return toast.error("Ocurrió un error al generar el URL");
			}
			const json: Re = await res.json();

			setData(json);
		} catch (error) {
			return toast.error(
				"Ocurrió un error al generar el URL, Intentelo de nuevo más tarde",
			);
		} finally {
			setLoading(false);
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setInputText(e.target.value);
	}

	useEffect(() => {
		if (loading) {
			toast.info("Generando URL");
		}
	}, [loading]);

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 rounded-lg border bg-card p-6"
		>
			<div className="space-y-2">
				<Label>Escriba su URL</Label>
				<Input
					type="url"
					placeholder="https://example.com/"
					name="url"
					id="url"
					onChange={handleChange}
					autoComplete="off"
					autoFocus={true}
					disabled={loading}
				/>
			</div>

			<Button
				className="h-12 w-full"
				size="lg"
				disabled={loading || inputText.length === 0}
			>
				{loading ? <Loader className={cn("animate-spin")} /> : "Enviar"}
			</Button>
		</form>
	);
}

function Form() {
	const [data, setData] = useState<undefined | Re>();
	return (
		<>
			<FormEstructure setData={setData} />
			{data && <UrlContain url={data.short} />}
		</>
	);
}

export default Form;
