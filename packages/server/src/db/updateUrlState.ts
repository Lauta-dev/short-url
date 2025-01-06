import turso from "@db/turso";

interface UpdateStateArgs {
	id: string;
	isActive: number;
	userId: string;
}

// isActive -> 0 or 1
export async function updateUrlState({
	id,
	isActive,
	userId,
}: UpdateStateArgs) {
	try {
		const sql = "UPDATE short_url SET valid = ? WHERE uuid = ? AND user_id = ?";

		const data = await turso.execute({
			sql,
			args: [isActive, id, userId],
		});

		if (data.rowsAffected === 0) {
			return {
				statusCode: 404,
				message: "La columna no existe",
			};
		}

		return {
			statusCode: 200,
			message: `La url se ${isActive ? "activo" : "desactivo"}`,
		};
	} catch (error) {
		console.log(error);
		return {
			statusCode: 500,
			message: "Error en el servidor, intentelo más tarde",
		};
	}
}
