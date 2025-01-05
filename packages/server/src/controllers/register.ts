import { registerUser } from "@/db/registerUser";
import { accessToken } from "@utils/genAccessToken";
import { Request, Response } from "express";

export async function register(req: Request, res: Response) {
	const { username, password } = req.body;

	if (!username) {
		res
			.status(400)
			.json({ statusCode: 400, message: "Es requerido el nombre de usuario" });
		return;
	} else if (!password) {
		res
			.status(400)
			.json({ statusCode: 400, message: "Es requerido la contraseña" });
		return;
	}

	try {
		const data = await registerUser({ username, password });

		// Genera el token si el registro es correcto
		let token = "";
		if (data.statusCode === 200) {
			token = accessToken({ username: req.body.username });
		}

		res.status(data.statusCode).json({ ...data, token: token || undefined, statusCode: data.statusCode });
	} catch (error) {
		// TODO: Manejo de errores, enviar mensaje adecuado
		console.error(error);
		res.status(500).json({ message: "Error en el registro" });
	}
}
