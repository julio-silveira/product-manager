import { Request, Response } from "express";
import ProductsService from "../services/products.service";

export default class ProductsController {
	constructor(private productsService: ProductsService) {}

	create = async (req: Request, res: Response) => {
		const product = await this.productsService.create(req.body);
		res.status(201).json(product);
	};

	getOne = async (req: Request, res: Response) => {
		const { id } = req.params;
		const product = await this.productsService.getOne(Number(id));
		res.status(200).json(product);
	};

	getAll = async (req: Request, res: Response) => {
		const products = await this.productsService.getAll();
		res.status(200).json(products);
	};
}
