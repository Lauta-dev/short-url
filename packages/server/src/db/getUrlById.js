import turso from "./turso.js";

function incrementEnteCount() {
  // TODO: feat: agregar un contador de cuanto se accede a la URL
}

async function getUrlById({ id }) {
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
