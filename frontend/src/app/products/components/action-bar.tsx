/* eslint-disable react-hooks/exhaustive-deps */
"use client ";
import useProductStore from "@/stores/products.store";
import { CreateProductModal } from "./create-product-modal";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon, EraserIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetProductsFilter, GetProductsFilterShcema } from "@/services";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";

export default function ActionBar() {
	const form = useForm<GetProductsFilter>({
		resolver: zodResolver(GetProductsFilterShcema),
		defaultValues: {
			name: "",
			brand: "",
			model: "",
			price: "",
			color: "",
		},
	});
	const isLoading = useProductStore((state) => state.isLoading);
	const fetchProducts = useProductStore((state) => state.fetchProducts);

	const onSubmit = (data: GetProductsFilter) => {
		fetchProducts(data);
	};

	return (
		<div className="flex gap-3  flex-col md:flex-row">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex gap-2 flex-col md:flex-row"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex flex-1">
								<FormControl>
									<Input
										placeholder="Search by name"
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="brand"
						render={({ field }) => (
							<FormItem className="flex flex-1">
								<FormControl>
									<Input
										placeholder="Search by brand"
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="model"
						render={({ field }) => (
							<FormItem className="flex flex-1">
								<FormControl>
									<Input
										placeholder="Search by model"
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem className="flex flex-1">
								<FormControl>
									<Input
										type="number"
										placeholder="Search by price"
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="color"
						render={({ field }) => (
							<FormItem className="flex flex-1">
								<FormControl>
									<Input
										placeholder="Search by color"
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type="button" onClick={() => form.reset()}>
						<EraserIcon />
					</Button>

					<LoadingButton
						isLoading={isLoading}
						disabled={isLoading}
						type="submit"
					>
						<MagnifyingGlassIcon />
					</LoadingButton>
				</form>
			</Form>

			<CreateProductModal />
		</div>
	);
}
