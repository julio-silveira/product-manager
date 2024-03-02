import { create } from "domain";
import Products from "../database/models/products.model";
import { SimpleProductSchema } from "../schemas/products/create-product.schemas";
import { ProductHashMap, ProductUniqueParams } from "../schemas";
import { Op } from "sequelize";
import Users from "../database/models/users.model";

export default class UsersService {
	private model = Users;

	async create(data: { email: string; username: string; password: string }) {
		return this.model.create(data);
	}

	async getByEmail(email: string) {
		return this.model.findOne({ where: { email } });
	}

	async getById(id: number) {
		const user = await this.model.findByPk(id);

		if (!user) {
			return null;
		}

		return {
			id: user.id,
			email: user.email,
			username: user.username,
		};
	}
}
