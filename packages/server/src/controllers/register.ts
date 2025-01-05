import { registerUser } from "@/db/registerUser";
import { accessToken } from "@utils/genAccessToken";
import { triggerResponse } from "@utils/triggerResponse";
import { Request, Response } from "express";

export async function register(req: Request, res: Response) {
	const { username, password } = req.body;

	if (!username) {
		triggerResponse({
			res,
			message: "El nombre de usuario es requerido",
			code: 400,
		});
		return;
	} else if (!password) {
		triggerResponse({
			res,
			message: "La contraseña es requerida",
			code: 400,
		});
		return;
	}

	try {
		const data = await registerUser({ username, password });

		// Genera el token si el registro es correcto
		let token = "";
		if (data.statusCode === 200) {
			token = accessToken({ username: req.body.username });
		}
		triggerResponse({
			res,
			code: data.statusCode,
			anyData: {
				...data,
				token: token,
			},
		});
	} catch (error) {
		// TODO: Manejo de errores, enviar mensaje adecuado
		triggerResponse({
			res,
			code: 500,
			message: "Error en el registro",
		});
	}
}
