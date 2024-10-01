import turso from "./turso.js";

async function PushUrls({ id, url, short }) {
	const query = "INSERT INTO short_url (uuid, url, short_url) VALUES (?, ?, ?)";

	await turso.execute({
		sql: query,
		args: [id, url, short],
	});
}

export default PushUrls;
