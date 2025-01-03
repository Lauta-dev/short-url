import turso from "@db/turso";

export async function getUserByUsername(username: string) {
	try {
		const sql = "SELECT id, password, salt FROM users WHERE name = ?";

		const { rows } = await turso.execute({
			sql,
			args: [username],
		});

		if (!rows.length) {
			return {
				exist: false,
			};
		}

		const row = rows[0];

		return {
			exist: true,
			id: row.id,
			password: row.password,
			salt: row.salt,
		};
	} catch (error) {
		console.error(error);
	}
}
