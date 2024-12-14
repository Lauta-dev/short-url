import turso from "@/db/turso";

interface Client {
	url: string;
	hostname: string;
	expiredDate: string;
	intentos: number;
}

async function PushUrls({ url, hostname, expiredDate, intentos }: Client) {
	const query =
		"INSERT INTO short_url (uuid, url, shor_url, valid_until_to, intentos) VALUES (?, ?, ?, ?, ?)";
	const id = crypto.randomUUID().split("-")[0];
	const short = `${hostname}/api/${id}`;

	if (intentos < 0) {
		intentos = 25;
	}

	await turso.execute({
		sql: query,
		args: [id, url, short, expiredDate, intentos.toString()],
	});

	return short;
}

export default PushUrls;
