import axios from "axios";
import { setupInterceptors } from "./setupInterceptors";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const api = setupInterceptors(
	axios.create({
		baseURL: API_URL,
	}),
);
