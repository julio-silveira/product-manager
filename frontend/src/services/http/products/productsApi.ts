import { AxiosError } from "axios";
import { api } from "../../api";
import {
	ProductResponse,
	CreateOrUpdateProductValues,
	Product,
	GetProductsFilter,
} from "./types";

const COMMON_PATH = "/products";

const getAll = async (params?: GetProductsFilter): Promise<Product[]> => {
	const { data } = await api.get(`${COMMON_PATH}`, { params });
	return data;
};

const create = async (
	product: CreateOrUpdateProductValues,
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

const update = async (
	id: number,
	product: CreateOrUpdateProductValues,
): Promise<ProductResponse> => {
	try {
		const { data } = await api.put(`${COMMON_PATH}/${id}`, product);
		const message = data.message || "Product updated successfully";
		return { message, success: true };
	} catch (e) {
		const err = e as AxiosError<{ message: string }>;
		const message = err?.response?.data?.message || "Failed to update product";

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
	update,
	del,
};

export default productsApi;
