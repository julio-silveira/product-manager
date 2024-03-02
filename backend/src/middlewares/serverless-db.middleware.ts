import { NextFunction, Request, Response } from "express";
import { loadDatabase } from "../database/db";

export const initDb = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const sequelizeInstance = await loadDatabase();
		res.locals.sequelize = sequelizeInstance;
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
		const sequelizeInstance = res.locals.sequelize;
		await sequelizeInstance.close();
		next();
	} catch (error) {
		next(error);
	}
};
