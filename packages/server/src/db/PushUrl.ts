import turso from "@/db/turso";
import { getInfoFromToken } from "@utils/getInfoFromToken";
import { getUserById } from "@db/getUserById";

interface Client {
	url: string;
	hostname: string;
	token: string;
}

async function PushUrls({ url, hostname, token }: Client) {
	const query =
		"INSERT INTO urls (id, original_url, short_url, user_id) VALUES ( ?, ?, ?, ?)";
	const id = crypto.randomUUID().split("-")[0];
	const short = `${hostname}/api/${id}`;
	let userId;

	if (token) {
		const pay = getInfoFromToken(token);
		const user = await getUserById(pay?.id);

		console.log({ pay, user });

		if (user?.exist) {
			userId = user.id;
		}
	}

	await turso.execute({
		sql: query,
		args: [id, url, short, userId || null],
	});

	return short;
}

export default PushUrls;
