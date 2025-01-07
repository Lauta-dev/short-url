import turso from "@/db/turso";

async function getUrlById({ id }: { id: string }) {
	try {
		const sql =
			"SELECT original_url AS url, is_active AS isActive FROM urls WHERE id = ?";

		const { rows } = await turso.execute({
			sql,
			args: [id],
		});

		if (rows.length < 1) {
			return {
				message: "La id no existe en la base de datos",
				code: 404,
			};
		}

		if (rows[0].url === null) {
			return {
				message: "La URL no existe en la base de datos",
				code: 404,
			};
		}

		const { url, isActive } = rows[0];

		if (!isActive) {
			return {
				code: 406,
				message: "La URL esta inactiva",
			};
		}

		return {
			error: false,
			code: 200,
			url,
		};
	} catch (error) {
		return {
			message: "Internal server error",
			code: 500,
		};
	}
}

export default getUrlById;
