import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import env from "../config/env";
import JwtService from "../services/jwt.service";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export interface CustomRequest extends Request {
	token: string | JwtPayload;
}

const jwtService = new JwtService(
	env.SECRETS.JWT_SECRET,
	env.SECRETS.JWT_EXPIRATION,
);

const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header("Authorization")?.replace("Bearer ", "");
		if (!token) {
			throw new UnauthorizedError("Unauthorized");
		}
		const decoded = jwtService.verify(token);
		if (!decoded) {
			throw new UnauthorizedError("Unauthorized");
		}

		(req as CustomRequest).token = decoded;

		next();
	} catch (error) {
		next(error);
	}
};

export default auth;
