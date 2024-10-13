import express from "express";
import PushUrls from "../db/PushUrl.js";
import getReported from "../virusTotal.js";

const postUrlInBb = express.Router();

postUrlInBb.post("/url", async (req, res) => {
	/** @type {string} */
	const url = req.body.url;

	if (!url) {
		return res.status(404).json({
			code: 404,
			error: "url not defined",
		});
	}

	if (!url.startsWith("https://")) {
		return res.status(400).json({
			code: 400,
			error: "Enter a valid URL like https://example.com",
		});
	}

	const virusTotalReport = await getReported(url);

	if (virusTotalReport.code !== 200) {
		return res.status(virusTotalReport.code).json(virusTotalReport);
	}

	console.log(virusTotalReport);

	const uuid = crypto.randomUUID().split("-")[0];
	const short = `${req.hostname}/${uuid}`;

	await PushUrls({
		url,
		id: uuid,
		short,
	});

	res.status(virusTotalReport.code).json({ ...virusTotalReport, short });
});

export default postUrlInBb;
