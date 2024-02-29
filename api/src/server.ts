import app from "./app";
import env from "./config/env";
import db from "./database/db";

const start = async () => {
	try {
		console.log("Connecting to database...");
		await db.sync({ alter: true });
		app.listen(3000);
		console.log("Server is running on port 3000");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

void start();
