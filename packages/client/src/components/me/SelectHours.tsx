import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { time } from "@/const";

export default function SelectHours({ loading }: { loading: boolean }) {
	const { hours, minutes } = time;
	return (
		<div className="flex gap-4">
			<Select name="hours" disabled={loading}>
				<SelectTrigger className="h-12">
					<SelectValue placeholder="Horas" />
				</SelectTrigger>
				<SelectContent>
					{hours.map((hour) => (
						<SelectItem value={hour} key={hour}>
							{hour} Hours
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select name="minutes" disabled={loading}>
				<SelectTrigger className="h-12">
					<SelectValue placeholder="Minutos" />
				</SelectTrigger>
				<SelectContent>
					{minutes.map((minute) => (
						<SelectItem value={minute} key={minute}>
							{minute} Minutes
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
