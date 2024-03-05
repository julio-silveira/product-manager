import UsersService from "./users.service";
import SecurityService from "./security.service";
import { NotFoundError } from "../errors/NotFoundError";
import JwtService from "./jwt.service";
import { LoginSchema } from "../schemas/login/login.schema";
import { UserSchema } from "../schemas";
import { BadRequestError } from "../errors/BadRequestError";

export default class AuthService {
	constructor(
		private securityService: SecurityService,
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async login(data: LoginSchema) {
		const user = await this.usersService.getByEmail(data.email);

		if (!user) {
			throw new NotFoundError("Email or password is incorrect");
		}

		const isSame = await this.securityService.compare(
			data.password,
			user.password,
		);

		if (!isSame) {
			throw new NotFoundError("Email or password is incorrect");
		}

		const token = this.jwtService.sign({
			id: user.id,
			email: user.email,
			username: user.username,
		});

		return {
			token,
			user: {
				id: user.id,
				email: user.email,
				username: user.username,
			},
		};
	}

	async register(data: UserSchema) {
		const isEmailTaken = await this.usersService.getByEmail(data.email);

		if (isEmailTaken) {
			throw new BadRequestError("Email is unavailable!");
		}

		const hashedPassword = await this.securityService.encrypt(data.password);

		const user = await this.usersService.create({
			email: data.email,
			username: data.username,
			password: hashedPassword,
		});

		const token = this.jwtService.sign({
			id: user.id,
			email: user.email,
			username: user.username,
		});

		return {
			token,
			user: {
				id: user.id,
				email: user.email,
				username: user.username,
			},
		};
	}
}
