import { BaseError } from "./error";

export class UnauthorizedError extends BaseError {
	constructor(message: string) {
		super({
			message,
			statusCode: 401,
			errorCode: "unauthorized",
		});
	}
}
