import { NavLink } from "react-router";

interface AccountAskI {
	message: string;
	path: "/login" | "/register";
	mention: string;
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
