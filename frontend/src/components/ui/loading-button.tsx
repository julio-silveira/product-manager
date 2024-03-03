import { Loader2 } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";

interface LoadingButtonProps extends ButtonProps {
	isLoading: boolean;
}

export const LoadingButton = ({
	isLoading,
	children,
	...props
}: LoadingButtonProps) => {
	return (
		<Button {...props}>
			<div className="flex gap-1 justify-center items-center">
				{isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
				{children}
			</div>
		</Button>
	);
};
