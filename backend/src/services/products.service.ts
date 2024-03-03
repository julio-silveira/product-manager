import Products from "../database/models/Products.model";
import { SimpleProductSchema } from "../schemas/products/create-product.schemas";
import { Op } from "sequelize";

export default class ProductsService {
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
		return Products.bulkCreate(data);
	}

	async getByNames(names: string[]) {
		const foundProducts = await Products.findAll({ where: { name: names } });

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
		const foundProducts = await Products.findAll({
			where: { [Op.and]: data },
		});

		const foundProductsKeys = foundProducts.map((product) => {
			return `${product.brand}-${product.model}-${product.color}`;
		});

		return foundProductsKeys;
	}

	async getAll() {
		return Products.findAll();
	}

	async getOne(id: number) {
		return Products.findByPk(id);
	}

	async update(id: number, data: Partial<SimpleProductSchema>) {
		return Products.update(data, { where: { id } });
	}

	async delete(id: number) {
		return Products.destroy({ where: { id } });
	}
}
