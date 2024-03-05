"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	CreateOrUpdateProductSchema,
	CreateOrUpdateProductValues,
} from "@/services/http/products/types";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { productsApi } from "@/services";
import { LoadingButton } from "@/components/ui/loading-button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import useProductStore from "@/stores/products.store";
import { toast } from "react-toastify";

type Props = {
	id: number;
	product: CreateOrUpdateProductValues;
};

export function EditProductModal({ id, product }: Props) {
	const fetchProducts = useProductStore((state) => state.fetchProducts);
	const form = useForm<CreateOrUpdateProductValues>({
		resolver: zodResolver(CreateOrUpdateProductSchema),
		defaultValues: product,
	});
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleRenderCloseToastError = () => {
		toast.error("Please wait for the current action to finish");
	};

	const handleCloseDialog = () => {
		if (isLoading) {
			handleRenderCloseToastError();
			return;
		}
		form.reset();
		setIsOpen(false);
	};

	const handleToggleDialog = () => {
		if (isLoading) {
			handleRenderCloseToastError();
			return;
		}
		form.reset();
		setIsOpen((prev) => !prev);
	};

	async function onSubmit(data: CreateOrUpdateProductValues) {
		setIsLoading(true);
		const { message, success } = await productsApi.update(id, data);

		if (success) {
			toast.success(message);
			fetchProducts();
			handleCloseDialog();
		} else {
			toast.error(message);
		}

		setIsLoading(false);
	}

	useEffect(() => {
		form.reset(product);
	}, [form, product]);

	return (
		<Dialog open={isOpen} onOpenChange={handleToggleDialog}>
			<DialogTrigger asChild>
				<Button size="icon">
					<Pencil2Icon />
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-md">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Update product</DialogTitle>
							<DialogDescription>Update the product details</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product name</FormLabel>
										<FormControl>
											<Input disabled={isLoading} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="brand"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Brand</FormLabel>
										<FormControl>
											<Input disabled={isLoading} {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="model"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Model</FormLabel>
										<FormControl>
											<Input disabled={isLoading} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="color"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Color</FormLabel>
										<FormControl>
											<Input disabled={isLoading} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Price</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												type="number"
												step="0.01"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter>
							<LoadingButton
								isLoading={isLoading}
								disabled={isLoading}
								type="submit"
							>
								Update
							</LoadingButton>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
