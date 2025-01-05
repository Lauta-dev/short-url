import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AccountAsk } from "./accountAsk";
import { loginUserApi } from "@/const";

import useAuthSubmit from "@/hook/useAuthSubmit";

export default function LoginForm() {
	const { handleSubmit } = useAuthSubmit(loginUserApi);

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>
					Enter your credentials to access your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Username</Label>
						<Input id="username" name="username" type="text" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" name="password" type="password" required />
					</div>
					<Button type="submit" className="w-full">
						Login
					</Button>
				</form>
			</CardContent>

			<AccountAsk
				mention="Sign up"
				path="/register"
				message="Don't you have an account?"
			/>
		</Card>
	);
}
