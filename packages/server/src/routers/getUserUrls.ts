import express from "express";
import { getUserUrls } from "@/db/getUserUrls";
import { isOk } from "utils/isOk";
import { authenticateJWT } from "@/middleware/authenticateJWT";

export const router = express.Router();

// TODO: Proteger esta ruta
router.get("/api/user/getUrls", authenticateJWT, async (req, res) => {
	console.log("asd");
	const user = req.user as { id: string };
	const id = user.id;

	const { code, message, rows } = await getUserUrls({ id });

	if (!isOk(code)) {
		res.status(code).json({
			code,
			message,
		});
		return;
	}

	res.status(code).json(rows);
});
