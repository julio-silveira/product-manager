import { z } from "zod";

export const simpleProductSchema = z.object({
	name: z.string(),
	brand: z.string(),
	model: z.string(),
	price: z.coerce.number(),
	color: z.string(),
});

const detailedProductSchema = z
	.object({
		name: z.string(),
		details: z.object({
			brand: z.string(),
			model: z.string(),
			color: z.string(),
		}),
		price: z.number(),
	})
	.transform((data) => ({
		name: data.name,
		brand: data.details.brand,
		model: data.details.model,
		price: data.price,
		color: data.details.color,
	}));

const multipleColorSchema = z
	.object({
		name: z.string(),
		brand: z.string(),
		model: z.string(),
		data: z.array(
			z.object({
				price: z.number(),
				color: z.string(),
			}),
		),
	})
	.transform((data) => {
		const products = data.data.map((product) => ({
			name: data.name,
			brand: data.brand,
			model: data.model,
			price: product.price,
			color: product.color,
		}));
		return products;
	});

export const createProductSchema = z.object({
	body: z.union([
		simpleProductSchema.transform((data) => [data]),
		detailedProductSchema.transform((data) => [data]),
		z.array(multipleColorSchema).transform((data) => data.flat()),
	]),
});

export type SimpleProductSchema = z.infer<typeof simpleProductSchema>;

export type CreateProductSchema = z.output<typeof createProductSchema>;
