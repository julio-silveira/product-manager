import Products, { ProductAtributes } from "../database/models/Products.model";
import { SimpleProductSchema } from "../schemas/products/create-product.schemas";
import { Op, WhereOptions } from "sequelize";
import { GetProductsSchemaType } from "../schemas/products/get-products-schema";

export default class ProductsService {
	async validateProducts(data: SimpleProductSchema[]) {
		const productKeys = data.map((product) => ({
			brand: product.brand,
			model: product.model,
			color: product.color,
		}));

		const foundProductKeys = await this.getByProductData(productKeys);

		const newProducts = [];
		const alreadyExists = [];

		for (const product of data) {
			const productKey = `${product.brand}-${product.model}-${product.color}`;

			if (foundProductKeys.includes(productKey)) {
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
		const mappedData = data.map((product) => ({
			[Op.and]: {
				brand: product.brand,
				model: product.model,
				color: product.color,
			},
		}));

		const foundProducts = await Products.findAll({
			where: { [Op.or]: mappedData },
		});

		const foundProductsKeys = foundProducts.map((product) => {
			return `${product.brand}-${product.model}-${product.color}`;
		});

		return foundProductsKeys;
	}

	async getAll(params: GetProductsSchemaType) {
		const filters = [];
		if (params.name) {
			filters.push({
				name: {
					[Op.iLike]: `%${params.name}%`,
				},
			});
		}

		if (params.brand) {
			filters.push({
				brand: {
					[Op.iLike]: `%${params.brand}%`,
				},
			});
		}

		if (params.model) {
			filters.push({
				model: {
					[Op.iLike]: `%${params.model}%`,
				},
			});
		}

		if (params.price) {
			filters.push({
				price: params.price,
			});
		}

		if (params.color) {
			filters.push({
				color: {
					[Op.iLike]: `%${params.color}%`,
				},
			});
		}

		const where = filters.length > 0 ? { [Op.and]: filters } : {};

		const products = await Products.findAll({ where });
		return products;
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
