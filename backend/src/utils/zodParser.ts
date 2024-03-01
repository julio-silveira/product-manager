import type { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError, z } from "zod";
import { BaseError } from "../errors/error";
import statusCodes from "./statusCode";

export async function zodParser<T extends AnyZodObject>(
	schema: T,
	req: Request,
): Promise<z.infer<T>> {
	try {
		const parsedData = await schema.parseAsync(req);
		return parsedData;
	} catch (error) {
		if (error instanceof ZodError) {
			throw new BaseError({
				message: "Validation failed",
				statusCode: statusCodes.UNPROCESSABLE_ENTITY,
				errorCode: "validation_error",
				error: { errors: error.errors },
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
