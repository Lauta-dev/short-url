import { useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";
import { AccountAsk } from "./accountAsk";
import useAuthSubmit from "@/hook/useAuthSubmit";
import { registerUserApi } from "@/const";

export default function RegistrationForm() {
	const [showPassword, setShowPassword] = useState(false);
	const { handleSubmit } = useAuthSubmit(registerUserApi);

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Register</CardTitle>
				<CardDescription>Create a new account</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="username">Username</Label>
						<Input id="username" name="username" type="text" required />
					</div>

					<div className="space-y-2 relative">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							required
						/>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="absolute right-0 top-6"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Eye className="h-4 w-4" />
							)}
						</Button>
					</div>
					<Button type="submit" className="w-full">
						Register
					</Button>
				</form>

				<AccountAsk
					mention="Log in"
					path="/login"
					message="Do you have an account?"
				/>
			</CardContent>
		</Card>
	);
}
