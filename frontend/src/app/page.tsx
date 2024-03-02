"use client";

import useAuthStore from "@/stores/auth.store";
import Login from "./components/Login";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/products");
		}
	}, [isAuthenticated, router]);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight mb-6 lg:text-5xl">
				Product Manager
			</h1>
			<Login />
		</main>
	);
}
