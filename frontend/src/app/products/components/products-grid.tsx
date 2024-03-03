/* eslint-disable react-hooks/exhaustive-deps */
"use client ";
import { ProductCard } from "@/app/products/components/card";
import useProductStore from "@/stores/products.store";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function ProductsGrid() {
	const products = useProductStore((state) => state.products);
	const isLoading = useProductStore((state) => state.isLoading);
	const fetchProducts = useProductStore((state) => state.fetchProducts);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchProducts();
	}, []);

	if (isLoading) {
		return <Loader2 className="w-10 h-10 m-auto animate-spin" />;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-scroll max-h-[80vh]">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
