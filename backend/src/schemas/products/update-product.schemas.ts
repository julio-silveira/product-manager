import { z } from "zod";
import { simpleProductSchema } from "./create-product.schemas";

export const updateProductSchema = z.object({
	body: simpleProductSchema.partial(),
	params: z.object({
		id: z.string().transform(Number),
	}),
});

export type UpdateProductSchema = z.output<typeof updateProductSchema>;
