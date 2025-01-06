import turso from "@db/turso";
import { getUserUrls } from "./getUserUrls";

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

		const urls = await getUserUrls({ id: userId });

		return {
			statusCode: 200,
			message: `La url se ${isActive ? "activo" : "desactivo"}`,
			urls: urls.rows,
		};
	} catch (error) {
		console.log(error);
		return {
			statusCode: 500,
			message: "Error en el servidor, intentelo más tarde",
		};
	}
}
