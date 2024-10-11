import express from "express";
import PushUrls from "../db/PushUrl.js";

const postUrlInBb = express.Router();

postUrlInBb.post("/url", async (req, res) => {
	/** @type {string} */
	const url = req.body.url;

	if (!url.startsWith("https://")) {
		return res.status(400).json({
			code: 400,
			error: "Enter a valid URL like https://example.com",
		});
	}

	const uuid = crypto.randomUUID().split("-")[0];
	const short = `${req.hostname}/short/${uuid}`;

	await PushUrls({
		url,
		id: uuid,
		short,
	});

	res.json({ short });
});

export default postUrlInBb;
