import * as React from "react";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Product } from "@/services";
import { currencyFormatter } from "@/utils/formatters";
import { CardLabeledText } from "./card-labeled-text";
import { ConfirmDelete } from "./confirm-delete";
import { EditProductModal } from "./edit-product-modal";

type Props = {
	product: Product;
};

export function ProductCard({ product }: Props) {
	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between">
					<CardTitle>{product.name}</CardTitle>
					<CardLabeledText
						label="Price"
						content={currencyFormatter.format(product.price)}
					/>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between">
					<CardLabeledText label="Model" content={product.model} />

					<CardLabeledText label="Brand" content={product.brand} />
				</div>
				<div className="flex justify-between">
					<CardLabeledText label="color" content={product.color} />
				</div>
			</CardContent>
			<CardFooter className="flex justify-end gap-2">
				<EditProductModal product={product} id={product.id} />
				<ConfirmDelete id={product.id} />
			</CardFooter>
		</Card>
	);
}
