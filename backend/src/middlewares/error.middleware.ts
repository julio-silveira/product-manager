import { BaseError } from "../errors/error";
import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (error instanceof BaseError) {
		return res.status(error.statusCode).json({
			message: error.message,
			errorCode: error.errorCode,
			error: error.error,
		});
	}

	const openDbInstance = req.app.locals.sequelize;
	if (openDbInstance) {
		try {
			openDbInstance.close();
		} catch (error) {
			console.error(error);
		}
		req.app.locals.sequelize = undefined;
		console.info("Database connection closed");
	}

	return res.status(500).json({
		message: error.message,
		errorCode: "internal_server_error",
		error: error.stack,
	});
};

export default errorMiddleware;
