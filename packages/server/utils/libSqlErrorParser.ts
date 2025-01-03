export function libSqlErrorParser(code: string) {
	const errorMessage = {
		SQLITE_CONSTRAINT_UNIQUE: "El usuario está repetido",
		SQLITE_CONSTRAINT: "El usuario está repetido",
		SQLITE_BUSY: "La base de datos está ocupada. Intente más tarde",
	};

	return errorMessage[code] || `Error desconocido: ${code}`;
}
