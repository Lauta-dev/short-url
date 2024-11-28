import express from "express";
import cors from "cors";
import { limiter } from "./src/controllers/rateLimit";
import router from "./src/routers/getLongUrl";
import postUrlInBb from "./src/routers/PostUrlInDb";

const app = express();
const port = 3001;

// - Express Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options("*", cors()); //Permite todas las preflight requests

// - Middleware
app.use(
	cors({
		origin: "*",
	}),
);
app.use(limiter);

// - routers
app.use(router);
app.use(postUrlInBb);

app.listen(port, () => {
	console.log(`Server listening in port: ${port}`);
});
