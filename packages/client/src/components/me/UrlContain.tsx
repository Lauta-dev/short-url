import { toast } from "sonner";
import { Input } from "@/components/ui/input";

function UrlContain({ url }: { url: string }) {
	function copyToClipboard(content: unknown) {
		navigator.clipboard.writeText(content as string);
		toast.success("URL copiada al portapapeles");
	}

	return (
		<div className="mt-4 text-center flex flex-col gap-4">
			<h2>Haga click en la URL para copiarla</h2>
			<Input
				type="url"
				value={url}
				readOnly
				onClick={(e) => {
          const target = e.target as HTMLInputElement;
          copyToClipboard(target.value)
        }}
			/>
		</div>
	);
}

export default UrlContain;
