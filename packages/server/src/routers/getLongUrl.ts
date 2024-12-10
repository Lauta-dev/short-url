import express, { Response, Request } from "express";
import getUrlById from "@/db/getUrlById";
import goTo from "@/goTo";
import path from "node:path";

const router = express.Router();

router.get("/api/:id", async (req: Request<{ id: string }>, res: Response) => {
	const { id } = req.params;
	const { code, url, error } = await getUrlById({ id });

	if (error) {
		return res
			.status(code)
			.sendFile(path.resolve(__dirname, "../src/expired.html"));
	}

	res.send(goTo(url));
});

export default router;
