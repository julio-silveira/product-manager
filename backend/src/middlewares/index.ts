import auth from "./auth.middleware";
import error from "./error.middleware";
import { initDb } from "./serverless-db.middleware";

export default {
	auth,
	error,
	connection: {
		open: initDb,
	},
};
