import { z } from "zod";

const loginSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export const loginRequestSchema = z.object({
	body: loginSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;

export type LoginRequestSchema = z.infer<typeof loginRequestSchema>;
