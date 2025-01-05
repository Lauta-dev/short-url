import Header from "@/components/me/header";
import { Toaster } from "sonner";

export function Layout({
	children,
	className,
}: { children: ReactElement[] | ReactElement; className?: string }) {
	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-background/80">
			<div className="mx-auto max-w-screen-xl px-4">
				<Header />
				<main className="mx-auto max-w-2xl py-10">
					<div className={`space-y-8 ${className}`}>{children}</div>
				</main>
			</div>
			<Toaster position="bottom-center" richColors />
		</div>
	);
}
