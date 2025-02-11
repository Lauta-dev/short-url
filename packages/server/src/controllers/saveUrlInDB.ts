import PushUrls from "@/db/PushUrl";
import { triggerResponse } from "@utils/triggerResponse";
import { Request, Response } from "express";

export async function saveUrlInDB(req: Request, res: Response) {
	const body: { url: string; expiresDate: string; intentos: string } = req.body;
	const { url } = body;
	const { hostname } = req;
	// Obtener el token del header
	let token = req.header("Authorization")?.split("Bearer")[1].trim() || "";
	console.log({
		token,
		req: req.cookies,
	});

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

	if (token === "undefined") {
		token = "";
	}

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
