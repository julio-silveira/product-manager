"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { RegisterFormSchema, RegisterFormValues } from "@/services/http";
import useAuthStore from "@/stores/auth.store";
import { LoadingButton } from "@/components/ui/loading-button";

export default function RegisterForm() {
	const { toast } = useToast();
	const register = useAuthStore((state) => state.register);
	const isLoading = useAuthStore((state) => state.isLoading);
	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(RegisterFormSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(data: RegisterFormValues) {
		const { message, success } = await register(data);

		toast({
			title: success ? "Success" : "Error",
			description: message,
			variant: success ? "default" : "destructive",
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid gap-4 w-10/12 lg:w-2/6 py-4"
			>
				<h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight mb-4 lg:text-3xl">
					Register
				</h1>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input type="email" id="email" {...field} placeholder="Email" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="text"
									id="username"
									{...field}
									placeholder="Username"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="password"
									id="password"
									{...field}
									placeholder="Password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="password"
									id="confirmPassword"
									{...field}
									placeholder="Confirm Password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<LoadingButton isLoading={isLoading} disabled={isLoading} type="submit">
					Submit
				</LoadingButton>
				<div className="flex items-center justify-center gap-2 w-full text-center">
					<Separator className="w-1/6 lg:w-4/12" />
					<h6 className="w-fit">Have an account?</h6>
					<Separator className="w-1/6 lg:w-4/12" />
				</div>
				<LoadingButton
					isLoading={false}
					disabled={isLoading}
					type="button"
					variant="link"
				>
					Login
				</LoadingButton>
			</form>
		</Form>
	);
}
