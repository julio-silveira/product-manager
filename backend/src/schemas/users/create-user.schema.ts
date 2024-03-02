import { z } from "zod";

export const userSchema = z.object({
	email: z.string(),
	username: z.string(),
	password: z.string(),
});

export const createUserSchema = z.object({
	body: userSchema,
});

export type UserSchema = z.infer<typeof userSchema>;

export type CreateUserSchema = z.infer<typeof createUserSchema>;
