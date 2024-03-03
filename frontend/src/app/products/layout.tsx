import Header from "@/components/header/header";
import { notFound } from "next/navigation";

interface DashboardLayoutProps {
	children?: React.ReactNode;
}

export default async function DashboardLayout({
	children,
}: DashboardLayoutProps) {
	return (
		<div className="flex min-h-screen flex-col space-y-6">
			<Header title="Products" />
			<main className="container flex w-full flex-col gap-2 ">{children}</main>
		</div>
	);
}
