import { ProductCard } from "@/app/products/components/card";
import { productsApi } from "@/services";

export default async function ProductsGrid() {
	const products = await productsApi.getAll();
	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 gap-4 overflow-y-scroll max-h-[80vh]">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
