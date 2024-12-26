import { createClient } from "@libsql/client";
/*
 * 	url: process.env.TURSO_DATABASE_URL || "",
	authToken: process.env.TURSO_AUTH_TOKEN,
*/

const turso = createClient({
	url: "file:local.db",
});

export default turso;
