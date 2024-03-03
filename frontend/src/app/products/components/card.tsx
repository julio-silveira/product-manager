import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Product } from "@/services";
import { currencyFormatter } from "@/utils/formatters";
import { TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { CardLabeledText } from "./card-labeled-text";

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
				<Button size="icon">
					<Pencil2Icon />
				</Button>
				<Button size="icon" className="bg-red-500 hover:bg-red-800">
					<TrashIcon />
				</Button>
			</CardFooter>
		</Card>
	);
}
