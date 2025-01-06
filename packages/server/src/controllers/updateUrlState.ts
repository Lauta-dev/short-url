import { updateUrlState as updateState } from "@/db/updateUrlState";
import { triggerResponse } from "@utils/triggerResponse";
import { Request, Response } from "express";

interface NewState {
	id: string;
	newState: number;
}

export async function updateUrlState(
	req: Request<{}, {}, NewState>,
	res: Response,
) {
	try {
		const { id, newState } = req.body;
		const userId = req.user as { id: string };

		// TODO: Mejorar el chekeo
		/*if (!id || !newState) {
			triggerResponse({
				res,
				code: 404,
				message: "ID y el nuevo estado son necesarios",
			});
			return;
		}*/

		if (newState > 1) {
			triggerResponse({
				res,
				code: 404,
				message: "El estado no tiene que ser mayor a 1",
			});

			return;
		}

		const data = await updateState({
			id,
			userId: userId.id,
			isActive: newState,
		});

		triggerResponse({
			res,
			code: data.statusCode,
			message: data.message,
			anyData: {
				newUrls: data.urls,
			},
		});
	} catch (error) {
		console.log(error);
		triggerResponse({
			res,
			code: 500,
			message: "Error interno",
		});
	}
}
