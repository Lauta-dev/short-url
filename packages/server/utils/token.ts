import { Request, Response } from "express";
import { accessToken } from "./genAccessToken";

export class Token {
	constructor(
		private res: Response,
		private req: Request,
	) {}

	getToken(): string | null {
		return this.req.cookies.token || null;
	}

	setToken(userId: string) {
		this.res.cookie("token", accessToken({ id: userId }), {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});
	}
}
