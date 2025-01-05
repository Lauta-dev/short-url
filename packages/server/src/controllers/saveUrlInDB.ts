import PushUrls from "@/db/PushUrl";
import { Request, Response } from "express";

export async function saveUrlInDB(req: Request, res: Response) {
	const body: { url: string; expiresDate: string; intentos: string } = req.body;
	const { url, expiresDate } = body;
	const { hostname } = req;
	let intentos = Number(body.intentos);
	let statusCode = 200;

	// Obtener el token del header
	let token = req.header("Authorization")?.split("Bearer")[1].trim() || "";

	if (!url) {
		statusCode = 400;

		res.status(statusCode).json({
			code: statusCode,
			error: "Se require la URL",
		});

		return;
	}

	if (!url.startsWith("https://")) {
		statusCode = 400;

		res.status(statusCode).json({
			code: statusCode,
			error: "La url no valida",
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
		expiredDate: new Date().toUTCString(),
		intentos,
		token,
	});

	res.status(statusCode).json({ short });
}
