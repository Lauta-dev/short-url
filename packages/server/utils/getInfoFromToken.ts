import { JwtPayload, verify } from "jsonwebtoken";

export function getInfoFromToken(token: string) {
	try {
		const secret = process.env.JWT_SECRET as string;
		const payload = verify(token, secret) as JwtPayload;

		return payload.username;
	} catch (error) {
		console.error(error);
	}
}
