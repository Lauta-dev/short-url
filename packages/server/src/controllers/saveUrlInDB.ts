import PushUrls from "@/db/PushUrl";
import { triggerResponse } from "@utils/triggerResponse";
import { Request, Response } from "express";

interface BodyTypes {
	url: string;
	intentos: string;
}

export async function saveUrlInDB(
	req: Request<{}, {}, BodyTypes, {}>,
	res: Response,
) {
	const body = req.body;
	const { url } = body;
	const { hostname } = req;

	let token = req.cookies.token || "";

	if (!url) {
		triggerResponse({
			res,
			code: 400,
			message: "Se require la URL",
		});

		return;
	}

	if (!url.startsWith("https://")) {
		triggerResponse({
			res,
			code: 400,
			message: "Url no valida",
		});

		return;
	}

	// TODO: mejorar el checkeo por VT
	/*const virusTotalReport = await getReported(url);

	if (virusTotalReport.code !== 200) {
		return res.status(virusTotalReport.code).json(virusTotalReport);
	}*/

	const short = await PushUrls({
		url,
		hostname,
		token,
	});

	triggerResponse({
		res,
		code: 200,
		message: "Url generada",
		anyData: { short },
	});
}
