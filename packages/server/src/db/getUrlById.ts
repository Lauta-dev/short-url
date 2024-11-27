import turso from "./turso";

async function getUrlById({ id }: { id: string }) {
	const sql = "SELECT url FROM short_url WHERE uuid = ?";

	const data = await turso.execute({
		sql,
		args: [id],
	});

	if (data.rows.length < 1) {
		return {
			error: true,
			errorType: "ID not exist in the database",
			code: 404,
			url: "",
		};
	}

	return {
		error: false,
		errorType: "",
		code: 200,
		url: data.rows[0].url,
	};
}

export default getUrlById;
