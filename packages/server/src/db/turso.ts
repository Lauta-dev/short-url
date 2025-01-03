import { createClient } from "@libsql/client";

const { TURSO_DATABASE_URL = "", TURSO_AUTH_TOKEN = "" } = process.env;

const turso = createClient({
	url: TURSO_DATABASE_URL,
	authToken: TURSO_AUTH_TOKEN,
});

export default turso;
