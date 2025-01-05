import { registerUserApi } from "@/const";
import AuthForm from "./AuthForm";

export default function RegistrationForm({}) {
	return (
		<AuthForm
			endpoint={registerUserApi}
			cardTitle="Crear cuenta"
			cardDescription="Cree una cuenta para ver y reactivar sus urls"
			accountTo="/login"
			accountDescription="¿Ya tiene una cuenta?"
			accountAskMention="Inicie sesión"
			buttonText="Crear cuenta"
		/>
	);
}
