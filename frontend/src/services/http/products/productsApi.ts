import { AxiosError } from "axios";
import { api } from "../../api";
import { ProductResponse, CreateProductValues, Product } from "./types";

const COMMON_PATH = "/products";

const getAll = async (): Promise<Product[]> => {
	const { data } = await api.get(`${COMMON_PATH}`);
	return data;
};

const create = async (
	product: CreateProductValues,
): Promise<ProductResponse> => {
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

const del = async (id: number): Promise<ProductResponse> => {
	const { status } = await api.delete(`${COMMON_PATH}/${id}`);

	if (status !== 204) {
		return {
			message: "Failed to delete product, please try again later.",
			success: false,
		};
	}

	return {
		message: "Product deleted successfully",
		success: true,
	};
};

const productsApi = {
	getAll,
	create,
	del,
};

export default productsApi;
