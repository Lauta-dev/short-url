import { Request } from "express";
import passportJWT from "passport-jwt";
// Configuración de Passport con JWT
const JwtStrategy = passportJWT.Strategy;

// Definir la estrategia JWT
const strategy = new JwtStrategy(
	{
		jwtFromRequest: (req: Request) => {
			let token = "";

			if (req && req.cookies) {
				token = req.cookies.token;
			}

			return token;
		},
		secretOrKey: process.env.JWT_SECRET as string,
	},
	(jwtPayload, done) => {
		const user = jwtPayload;
		console.log({ jwtPayload });
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	},
);

export { strategy };
