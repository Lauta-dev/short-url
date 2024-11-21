import { Button } from "@/components/ui/button";
import Header from "@/components/me/header";
import MenuMobile from "@/components/me/menuMobile";
import useResizeWindow from "@/hook/useResizeWindow";
import FormAction from "@/components/me/Form";

function App() {
	const { isMobile } = useResizeWindow();

	return (
		<main className="p-4">
			{isMobile ? <MenuMobile /> : <Header />}
			<FormAction />

			<div className="mt-4 p-3 text-center flex flex-col gap-4">
				<p>URL:</p>
				<b onClick={() => console.log("asd")}>https://google.com</b>
				<Button variant="secondary">Copiar</Button>

				<b className="text-green-600">URL Copiada</b>
			</div>
		</main>
	);
}

export default App;
