import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ThemeToggle />
		</main>
	);
}
