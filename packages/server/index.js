import express from "express";
import cors from "cors";
import { limiter } from "./src/controllers/rateLimit.js";
import { corsOptions } from "./src/controllers/cors.js";
import getOriginalUrlRouter from "./src/routers/getLongUrl.js";
import postUrlInBb from "./src/routers/PostUrlInDb.js";

const app = express();
const port = 3000;

// - Express Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors()); // Permite todas las preflight requests

// - Middleware
app.use(cors());
app.use(limiter);

// - routers
app.use(getOriginalUrlRouter);
app.use(postUrlInBb);

app.listen(port, () => {
	console.log(`Server listening in port: ${port}`);
});
