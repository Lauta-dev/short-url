import express, { Request, Response } from "express";
import PushUrls from "@/db/PushUrl";

const postUrlInBb = express.Router();

postUrlInBb.post("/api/url", async (req: Request, res: Response) => {
	const body: { url: string; expiresDate: string; intentos: string } = req.body;
	const { url, expiresDate } = body;
	const { hostname } = req;
	let intentos = Number(body.intentos);
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

	const short = await PushUrls({
		url,
		hostname,
		expiredDate: expiresDate,
		intentos,
	});

	res.status(statusCode).json({ short });
});

export default postUrlInBb;
