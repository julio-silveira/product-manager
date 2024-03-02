import bcrypt from "bcrypt";

export default class SecurityService {
	private saltingRounds: number;

	constructor({
		saltingRounds = 10,
	}: {
		saltingRounds?: number;
	}) {
		this.saltingRounds = saltingRounds;
	}

	async encrypt(str: string) {
		const hashedStr = await bcrypt.hash(str, this.saltingRounds);
		return hashedStr;
	}

	async compare(str: string, hash: string) {
		const isSame = await bcrypt.compare(str, hash);
		return isSame;
	}
}
