import { NextFunction, Request, Response } from "express";

export function authMessage(err, req, res, next) {
	if (err.name === "UnauthorizedError") {
		// Enviar un mensaje personalizado en caso de fallo en la autenticación
		return res
			.status(401)
			.json({ message: "No estás autenticado o el token ha expirado." });
	}
	next(err); // Llamar al siguiente manejador de errores
}
