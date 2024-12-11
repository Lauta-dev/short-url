import Header from "@/components/me/header";
import Form from "@/components/me/Form";

function App() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-background/80">
			<div className="mx-auto max-w-screen-xl px-4">
				<Header />
				<main className="mx-auto max-w-2xl py-10">
					<div className="space-y-8">
						<Form />
					</div>
				</main>
			</div>
		</div>
	);
}

export default App;
