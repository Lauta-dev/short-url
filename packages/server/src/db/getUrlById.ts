import turso from "@/db/turso";
import { updateIntentos } from "./updateIntentos";

async function getUrlById({ id }: { id: string }) {
	const sql = "SELECT * FROM short_url WHERE uuid = ?";

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

	//TODO:
	//Checkear este feca localhost/api/3ca0a3d8

	const now = new Date();
	const validUntil = new Date(rows[0].valid_until_to as string);
	const intentos = Number(rows[0].intentos);

	// now >= validUntil - es valido
	// now <= validUntil - es inválido
	if (now >= validUntil) {
		return {
			error: true,
			errorType: "URL expired",
			code: 401,
			url: "",
		};
	}

	if (intentos < 1) {
		return {
			error: true,
			errorType: "URL expired",
			code: 401,
			url: "",
		};
	}

	await updateIntentos({ id, intentos });

	return {
		error: false,
		errorType: "",
		code: 200,
		url: rows[0].url.toString(),
	};
}

export default getUrlById;
