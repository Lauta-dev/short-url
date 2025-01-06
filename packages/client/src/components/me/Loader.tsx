import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export function SpinLoader() {
	return <Loader className={cn("animate-spin")} />;
}
