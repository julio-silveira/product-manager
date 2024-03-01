import { StatusCodes } from "../utils/statusCode";

export interface BaseErrorType extends Error {
	message: string;
	statusCode: StatusCodes;
	errorCode: string;
	error: Record<string, unknown>;
}

export class BaseError extends Error {
	constructor(
		public message: string,
		public statusCode: StatusCodes,
		public errorCode: string,
		public error: Record<string, unknown> = {},
	) {
		super(message);
		Object.assign(this, {
			statusCode,
			errorCode,
			error,
		});
	}
}
