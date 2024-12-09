let prefix =
	process.env.NODE_ENV === "production"
		? "https://short-url-server.vercel.app"
		: "http://localhost:3001";

const path = "/api/url";

// NOTE: estoy pensando evitar llenar todo el array.
// por ejemplo: si el user quiere crear una url a las 18:00 el array SOLO contendra
// los horarios de 18,19,20...
const hours = Array.from({ length: 24 }, (_, i) =>
	i.toString().padStart(2, "0"),
);
const minutes = Array.from({ length: 60 }, (_, i) =>
	i.toString().padStart(2, "0"),
);

export const apiUrl = prefix + path;
export const time = { hours, minutes };
