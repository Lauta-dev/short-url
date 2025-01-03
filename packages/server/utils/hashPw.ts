import { compareSync, genSaltSync, hashSync } from "bcrypt";

function hashPw(password: string) {
	const saltAround = 10;
	const salt = genSaltSync(saltAround);
	const hash = hashSync(password, salt);

	return { salt, hash };
}

function comparePw(userPw: string, hashPw: string) {
	return compareSync(userPw, hashPw);
}

export { hashPw, comparePw };
