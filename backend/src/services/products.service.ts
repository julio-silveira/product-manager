import { create } from "domain";
import Products from "../database/models/Products";
import { SimpleProductSchema } from "../schemas/product.schemas";

export default class ProductsService {
	private model = Products;

	async create(data: SimpleProductSchema[]) {
		return this.model.bulkCreate(data);
	}

	async getAll() {
		return this.model.findAll();
	}

	async getOne(id: number) {
		return this.model.findByPk(id);
	}
}
