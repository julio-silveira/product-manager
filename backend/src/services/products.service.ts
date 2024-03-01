import { create } from "domain";
import Products from "../database/models/Products";

export default class ProductsService {
	private model = Products;

	async create(data: any) {
		return this.model.create(data);
	}

	async getAll() {
		return this.model.findAll();
	}

	async getOne(id: number) {
		return this.model.findByPk(id);
	}
}
