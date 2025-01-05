function setToken(token: string) {
	localStorage.setItem("token", token);
}

function getToken() {
	const token = localStorage.getItem("token");

	if (!token) {
		return false;
	}

	return token;
}

export { setToken, getToken };
