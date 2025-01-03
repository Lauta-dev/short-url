import { sign } from "jsonwebtoken";

export function accessToken(payload: {}) {
	const secret = process.env.JWT_SECRET as string;

	return sign(payload, secret, {
		expiresIn: "1h",
		algorithm: "HS256",
	});
}
