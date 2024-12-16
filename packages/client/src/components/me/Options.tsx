import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import SelectHours from "@/components/me/SelectHours";
import { IntentosControl } from "@/components/me/IntentosControl";
import React, { SetStateAction, useState } from "react";

export default function Options({
	loading,
	inputText,
	intentos,
	setIntentos,
}: {
	loading: boolean;
	inputText: string;
	intentos: number;
	setIntentos: React.Dispatch<SetStateAction<number>>;
}) {
	const [open, setOpen] = useState(false);

	function showOptions() {
		setOpen(!open);
	}

	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1">
				<AccordionTrigger onClick={showOptions}>Options</AccordionTrigger>
				<AccordionContent>
					<SelectHours
						loading={loading || inputText.length === 0 || intentos > 0}
					/>
					<IntentosControl
						intentos={intentos}
						setIntentos={setIntentos}
						disabled={loading || inputText.length === 0}
					/>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
