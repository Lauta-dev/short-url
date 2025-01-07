import express from "express";
import cors from "cors";
//import { limiter } from "./config/rateLimit";
import router from "./src/routers/getLongUrl";
import { router as postUrlInBb } from "./src/routers/PostUrlInDb";
import { router as getUserUrls } from "./src/routers/getUserUrls";
import { router as deleteUserUrl } from "./src/routers/deleteUserUrl";
import { router as updateResource } from "./src/routers/updateResource";
import { strategy } from "./config/passport";
import passport from "passport";
import { user } from "./src/routers/user";
import { authMessage } from "./src/middleware/authMessage";

passport.use("jwt", strategy);

const app = express();
const port = 3001;

// - Express Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.options("*", cors());

// - Middleware
app.use(cors());
//app.use(limiter);
app.use(authMessage);

// - routers
app.use(router);
app.use(postUrlInBb);

// - routers (crud)
app.use(getUserUrls);
app.use(deleteUserUrl);
app.use(updateResource);

// - user
app.use(user);

app.listen(port, () => {
	console.log(`Server listening in port: ${port}`);
});
