import { productsApi } from "@/services";

export default async function Products() {
	const products = await productsApi.getAll();
	return <pre>{JSON.stringify(products, null, 2)}</pre>;
}
