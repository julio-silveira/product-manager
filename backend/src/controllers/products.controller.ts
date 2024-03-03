import { Request, Response } from "express";
import ProductsService from "../services/products.service";
import { NotFoundError } from "../errors/NotFoundError";
import { zodParser } from "../utils/zodParser";
import { createProductSchema, updateProductSchema } from "../schemas";
import { BadRequestError } from "../errors/BadRequestError";

export default class ProductsController {
	constructor(private productsService: ProductsService) {}

	create = async (req: Request, res: Response) => {
		const parsedReq = await zodParser(createProductSchema, req);

		const validatedProducts = await this.productsService.validateProducts(
			parsedReq.body,
		);

		if (validatedProducts.newProducts.length === 0) {
			const message =
				validatedProducts.alreadyExists.length > 1
					? "All products already exists."
					: "Product already exists.";

			throw new BadRequestError(message);
		}

		const product = await this.productsService.create(
			validatedProducts.newProducts,
		);

		const notCreated = validatedProducts.alreadyExists.map((product) => {
			return {
				added: false,
				error: "Product already exists",
				brand: product.brand,
				model: product.model,
				color: product.color,
			};
		});

		const created = product.map((product) => {
			return {
				added: true,
				brand: product.brand,
				model: product.model,
				color: product.color,
			};
		});

		res.status(201).json({
			success: true,
			products: [...created, ...notCreated],
		});
	};

	getOne = async (req: Request, res: Response) => {
		const { id } = req.params;
		const product = await this.productsService.getOne(Number(id));

		if (!product) {
			throw new NotFoundError(`Product with id ${id} not found`);
		}

		res.status(200).json(product);
	};

	getAll = async (req: Request, res: Response) => {
		const products = await this.productsService.getAll();

		res.status(200).json(products);
	};

	update = async (req: Request, res: Response) => {
		const parsedReq = await zodParser(updateProductSchema, req);
		const {
			params: { id },
			body,
		} = parsedReq;

		const dbProduct = await this.productsService.getOne(Number(id));

		if (!dbProduct) {
			throw new NotFoundError(`Product with id ${id} not found`);
		}

		const product = await this.productsService.update(Number(id), body);

		if (!product) {
			throw new NotFoundError(`Product with id ${id} not found`);
		}

		res.status(200).json(product);
	};
}
