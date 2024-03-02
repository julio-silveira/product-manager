import { NextFunction, Request, Response } from "express";
import { loadDatabase } from "../database/db";
import { Sequelize } from "sequelize-typescript";

export interface CustomRequest extends Request {
	sequelize: Sequelize;
}

export const initDb = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		console.info("Openig database connection");
		const sequelizeInstance = await loadDatabase();
		(req as CustomRequest).sequelize = sequelizeInstance;
		console.info("Database connection opened");
		next();
	} catch (error) {
		next(error);
	}
};

export const closeDb = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		console.info("Closing database connection");
		const { sequelize } = req as CustomRequest;
		if (sequelize) {
			await sequelize.close();
		}

		next();
	} catch (error) {
		next(error);
	}
};
