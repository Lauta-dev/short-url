import express, { Response, Request } from "express";
import getUrlById from "@/db/getUrlById";
import goTo from "@/goTo";
import { triggerResponse } from "@utils/triggerResponse";

const router = express.Router();

router.get("/api/:id", async (req: Request<{ id: string }>, res: Response) => {
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
});

export default router;
