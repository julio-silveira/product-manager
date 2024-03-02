import { Sequelize } from "sequelize-typescript";
import * as pg from "pg";
import env from "../config/env";
import Products from "./models/Products.model";
import Users from "./models/Users.model";

export async function loadDatabase() {
	const sequelize = new Sequelize({
		dialect: "postgres",
		dialectModule: pg,
		host: env.DATABASE.HOST,
		port: env.DATABASE.PORT,
		username: env.DATABASE.USER,
		password: env.DATABASE.PASSWORD,
		database: env.DATABASE.DATABASE,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
		models: [Products, Users],
		logging: false,
	});
	await sequelize.authenticate();
	return sequelize;
}
