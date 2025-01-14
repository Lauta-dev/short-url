import turso from "@/db/turso";

export async function deleteUserUrl({
	urlId,
	userId,
}: { urlId: string; userId: string }) {
	// TODO: Checkear si el usuario existe
	const sql = "DELETE FROM urls WHERE id = ? AND user_id = ?";
	let message = "";
	let code = 200;

	console.log(urlId, userId);

	const data = await turso.execute({
		sql,
		args: [urlId, userId],
	});

	if (data.rowsAffected === 0) {
		message = "Not URL";
		code = 404;
		return {
			message,
			code,
		};
	}

	message = "Elemento eliminado";

	return {
		message,
		code,
	};
}
