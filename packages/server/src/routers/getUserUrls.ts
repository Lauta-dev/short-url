import express from "express";
import { getUserUrls } from "@/db/getUserUrls";
import { isOk } from "utils/isOk";

export const router = express.Router();

// TODO: Proteger esta ruta
router.get("/api/user/getUrls", async (req, res) => {
	const { id } = req.query;

	const { code, message, rows } = await getUserUrls({ id: id as string });

	if (!isOk(code)) {
		res.status(code).json({
			code,
			message,
		});
		return;
	}

	res.status(code).json(rows);
});
