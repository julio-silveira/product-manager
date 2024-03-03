import * as React from "react";

import { CardDescription, CardTitle } from "@/components/ui/card";

type Props = {
	label: string;
	content: string;
};

export function CardLabeledText({ label, content }: Props) {
	return (
		<div className="flex gap-x-1">
			<CardTitle>{`${label}: `}</CardTitle>
			<CardDescription>{content}</CardDescription>
		</div>
	);
}
