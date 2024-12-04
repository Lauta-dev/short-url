import express, { Response, Request } from "express";
import getUrlById from "../db/getUrlById";
import goTo from "@/goTo";

const router = express.Router();

router.get("/api/:id", async (req: Request<{ id: string }>, res: Response) => {
	const { id } = req.params;
	const { code, url, error, errorType } = await getUrlById({ id });

	if (error) {
		res.status(code).json({
			code,
			error,
			url,
			errorType,
		});
	}

	res.send(goTo(url));
});

export default router;
