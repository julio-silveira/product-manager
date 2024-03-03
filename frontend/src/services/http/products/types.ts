import { z } from "zod";

export const CreateOrUpdateProductSchema = z.object({
	name: z.string().min(3, { message: "Name must be at least 3 characters" }),
	brand: z.string().min(3, { message: "Brand must be at least 3 characters" }),
	model: z.string().min(3, { message: "Model must be at least 3 characters" }),
	price: z.coerce.number().min(0, { message: "Price must be at least 0" }),
	color: z.string().min(3, { message: "Color must be at least 3 characters" }),
});

export type CreateOrUpdateProductValues = z.infer<
	typeof CreateOrUpdateProductSchema
>;

export type ProductResponse = {
	message: string;
	success: boolean;
};

export interface Product {
	id: number;
	name: string;
	brand: string;
	model: string;
	price: number;
	color: string;
	createdAt: string;
	updatedAt: string;
}
