interface GenDate {
	hours: number;
	minutes: number;
}

const genDate = ({ hours, minutes }: GenDate) => {
	const date = new Date();
	date.setHours(hours, minutes, 0, 0);
	console.log(date.toISOString());
	return date.toISOString();
};

export default genDate;
