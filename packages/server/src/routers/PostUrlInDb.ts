import express, { Request, Response } from "express";
import PushUrls from "../db/PushUrl";

const postUrlInBb = express.Router();

postUrlInBb.post("/url", async (req: Request, res: Response) => {
	const url = req.body.url;
	let statusCode = 200;

	if (!url) {
		statusCode = 400;

		res.status(statusCode).json({
			code: statusCode,
			error: "url not defined",
		});
	}

	if (!url.startsWith("https://")) {
		statusCode = 400;

		res.status(statusCode).json({
			code: statusCode,
			error: "Enter a valid URL like https://example.com",
		});
	}

	// TODO: mejorar el checkeo por VT
	/*const virusTotalReport = await getReported(url);

	if (virusTotalReport.code !== 200) {
		return res.status(virusTotalReport.code).json(virusTotalReport);
	}*/

	const uuid = crypto.randomUUID().split("-")[0];
	const short = `${req.hostname}/${uuid}`;

	await PushUrls({
		url,
		id: uuid,
		short,
	});

	res.status(statusCode).json({ short });
});

export default postUrlInBb;
