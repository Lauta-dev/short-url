import { loginUserApi } from "@/const";
import AuthForm from "./AuthForm";

export default function LoginForm() {
	return (
		<AuthForm
			endpoint={loginUserApi}
			cardTitle="Iniciar sesión"
			cardDescription="Inicie sesión para acceder a sus urls"
			accountTo="/register"
			accountDescription="¿No tiene una cuenta?"
			accountAskMention="¡Cree una!"
			buttonText="Iniciar sesión"
		/>
	);
}
