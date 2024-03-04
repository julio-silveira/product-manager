import { GetProductsFilter, Product, productsApi } from "@/services/http";
import { create } from "zustand";

type ProductStore = {
	products: Product[] | undefined;
	isLoading: boolean;
	fetchProducts: (params?: GetProductsFilter) => Promise<void>;
};

const useProductStore = create<ProductStore>((set) => ({
	products: undefined,
	isLoading: false,
	fetchProducts: async (params) => {
		set({ isLoading: true });
		try {
			const result = await productsApi.getAll(params);
			set({ products: result, isLoading: false });
		} catch (error) {
			set({ products: [], isLoading: false });
		}
	},
}));

export default useProductStore;
