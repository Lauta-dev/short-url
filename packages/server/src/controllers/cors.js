var whitelist = ["https://short-url-clien.vercel.app/"];

export const corsOptions = {
	origin: whitelist[0],
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
