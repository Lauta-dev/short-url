import turso from "@/db/turso";

export async function getUserUrls({ id }: { id: string }) {
	const sql =
		"SELECT uuid AS id, url, shor_url AS shortUrl, created_at AS createdAt, valid AS isActive FROM short_url WHERE user_id = ?";
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
