import Products from "@/components/products/products";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default async function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ThemeToggle />
			<Products />
		</main>
	);
}
