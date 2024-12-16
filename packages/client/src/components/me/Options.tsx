import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import SelectHours from "./SelectHours";

export default function Options() {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1">
				<AccordionTrigger>Options</AccordionTrigger>
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
