"use client";

import { CreateProductModal } from "./components/create-product-modal";
import ProductsGrid from "./components/products-grid";

export default function Home() {
	return (
		<>
			<CreateProductModal />
			<ProductsGrid />
		</>
	);
}
