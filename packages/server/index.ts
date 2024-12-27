import express from "express";
import cors from "cors";
import { limiter } from "./config/rateLimit";
import router from "./src/routers/getLongUrl";
import postUrlInBb from "./src/routers/PostUrlInDb";
import { router as getUserUrls } from "./src/routers/getUserUrls";
import { router as deleteUserUrl } from "./src/routers/deleteUserUrl";
import { checkIfUserExist } from "./src/db/checkIfUserExist";
import { isOk } from "./utils/isOk";

const app = express();
const port = 3001;

// - Express Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options("*", cors()); // Permite todas las preflight requests

// - Middleware
app.use(cors());
app.use(limiter);

// - routers
app.use(router);
app.use(postUrlInBb);

// - routers (crud)
app.use(getUserUrls);
app.use(deleteUserUrl);

app.get("/", async (req, res) => {
	const { status, message, resultData } = await checkIfUserExist("lautaaa");

	if (!isOk(status)) {
		res.status(status).json({
			status,
			message,
		});
		return;
	}

	res.json({
		status,
		resultData,
	});
});

app.listen(port, () => {
	console.log(`Server listening in port: ${port}`);
});
