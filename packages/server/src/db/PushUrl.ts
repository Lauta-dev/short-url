import turso from "@/db/turso";
import { getInfoFromToken } from "@utils/getInfoFromToken";
import { getUserById } from "@db/getUserById";

interface Client {
	url: string;
	hostname: string;
	expiredDate: string;
	intentos: number;
	token: string;
}

async function PushUrls({
	url,
	hostname,
	expiredDate,
	intentos,
	token,
}: Client) {
	const query =
		"INSERT INTO short_url (uuid, url, shor_url, valid_until_to, intentos, user_id) VALUES (?, ?, ?, ?, ?, ?)";
	const id = crypto.randomUUID().split("-")[0];
	const short = `${hostname}/api/${id}`;
	let userId;

	if (token) {
		const pay = getInfoFromToken(token);
		const user = await getUserById(pay?.id);

		if (user?.exist) {
			userId = user.id;
		}
	}

	if (intentos < 0) {
		intentos = 25;
	}

	await turso.execute({
		sql: query,
		args: [id, url, short, expiredDate, intentos.toString(), userId || null],
	});

	return short;
}

export default PushUrls;
