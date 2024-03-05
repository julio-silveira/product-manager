import { z } from "zod";

export const LoginFormSchema = z.object({
	email: z.string().email({
		message: "Invalid email address",
	}),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;

export type LoginResult = {
	message: string;
	token: string;
	user: UserInterface;
};

export const RegisterFormSchema = z
	.object({
		email: z.string().email({
			message: "Invalid email address",
		}),
		username: z.string(),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" }),
		confirmPassword: z.string(),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: "custom",
				message: "Passwords do not match",
				path: ["confirmPassword"],
			});
		}
	});

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

export interface UserInterface {
	id: number;
	email: string;
	username: string;
}
