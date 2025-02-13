import getUrlById from "@/db/getUrlById";
import goTo from "@/goTo";
import { triggerResponse } from "@utils/triggerResponse";
import { Request, Response } from "express";

export async function getLongUrl(req: Request<{ id: string }>, res: Response) {
	try {
		const { id } = req.params;
		const { code, url, message } = await getUrlById({ id });

		if (code === 200) {
			res.status(code).send(goTo(url as string));
			return;
		}

		triggerResponse({
			res,
			message,
			code,
		});
	} catch (error) {
		triggerResponse({
			res,
			message: "Internal server error",
			code: 500,
		});
	}
}
