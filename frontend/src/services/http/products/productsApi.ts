import { AxiosError } from "axios";
import { api } from "../../api";
import { CreateProductResponse, CreateProductValues, Product } from "./types";

const COMMON_PATH = "/products";

const getAll = async (): Promise<Product[]> => {
	const { data } = await api.get(`${COMMON_PATH}`);
	return data;
};

const create = async (
	product: CreateProductValues,
): Promise<CreateProductResponse> => {
	try {
		const { data } = await api.post(`${COMMON_PATH}`, product);
		const message = data.message || "Product created successfully";
		return { message, success: true };
	} catch (e) {
		const err = e as AxiosError<{ message: string }>;
		const message = err?.response?.data?.message || "Failed to create product";

		return { message, success: false };
	}
};

const del = async (id: string): Promise<void> => {
	const { status } = await api.delete(`${COMMON_PATH}/${id}`);

	if (status !== 204) {
		throw new Error("Failed to delete product, please try again later.");
	}
};

const productsApi = {
	getAll,
	create,
	del,
};

export default productsApi;
