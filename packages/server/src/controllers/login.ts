import { Request, Response } from "express";
import { triggerResponse } from "@utils/triggerResponse";
import { comparePw } from "@utils/hashPw";
import { getUserByUsername } from "@/db/getUserByUsername";
import { Token } from "@utils/token";

interface PersonModel {
	username: string | undefined;
	password: string | undefined;
}

export async function login(req: Request<{}, {}, PersonModel>, res: Response) {
	try {
		const { username, password } = req.body;

		const t = new Token(res, req);

		if (!username) {
			triggerResponse({
				res,
				message: "El nombre de usuario es requerido",
				code: 400,
			});
			return;
		}

		if (!password) {
			triggerResponse({
				res,
				message: "La contraseña es requerida",
				code: 400,
			});
			return;
		}

		if (!username && !password) {
			triggerResponse({
				res,
				message: "El nombre de usuario y contraseña son requeridos",
				code: 400,
			});
			return;
		}

		const data = await getUserByUsername(username);

		if (!data?.exist) {
			triggerResponse({
				res,
				message: "Usuario no encontrado",
				code: 404,
			});
			return;
		}

		t.setToken(data.id as string);

		const compare = comparePw(password, data.password as string);

		if (!compare) {
			triggerResponse({
				res,
				message: "Contraseña invalida",
				code: 404,
			});

			return;
		}

		triggerResponse({
			res,
			message: "Login",
			code: 200,
		});
	} catch (error) {
		const err = error as Error;
		triggerResponse({
			res,
			message: "Error: " + err.message,
			code: 500,
		});
	}
}
