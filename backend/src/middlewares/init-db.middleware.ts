import { NextFunction, Request, Response } from "express";
import db from "../database/db";

const syncDb = async (req: Request, res: Response, next: NextFunction) => {
	try {
		db.sync();
		next();
	} catch (error) {
		next(error);
	}
};

export default syncDb;
