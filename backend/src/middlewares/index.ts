import auth from "./auth.middleware";
import error from "./error.middleware";
import syncDb from "./init-db.middleware";
export default { auth, error, syncDb };
