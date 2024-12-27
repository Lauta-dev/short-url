import turso from "@/db/turso";

export async function getUserUrls({ id }: { id: string }) {
	// TODO: Checkear si el usuario existe
	const sql = "SELECT * FROM short_url WHERE user_id = ?";
	let message = "";
	let code = 200;

	const data = await turso.execute({
		sql,
		args: [id],
	});

	if (data.rows.length === 0) {
		message = "Not URL";
		code = 404;
		return {
			message,
			code,
		};
	}

	return {
		message,
		code,
		rows: data.rows,
	};
}
