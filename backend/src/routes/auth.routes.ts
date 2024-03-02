import { Router } from "express";
import { AuthController } from "../controllers";
import AuthService from "../services/auth.service";
import JwtService from "../services/jwt.service";
import UsersService from "../services/users.service";
import SecurityService from "../services/security.service";
import env from "../config/env";

const router = Router();

const sercurityService = new SecurityService({
	saltingRounds: 10,
});
const usersService = new UsersService();
const jwtService = new JwtService(
	env.SECRETS.JWT_SECRET,
	env.SECRETS.JWT_EXPIRATION,
);
const service = new AuthService(sercurityService, usersService, jwtService);
const controller = new AuthController(service);

router.post("/login", controller.login);

router.post("/register", controller.register);

export default router;
