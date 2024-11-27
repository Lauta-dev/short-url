import turso from "./turso";

async function PushUrls({
	id,
	url,
	short,
}: { id: string; url: string; short: string }) {
	const query = "INSERT INTO short_url (uuid, url, short_url) VALUES (?, ?, ?)";

	await turso.execute({
		sql: query,
		args: [id, url, short],
	});
}

export default PushUrls;
