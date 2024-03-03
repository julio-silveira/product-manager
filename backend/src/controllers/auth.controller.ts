import { Request, Response } from "express";
import { loginRequestSchema } from "../schemas/login/login.schema";
import AuthService from "../services/auth.service";
import { zodParser } from "../utils/zodParser";
import { createUserSchema } from "../schemas";

export class AuthController {
	constructor(private authService: AuthService) {}

	login = async (req: Request, res: Response) => {
		const { body } = await zodParser(loginRequestSchema, req);
		const token = await this.authService.login(body);

		res.json({
			message: "Logged in successfully",
			token,
		});
	};

	register = async (req: Request, res: Response) => {
		const { body } = await zodParser(createUserSchema, req);

		const token = await this.authService.register(body);

		res.status(201).json({
			message: "User created successfully",
			token,
		});
	};
}
