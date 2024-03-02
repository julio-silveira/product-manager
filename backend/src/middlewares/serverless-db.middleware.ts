import { NextFunction, Request, Response } from "express";
import { loadDatabase } from "../database/db";
import { Sequelize } from "sequelize-typescript";
import { BaseError } from "../errors/error";

export interface CustomRequest extends Request {
	sequelize: Sequelize;
}

export const initDb = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const hasConnectionOpen = req.app.locals.sequelize;
		if (!hasConnectionOpen) {
			console.info("Opening database connection");
			req.app.locals.sequelize = await loadDatabase();
			console.info("Database connection opened");
		}
		next();
	} catch (error) {
		next(error);
	}
};
