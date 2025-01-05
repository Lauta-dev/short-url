interface Login {
	username: string;
	password: string;
}

interface ReturnFetching {
	statusCode: number;
	message: string;
	token: string;
}

export type { Login, ReturnFetching };
