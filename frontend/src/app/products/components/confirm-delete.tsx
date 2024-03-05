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

import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { productsApi } from "@/services";
import { LoadingButton } from "@/components/ui/loading-button";
import { TrashIcon } from "@radix-ui/react-icons";
import useProductStore from "@/stores/products.store";
import { toast } from "react-toastify";

type Props = {
	id: number;
};

export function ConfirmDelete({ id }: Props) {
	const fetchProducts = useProductStore((state) => state.fetchProducts);
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
		setIsOpen(false);
	};

	const handleToggleDialog = () => {
		if (isLoading) {
			handleRenderCloseToastError();
			return;
		}
		setIsOpen((prev) => !prev);
	};

	async function handleDelete() {
		setIsLoading(true);
		const { message, success } = await productsApi.del(id);

		if (success) {
			toast.success(message);
			fetchProducts();
			handleCloseDialog();
		} else {
			toast.error(message);
		}

		setIsLoading(false);
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleToggleDialog}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="bg-red-500 hover:bg-red-800"
				>
					<TrashIcon />
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Confirm delete</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this product?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild>
						<Button disabled={isLoading} variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<LoadingButton
						isLoading={isLoading}
						disabled={isLoading}
						onClick={handleDelete}
					>
						Confirm
					</LoadingButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
