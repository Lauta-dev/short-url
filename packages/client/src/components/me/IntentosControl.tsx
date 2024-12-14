import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface i extends React.MouseEvent<HTMLButtonElement> {
	target: HTMLButtonElement;
}

export function IntentosControl({
	disabled,
	intentos,
	setIntentos,
}: {
	disabled: boolean;
	intentos: number;
	setIntentos: React.Dispatch<React.SetStateAction<number>>;
}) {
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setIntentos(Number(e.target.value));
	}

	function handleClick(e: i) {
		if (intentos < 0) {
			return;
		}

		if (e.target.id === "plus") {
			setIntentos(intentos + 1);
		} else if (e.target.id === "minus" && intentos > 0) {
			setIntentos(intentos - 1);
		}
	}

	return (
		<div className="">
			<label htmlFor="intentos">Intentos</label>
			<div className="flex items-center space-x-2">
				<Input
					type="number"
					name="intentos"
					id="intentos"
					value={intentos}
					onChange={handleChange}
					disabled={disabled}
					min="0"
					max="100"
				/>
				<Button
					type="button"
					disabled={disabled}
					variant="secondary"
					id="plus"
					onClick={handleClick}
				>
					+
				</Button>
				<Button
					type="button"
					disabled={disabled}
					variant="secondary"
					id="minus"
					onClick={handleClick}
				>
					-
				</Button>
			</div>
		</div>
	);
}
