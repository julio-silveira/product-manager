import axios from "axios";
import { setupInterceptors } from "./setupInterceptors";

export const api = setupInterceptors(
	axios.create({
		baseURL: process.env.API_URL,
	}),
);
