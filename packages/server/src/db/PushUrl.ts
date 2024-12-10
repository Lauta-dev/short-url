import turso from "@/db/turso";

interface Client {
	url: string;
	hostname: string;
	expiredDate: string;
}

async function PushUrls({ url, hostname, expiredDate }: Client) {
	const query =
		"INSERT INTO short_url (uuid, url, shor_url, valid_until_to) VALUES (?, ?, ?, ?)";
	const id = crypto.randomUUID().split("-")[0];
	const short = `${hostname}/api/${id}`;

	await turso.execute({
		sql: query,
		args: [id, url, short, expiredDate],
	});

	return short;
}

export default PushUrls;
