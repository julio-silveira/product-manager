import auth from "./auth.middleware";
import error from "./error.middleware";
import { initDb, closeDb } from "./serverless-db.middleware";

export default {
	auth,
	error,
	connection: {
		open: initDb,
		close: closeDb,
	},
};
