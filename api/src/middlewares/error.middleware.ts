import { BaseError } from "../errors/error";
import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
	error: Error,
	_req: Request,
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

	return res.status(500).json({
		message: error.message,
		errorCode: "internal_server_error",
		error: {},
	});
};

export default errorMiddleware;
