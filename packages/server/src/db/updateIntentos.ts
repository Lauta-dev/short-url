import turso from "@/db/turso";

export async function updateIntentos({
	id,
	intentos,
}: { id: string; intentos: number }) {
	const sql = "UPDATE short_url SET intentos = ? WHERE uuid = ?";

	await turso.execute({
		sql,
		args: [(intentos - 1).toString(), id],
	});
}
