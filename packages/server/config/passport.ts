import passportJWT from "passport-jwt";
// Configuración de Passport con JWT
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// Definir la estrategia JWT
const strategy = new JwtStrategy(
	{
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET,
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
