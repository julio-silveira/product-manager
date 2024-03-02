import { api } from "../../api";
import { Product } from "./types";

const COMMON_PATH = "/products";

const getAll = async (): Promise<Product[]> => {
	const { data } = await api.get(`${COMMON_PATH}`);
	return data;
};

const productsApi = {
	getAll,
};

export default productsApi;
