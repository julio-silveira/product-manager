import { create } from "domain";
import Products from "../database/models/Products";
import { SimpleProductSchema } from "../schemas/products/create-product.schemas";
import { ProductHashMap, ProductUniqueParams } from "../schemas";
import { Op } from "sequelize";

export default class ProductsService {
	private model = Products;

	async validateProducts(data: SimpleProductSchema[]) {
		const receivedProductNames = [];
		const receivedProductKeys = [];

		for (const product of data) {
			receivedProductNames.push(product.name);
			receivedProductKeys.push({
				brand: product.brand,
				model: product.model,
				color: product.color,
			});
		}

		const foundProductNames = await this.getByNames(receivedProductNames);
		const foundProductKeys = await this.getByProductData(receivedProductKeys);

		console.log(foundProductNames);
		console.log(foundProductKeys);

		const newProducts = [];
		const alreadyExists = [];

		for (const product of data) {
			const productKey = `${product.brand}-${product.model}-${product.color}`;

			if (
				foundProductNames.includes(product.name) ||
				foundProductKeys.includes(productKey)
			) {
				alreadyExists.push(product);
			} else {
				newProducts.push(product);
			}
		}

		return {
			newProducts,
			alreadyExists,
		};
	}

	async create(data: SimpleProductSchema[]) {
		return this.model.bulkCreate(data);
	}

	async getByNames(names: string[]) {
		const foundProducts = await this.model.findAll({ where: { name: names } });

		const foundProductsNames = foundProducts.map((product) => product.name);
		return foundProductsNames;
	}

	async getByProductData(
		data: {
			brand: string;
			model: string;
			color: string;
		}[],
	) {
		const foundProducts = await this.model.findAll({
			where: { [Op.and]: data },
		});

		const foundProductsKeys = foundProducts.map((product) => {
			return `${product.brand}-${product.model}-${product.color}`;
		});

		return foundProductsKeys;
	}

	async getAll() {
		return this.model.findAll();
	}

	async getOne(id: number) {
		return this.model.findByPk(id);
	}

	async update(id: number, data: Partial<SimpleProductSchema>) {
		return this.model.update(data, { where: { id } });
	}
}
