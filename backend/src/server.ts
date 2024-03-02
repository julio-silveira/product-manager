import app from "./app";
import env from "./config/env";
import db from "./database/db";

const start = async () => {
	try {
		console.log("Connecting to database...");
		await db.sync();
		app.listen(env.PORTS.API_PORT, () => {
			console.log(`Server is running on port ${env.PORTS.API_PORT}`);
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

void start();
