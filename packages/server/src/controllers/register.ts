import { registerUser } from "@/db/registerUser";
import { triggerResponse } from "@utils/triggerResponse";
import { Request, Response } from "express";
import { Token } from "../../utils/token";

export async function register(req: Request, res: Response) {
	const { username, password } = req.body;
	const t = new Token(res, req);

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
		if (data.statusCode === 200) {
			t.setToken(data.id as string);
		}

		triggerResponse({
			res,
			code: data.statusCode,
			anyData: {
				...data,
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
