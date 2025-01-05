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
import { NavLink } from "react-router";
import { AccountAsk } from "./accountAsk";

export default function RegistrationForm() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would typically send the data to your backend
		console.log("Registration data:", formData);
	};

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
						<Input
							id="username"
							name="username"
							type="text"
							required
							value={formData.username}
							onChange={handleChange}
						/>
					</div>

					<div className="space-y-2 relative">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							required
							value={formData.password}
							onChange={handleChange}
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
					<div className="space-y-2 relative">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type={showPassword ? "text" : "password"}
							required
							value={formData.confirmPassword}
							onChange={handleChange}
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
