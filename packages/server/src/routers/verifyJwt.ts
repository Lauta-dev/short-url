import express from "express";
import { verify } from "jsonwebtoken";

const router = express.Router();

router.get("/verify-jwt", (req, res) => {
	let permission = true;
	let errorType = "";

	console.log(req.cookies);

	try {
		const cookies = req.cookies.token;
		const secret = process.env.JWT_SECRET as string;

		if (!cookies) {
			throw new Error("No token");
		}

		if (!secret) {
			throw new Error("No secret");
		}

		verify(cookies, secret);
	} catch (error) {
		const e = error as { message: string };
		errorType = e.message;
		permission = false;
	}

	res.status(permission ? 200 : 401).json({ permission, error: errorType });
});

export { router as verifyJwt };
