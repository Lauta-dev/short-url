import turso from "./turso";

export async function checkIfUserExist(name: string) {
	let resultData;
	let userNotFound = [];
	let message = "";
	let status = 200;

	// Test id: b4dde0f0-b6fd-4d5f-8748-cd7c13d70492
	const userCredencialsSql =
		"SELECT name FROM users_credencials WHERE name = ?";

	// TEst id: 9af76c12-ff84-4b94-977f-1dafdfb3dc6d
	const userProvidersSql = "SELECT name FROM users_providers WHERE name = ?";

	const tables = [userCredencialsSql, userProvidersSql];

	for await (const table of tables) {
		const data = await turso.execute({
			sql: table,
			args: [name],
		});

		if (data.rows.length === 0) {
			userNotFound.push(`User with id (${name}) not found`);
			continue;
		}

		resultData = data;
	}

	if (!resultData) {
		status = 404;
		message = "User not exist in DB";

		return {
			status,
			message,
		};
	}

	return {
		status,
		resultData: resultData.rows,
	};
}
