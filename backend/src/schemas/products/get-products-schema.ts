import { z } from "zod";

export const GetProductsSchema = z.object({
	name: z.string().optional(),
	brand: z.string().optional(),
	model: z.string().optional(),
	price: z.coerce.number().optional(),
	color: z.string().optional(),
});

export const GetProductsRequest = z.object({
	query: GetProductsSchema,
});

export type GetProductsSchemaType = z.infer<typeof GetProductsSchema>;

export type GetProductsRequestType = z.infer<typeof GetProductsRequest>;
