import passport from "passport";

// Middleware personalizado
const authenticateJWT = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user, info) => {
		if (err) return next(err); // Maneja errores de Passport
		if (!user) return res.status(401).json({ message: "Acceso no autorizado" }); // Sin usuario

		req.user = user; // Añade el usuario al objeto req para usarlo en el controlador
		next(); // Continúa al siguiente middleware o controlador
	})(req, res, next);
};

export { authenticateJWT };
