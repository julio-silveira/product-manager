/* eslint-disable react-hooks/exhaustive-deps */
"use client ";
import useProductStore from "@/stores/products.store";
import { CreateProductModal } from "./create-product-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function ActionBar() {
	const products = useProductStore((state) => state.products);
	const isLoading = useProductStore((state) => state.isLoading);
	const fetchProducts = useProductStore((state) => state.fetchProducts);

	return (
		<div className="flex gap-3">
			<Input placeholder="Search by name" />
			<Input placeholder="Search by brand" />
			<Input placeholder="Search by model" />
			<Input placeholder="Search by color" />
			<Input placeholder="Search by price" />
			<Button onClick={fetchProducts}>
				<MagnifyingGlassIcon /> Search
			</Button>
			<CreateProductModal />
		</div>
	);
}
