import { deleteUserUrl } from "@/db/deleteUserUrl";
import { Request, Response } from "express";

export async function deleteUrl(req: Request, res: Response) {
	try {
		const { url_id } = req.params;
		const userId = req.query.user_id as string;
		const urlId = url_id as string;

		const data = await deleteUserUrl({ userId, urlId });
		res.status(data.code).json({ ...data });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
}
