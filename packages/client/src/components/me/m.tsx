import { useEffect, useState } from "react";
import { ClipboardCopy, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Unauthorized from "./Unauthorized";
import ErrorDisplay from "./error-display";
import { SpinLoader } from "./Loader";
import NoSavedURLs from "./no-saved-urls";
import { apiUrl } from "@/const";

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
	const [notUrls, setNotUrls] = useState(false);

	// Su unica utilidad es ejecutar el useEffect para volver a cargar elementos al eliminar una url
	const [c, setC] = useState(false);

	useEffect(() => {
		async function getUrls() {
			try {
				setLoading(true);

				const f = await fetch(apiUrl + "/user/getUrls", {
					credentials: "include",
				});

				if (f.status === 404) {
					setNotUrls(true);
					return;
				}

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
	}, [c]);

	const handleCopy = async (url: string) => {
		try {
			await navigator.clipboard.writeText(url);
			toast.success("URL copiada al portapapeles");
		} catch (error) {
			toast.error("Fallo al copiar la URL, intente de nuevo");
		}
	};

	async function handleDelete(id: string) {
		try {
			const body = JSON.stringify({
				urlId: id,
			});

			await fetch(apiUrl + "/user/delete", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body,
			});

			setUpdateElement(true);
			toast.success("Se elimino la url");
			setC((c) => !c);
		} catch (error) {
			toast.error("Error al eliminar la URL");
		} finally {
			setUpdateElement(false);
		}
	}

	async function handleToggle(url: Url) {
		const { isActive, id, shortUrl } = url;

		try {
			async function updateInDb(state: boolean) {
				setUpdateElement(true);

				const body = JSON.stringify({
					id,
					newState: state ? 0 : 1,
				});

				const f = await fetch(apiUrl + "/user/update", {
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
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
	) : notUrls ? (
		<NoSavedURLs />
	) : fetchError ? (
		<ErrorDisplay />
	) : unauthorized ? (
		<Unauthorized />
	) : (
		<div className="grid gap-4 sm:grid-cols-2">
			{urls?.map((url) => (
				<div key={url.id}>
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
								disabled={updateElement || !url.isActive}
							>
								<ClipboardCopy className="h-4 w-4" />
								<span className="sr-only">Copy URL</span>
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								onClick={() => handleDelete(url.id)}
								disabled={updateElement || !url.isActive}
							>
								<Trash color="red" className="h-4 w-4" />
								<span className="sr-only">Eliminar URLC</span>
							</Button>
						</div>
						<div className="text-sm text-muted-foreground">{url.url}</div>
					</div>
				</div>
			))}
		</div>
	);
}
