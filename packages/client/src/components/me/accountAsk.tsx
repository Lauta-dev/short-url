import { NavLink } from "react-router";

interface AccountAskI {
	message: "Do you have an account?" | "Don't you have an account?";
	path: "/login" | "/register";
	mention: "Log in" | "Sign up";
}

export function AccountAsk({ message, path, mention }: AccountAskI) {
	return (
		<div className="py-4 text-center">
			<p>
				{message}{" "}
				<NavLink to={path} className="font-bold hover:underline">
					{mention}
				</NavLink>
			</p>
		</div>
	);
}
