import Form from "@/components/me/Form";
import { NavLink } from "react-router";
import { Layout } from "./layout";

function App() {
	return (
		<Layout>
			<Form />
			<NavLink to="/login">Messages</NavLink>
		</Layout>
	);
}

export default App;
