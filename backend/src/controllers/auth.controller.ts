import { Request, Response } from "express";
import { loginRequestSchema } from "../schemas/login/login.schema";
import AuthService from "../services/auth.service";
import { zodParser } from "../utils/zodParser";
import { createUserSchema } from "../schemas";
import statusCodes from "../utils/statusCode";

export class AuthController {
	constructor(private authService: AuthService) {}

	login = async (req: Request, res: Response) => {
		const { body } = await zodParser(loginRequestSchema, req);
		const user = await this.authService.login(body);

		res.status(statusCodes.OK).json({
			message: "Logged in successfully",
			...user,
		});
	};

	register = async (req: Request, res: Response) => {
		const { body } = await zodParser(createUserSchema, req);

		const user = await this.authService.register(body);

		res.status(statusCodes.CREATED).json({
			message: "User created successfully",
			...user,
		});
	};
}
