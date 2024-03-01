import { StatusCodes } from "../utils/statusCode";

export interface BaseErrorType extends Error {
	message: string;
	statusCode: StatusCodes;
	errorCode: string;
	error: Record<string, unknown>;
}

export class BaseError extends Error {
	public statusCode: StatusCodes;
	public errorCode: string;
	public error?: Record<string, unknown>;

	constructor({
		message,
		statusCode,
		errorCode,
		error,
	}: {
		message: string;
		statusCode: StatusCodes;
		errorCode: string;
		error?: Record<string, unknown>;
	}) {
		super(message);
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.error = error;
	}
}
