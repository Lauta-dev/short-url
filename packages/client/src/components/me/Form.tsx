import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Re } from "@/interface/ResJson";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import UrlContain from "./UrlContain";
import { apiUrl } from "@/const";
import genDate from "@/lib/genDate";
import SelectHours from "./SelectHours";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

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
		let hours = data.hours;
		let minutes = data.minutes;
		let url = data.url;

		if (!hours) {
			hours = (new Date().getHours() + 5).toString();
		} else if (!minutes) {
			minutes = new Date().setMinutes(0).toString();
		}

		const date = genDate({
			minutes: Number(minutes),
			hours: Number(hours),
		});
		setLoading(true);

		try {
			const res = await fetch(apiUrl, {
				method: "POST",
				body: JSON.stringify({
					url,
					expiresDate: date,
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) {
				return toast.error("Ocurrió un error al generar el URL");
			}
			const json: Re = await res.json();

			setData(json);
		} catch (error) {
			throw new Error(error as string);
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
				<Input
					type="url"
					placeholder="De su URL"
					name="url"
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

			<SelectHours loading={loading || inputText.length === 0} />
		</form>
	);
}

function Form() {
	const [data, setData] = useState<undefined | Re>();
	return (
		<>
			<FormEstructure setData={setData} />
			{data && <UrlContain url={data.short} />}
			<Toaster position="bottom-center" richColors />
		</>
	);
}

export default Form;
