import express, { Response, Request } from "express";
import getUrlById from "@/db/getUrlById";
import goTo from "@/goTo";
import expiredMessageHtml from "@/expired";

const router = express.Router();

router.get("/api/:id", async (req: Request<{ id: string }>, res: Response) => {
	const { id } = req.params;
	const { code, url, error } = await getUrlById({ id });

	if (error) {
		res.setHeader("Content-Type", "text/html");
		return res.status(code).send(expiredMessageHtml);
	}

	res.send(goTo(url));
});

export default router;
