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
import { LoginFormSchema, LoginFormValues } from "@/services/http";
import useAuthStore from "@/stores/auth.store";
import { LoadingButton } from "@/components/ui/loading-button";
import { useEffect } from "react";

export default function Login() {
	const { toast } = useToast();
	const login = useAuthStore((state) => state.login);
	const isLoading = useAuthStore((state) => state.isLoading);
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: LoginFormValues) {
		const { message, success } = await login(data);

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
					Login
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

				<LoadingButton isLoading={isLoading} disabled={isLoading} type="submit">
					Submit
				</LoadingButton>
				<div className="flex items-center justify-center gap-2 w-full text-center">
					<Separator className="w-1/6 lg:w-3/12" />
					<h6 className="w-fit"> {"Don't have account?"}</h6>
					<Separator className="w-1/6 lg:w-3/12" />
				</div>
				<LoadingButton
					isLoading={isLoading}
					disabled={isLoading}
					type="button"
					variant="link"
				>
					Sign up
				</LoadingButton>
			</form>
		</Form>
	);
}
