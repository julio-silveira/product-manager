import app from "./app";
import env from "./config/env";
import { loadDatabase } from "./database/db";

const start = async () => {
	let sequelize = null;
	try {
		console.log("Connecting to database...");
		sequelize = await loadDatabase();
		app.listen(env.PORTS.API_PORT, () => {
			console.log(`Server is running on port ${env.PORTS.API_PORT}`);
		});
	} catch (error) {
		if (sequelize) {
			await sequelize.close();
		}
		console.error(error);
		process.exit(1);
	}
};

void start();
