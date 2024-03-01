import type { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError, z } from "zod";
import { BaseError } from "../errors/error";
import statusCodes from "./statusCode";

export async function zodParser<T extends AnyZodObject>(
	schema: T,
	req: Request,
): Promise<z.infer<T>> {
	try {
		return schema.parseAsync(req);
	} catch (error) {
		if (error instanceof ZodError) {
			const parsedErrors = error.errors.map((err: z.ZodIssue) => ({
				field: err.path.join("."),
				message: err.message,
				errorCode: err.code.toUpperCase(),
			}));

			throw new BaseError({
				message: "Validation failed",
				statusCode: statusCodes.UNPROCESSABLE_ENTITY,
				errorCode: "validation_error",
				error: { errors: parsedErrors },
			});
		}
		throw new BaseError({
			message: "Internal server error",
			statusCode: statusCodes.INTERNAL_SERVER_ERROR,
			errorCode: "internal_server_error",
			error: {},
		});
	}
}
