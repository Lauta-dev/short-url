import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
	origin: ["http://localhost:8080"],
	credentials: true,
	methods: ["GET", "POST"], // Asegúrate de incluir POST
	allowedHeaders: ["Content-Type", "Authorization"],
};
