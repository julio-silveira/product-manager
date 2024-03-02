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
};
