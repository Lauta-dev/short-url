import express from "express";
import getUrlById from "./getUrlById.js";
import PushUrls from "./PushUrl.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/url/", async (req, res) => {
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

app.get("/short/:id", async (req, res) => {
	const { id } = req.params;
	const { code, url, error, errorType } = await getUrlById({ id });

	if (error) {
		return res.status(code).json({
			code,
			error,
			url,
			errorType,
		});
	}

	res.redirect(url);
});

app.listen(port);
