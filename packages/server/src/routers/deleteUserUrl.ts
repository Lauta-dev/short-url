import express from "express";
import { deleteUserUrl } from "@/db/deleteUserUrl";

export const router = express.Router();

// TODO: Proteger esta ruta
router.delete("/api/user/delete/:url_id", async (req, res) => {
	const { url_id } = req.params;
	const userId = req.query.user_id as string;
	const urlId = url_id as string;

	const data = await deleteUserUrl({ userId, urlId });
	res.status(data.code).json({ ...data });
});
