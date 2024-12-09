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
		<>
			<Select name="hours" disabled={loading}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Horas" />
				</SelectTrigger>
				<SelectContent>
					{hours.map((hour) => (
						<SelectItem value={hour} key={hour}>
							{hour}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select name="minutes" disabled={loading}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Minutos" />
				</SelectTrigger>
				<SelectContent>
					{minutes.map((minute) => (
						<SelectItem value={minute} key={minute}>
							{minute}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	);
}
