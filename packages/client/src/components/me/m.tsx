import { useEffect, useState } from "react";
import { ClipboardCopy } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getToken } from "@/lib/getSetLocalStorage";
import Unauthorized from "./Unauthorized";
import ErrorDisplay from "./error-display";
import { SpinLoader } from "./Loader";

interface Url {
	id: string;
	shortUrl: string;
	url: string;
	isActive: boolean;
}

export interface NewURL {
	message: string;
	newUrls: Url[];
	statusCode: number;
}

export default function UrlManager() {
	const [urls, setUrls] = useState<Url[]>();
	const [fetchError, setFetchError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [unauthorized, setUnauthorized] = useState(false);
	const [updateElement, setUpdateElement] = useState(false);

	useEffect(() => {
		async function getUrls() {
			try {
				setLoading(true);

				const token = getToken();

				const f = await fetch("http://localhost:3001/api/user/getUrls", {
					headers: {
						Authorization: "Bearer " + token,
					},
				});

				if (f.status === 401) {
					setUnauthorized(true);
					return;
				}

				const j: Url[] = await f.json();
				setUrls(j);
			} catch (error) {
				setFetchError(true);
			} finally {
				setLoading(false);
			}
		}

		getUrls();
	}, []);

	const handleCopy = async (url: string) => {
		try {
			await navigator.clipboard.writeText(url);
			toast.success("URL copiada al portapapeles");
		} catch (error) {
			toast.error("Fallo al copiar la URL, intente de nuevo");
		}
	};

	async function handleToggle(url: Url) {
		const { isActive, id, shortUrl } = url;

		try {
			async function updateInDb(state: boolean) {
				const token = getToken();

				setUpdateElement(true);

				const body = JSON.stringify({
					id,
					newState: state ? 0 : 1,
				});

				const f = await fetch("http://localhost:3001/api/user/update", {
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					method: "PUT",
					body,
				});

				const j: NewURL = await f.json();
				return j;
			}

			const data = await updateInDb(isActive);
			setUrls(data.newUrls);
			toast.info(`La url ${shortUrl} se ${isActive ? "Desactivo" : "Activo"}`);
		} catch (error) {
		} finally {
			setUpdateElement(false);
		}
	}

	return loading ? (
		<SpinLoader />
	) : fetchError ? (
		<ErrorDisplay />
	) : unauthorized ? (
		<Unauthorized />
	) : (
		<div className="grid gap-4 sm:grid-cols-2">
			{urls?.map((url) => (
				<div
					key={url.id}
					className={`p-4 rounded-lg border transition-colors ${
						url.isActive ? "bg-white" : "bg-gray-100"
					}`}
				>
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Switch
									onCheckedChange={() => handleToggle(url)}
									checked={url.isActive}
									aria-label="Toggle URL active state"
									disabled={updateElement}
								/>
								<span
									className={`font-medium ${
										url.isActive ? "text-primary" : "text-gray-500"
									}`}
								>
									{url.shortUrl}
								</span>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								onClick={() => handleCopy(url.shortUrl)}
								disabled={updateElement}
							>
								<ClipboardCopy className="h-4 w-4" />
								<span className="sr-only">Copy URL</span>
							</Button>
						</div>
						<div className="text-sm text-muted-foreground">{url.url}</div>
					</div>
				</div>
			))}
		</div>
	);
}
