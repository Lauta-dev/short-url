import { Response } from "express";
import { Codes } from "@utils/codes";

interface TriggerResponse {
	message?: string;
	code?: number;
	anyData?: object;
	res: Response;
}

export function triggerResponse({
	res,
	message = "",
	code = 200,
	anyData = {},
}: TriggerResponse) {
	res.status(code).json({
		message: `${message}`,
		...anyData,
		statusCode: code,
	});
}
