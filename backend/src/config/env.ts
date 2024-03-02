import dotenv from "dotenv";

dotenv.config();

const DATABASE = {
	HOST: process.env.DB_HOST || "localhost",
	PORT: Number(process.env.DB_PORT) || 3306,
	USER: process.env.DB_USER || "root",
	PASSWORD: process.env.DB_PASSWORD || "root",
	DATABASE: process.env.DB_DATABASE || "test",
};

const SECRETS = {
	JWT_SECRET: process.env.JWT_SECRET || "secret",
	JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
};

export default {
	DATABASE,
	SECRETS,
};
