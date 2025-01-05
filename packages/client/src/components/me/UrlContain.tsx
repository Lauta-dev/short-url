import { toast } from "sonner";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function UrlContain({ url }: { url: string }) {
	const [copied, setCopied] = useState(false);
	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
			toast.success("URL copiada al portapapeles");
		} catch (err) {
			toast.error("Error al copiar la url al portapapeles.");
		}
	}

	return (
		<Card className="mt-8">
			<CardContent className="p-6">
				<div className="space-y-4">
					<p className="text-sm text-muted-foreground text-center">
						Haga click para copiar la URL
					</p>
					<div
						onClick={copyToClipboard}
						className="flex items-center gap-2 justify-between rounded-lg border bg-muted/50 p-3 cursor-copy"
					>
						<code className="text-sm font-mono flex-1 text-center">{url}</code>
						<Button
							variant="ghost"
							size="icon"
							onClick={copyToClipboard}
							className="h-8 w-8 cursor-copy"
						>
							{copied ? (
								<Check className="h-4 w-4 text-green-500" />
							) : (
								<Copy className="h-4 w-4" />
							)}
							<span className="sr-only">Copiar URL</span>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default UrlContain;
