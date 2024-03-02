import { Sequelize } from "sequelize-typescript";
import env from "../config/env";
import Products from "./models/products.model";
import Users from "./models/users.model";

const sequelize = new Sequelize({
	dialect: "postgres",
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

export default sequelize;