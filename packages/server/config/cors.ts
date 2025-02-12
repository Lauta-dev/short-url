import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
	origin: ["http://localhost:8080"],
	credentials: true,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
};
