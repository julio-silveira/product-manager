import { Request, Response } from "express";
import ProductsService from "../services/products.service";
import { NotFoundError } from "../errors/NotFoundError";
import { zodParser } from "../utils/zodParser";
import { createProductSchema } from "../schemas/product.schemas";

export default class ProductsController {
	constructor(private productsService: ProductsService) {}

	create = async (req: Request, res: Response) => {
		const parsedReq = await zodParser(createProductSchema, req);
		const product = await this.productsService.create(parsedReq.body);

		res.status(201).json(product);
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
}
