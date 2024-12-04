import turso from "./turso";

async function getUrlById({ id }: { id: string }) {
	const sql = "SELECT url FROM short_url WHERE uuid = ?";

	const { rows } = await turso.execute({
		sql,
		args: [id],
	});

	if (rows.length < 1) {
		return {
			error: true,
			errorType: "ID not exist in the database",
			code: 404,
			url: "",
		};
	}

	if (rows[0].url === null) {
		return {
			error: true,
			errorType: "URL not exist in the database",
			code: 404,
			url: "",
		};
	}

	return {
		error: false,
		errorType: "",
		code: 200,
		url: rows[0].url.toString(),
	};
}

export default getUrlById;
