import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useResizeWindow from "@/hook/useResizeWindow";
import { Re } from "@/interface/ResJson";
import React, { useEffect, useState } from "react";

function FormEstructure({ formClassName }: { formClassName: string }) {
	const [url, setUrl] = useState<FormDataEntryValue>();
	const [results, setResults] = useState({});

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const { url } = Object.fromEntries(formData);
		setUrl(url);
	}

	useEffect(() => {
		async function FetchData() {
			const res = await fetch("https://short-url-ebon-six.vercel.app/url", {
				method: "POST",
				body: JSON.stringify({ url }),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) {
				return setResults({
					statusCode: res.status,
				});
			}

			const json: Re = await res.json();
      console.log(json)
		}

		FetchData();
	});

	return (
		<form className={`pt-4 ${formClassName} gap-4`} onSubmit={handleSubmit}>
			<Input type="url" placeholder="De us URL" name="url" />
			<Button type="submit">Submit</Button>
		</form>
	);
}

function Form() {
	const { isMobile } = useResizeWindow();

	return isMobile ? (
		<FormEstructure formClassName={"flex flex-col"} />
	) : (
		<FormEstructure formClassName={"flex"} />
	);
}

export default Form;
