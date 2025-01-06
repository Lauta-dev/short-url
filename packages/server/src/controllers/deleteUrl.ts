import { deleteUserUrl } from "@/db/deleteUserUrl";
import { Request, Response } from "express";

interface DeleteUrlBody {
	urlId: string;
}

export async function deleteUrl(
	req: Request<{}, {}, DeleteUrlBody>,
	res: Response,
) {
	try {
		const { urlId } = req.body;
		const user = req.user as { id: string };
		const userId = user.id;

		const data = await deleteUserUrl({ userId, urlId });
		res.status(data.code).json({ ...data });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
}
