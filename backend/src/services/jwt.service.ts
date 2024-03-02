import jwt from "jsonwebtoken";
import Products from "../database/models/products.model";

export default class JwtService {
	token: string;
	expiration: string;

	constructor(token: string, expiration: string) {
		this.token = token;
		this.expiration = expiration;
	}

	sign(payload: { id: number; email: string; username: string }) {
		return jwt.sign(payload, this.token, { expiresIn: this.expiration });
	}

	verify(token: string) {
		try {
			const payload = jwt.verify(token, this.token);
			return payload;
		} catch (error) {
			return null;
		}
	}
}
