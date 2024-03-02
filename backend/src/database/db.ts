import { Sequelize } from "sequelize-typescript";
import env from "../config/env";
import Products from "./models/Products.model";
import Users from "./models/Users.model";

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
	logging: false,
});

export default sequelize;
