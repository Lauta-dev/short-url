import turso from "@db/turso";
import { hashPw } from "@utils/hashPw";
import { LibsqlError } from "@libsql/client/";
import { libSqlErrorParser } from "@utils/libSqlErrorParser";

export async function registerUser({
	username,
	password,
}: { username: string; password: string }) {
	try {
		const sql =
			"INSERT INTO users (id, name, password, salt) VALUES (?, ?, ?, ?)";

		const { hash, salt } = hashPw(password);

		await turso.execute({
			sql,
			args: [crypto.randomUUID(), username, hash, salt],
		});

		return { statusCode: 200, message: "Usuario creado con exito!" };
	} catch (error) {
		const libSqliError = error as LibsqlError;
		let statusCode = 500;
		let message = "Ocurrio un error inesperado";

		if (libSqliError.code) {
			statusCode = 400;
			message = libSqlErrorParser(libSqliError.code);
			console.log(`Error in db ${libSqliError.code}`);
		} else if (error instanceof Error) {
			statusCode = 400;
			message = "Error generico";
			console.error(`Generar error: ${error.message}`);
		} else {
			message = "Error generico";
		}

		return { statusCode, message };
	}
}
