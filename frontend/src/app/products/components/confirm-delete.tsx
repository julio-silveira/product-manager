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
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from "@/components/ui/loading-button";
import revalidateProducts from "../actions";
import { TrashIcon } from "@radix-ui/react-icons";

type Props = {
	id: number;
};

export function ConfirmDelete({ id }: Props) {
	const { toast } = useToast();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleRenderCloseToastError = () => {
		toast({
			title: "Error",
			description:
				"Please wait for the current action to complete before closing the dialog",
			variant: "destructive",
		});
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

		toast({
			title: success ? "Success" : "Error",
			description: message,
			variant: success ? "default" : "destructive",
		});

		if (success) {
			revalidateProducts();
			handleCloseDialog();
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
