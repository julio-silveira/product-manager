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

	if (products === undefined) {
		return null;
	}

	if (products.length === 0) {
		return (
			<div className="flex items-center justify-center w-full h-20">
				<h1 className="text-2xl font-extrabold  lg:text-3xl">
					No products found!
				</h1>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-scroll max-h-[80vh] pb-8">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
