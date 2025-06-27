import express from "express";
import cors from "cors";
import { limiter } from "./config/rateLimit";
import { getLongUrl } from "./src/routers/getLongUrl";
import { router as postUrlInBb } from "./src/routers/PostUrlInDb";
import { router as getUserUrls } from "./src/routers/getUserUrls";
import { router as deleteUserUrl } from "./src/routers/deleteUserUrl";
import { router as updateResource } from "./src/routers/updateResource";
import { strategy } from "./config/passport";
import passport from "passport";
import { user } from "./src/routers/user";
import { authMessage } from "./src/middleware/authMessage";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/cors";
import { verifyJwt } from "./src/routers/verifyJwt";

passport.use("jwt", strategy);

const app = express();
const port = 3001;

// - Express Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// - Middleware
app.use(cookieParser());
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(limiter);
app.use(authMessage);

// - routers
app.use(getLongUrl);
app.use(verifyJwt);

// - routers (crud)
app.use(postUrlInBb);
app.use(getUserUrls);
app.use(deleteUserUrl);
app.use(updateResource);

// - user
app.use(user);

app.listen(port, () => {
	console.log(`Server listening in port: ${port}`);
});
