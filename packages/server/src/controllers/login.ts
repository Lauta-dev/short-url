import { Request, Response } from "express";
import { getUserById } from "@db/getUserById";
import { accessToken } from "@utils/genAccessToken";
import { triggerResponse } from "@utils/triggerResponse";
import { comparePw } from "@utils/hashPw";

interface PersonModel {
	username: string | undefined;
	password: string | undefined;
}

export async function login(req: Request<{}, {}, PersonModel>, res: Response) {
	const { username, password } = req.body;

	if (!username) {
		triggerResponse({
			res,
			message: "username is required",
			code: 400,
		});
		return;
	}

	if (!password) {
		triggerResponse({
			res,
			message: "password is required",
			code: 400,
		});
		return;
	}

	if (!username && !password) {
		triggerResponse({
			res,
			message: "username and password is required",
			code: 400,
		});
		return;
	}

	const data = await getUserById(username);

	if (!data?.exist) {
		triggerResponse({
			res,
			message: "User not found",
			code: 404,
		});
		return;
	}

	const token = accessToken({
		id: data.id,
	});

	console.log(data);

	const compare = comparePw(password, data.password as string);

	if (!compare) {
		triggerResponse({
			res,
			message: "Invalid password",
			code: 404,
		});

		return;
	}

	triggerResponse({
		res,
		message: "Login",
		code: 200,
		anyData: {
			token,
		},
	});
}
