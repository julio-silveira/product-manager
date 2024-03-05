"use client";

import useAuthStore from "@/stores/auth.store";
import RegisterForm from "./components/register-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const checkAuth = useAuthStore((state) => state.checkAuth);
	const router = useRouter();

	useEffect(() => {
		checkAuth();
		if (isAuthenticated) {
			router.push("/products");
		}
	}, [isAuthenticated, router, checkAuth]);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight mb-6 lg:text-5xl">
				Product Manager
			</h1>
			<RegisterForm />
		</main>
	);
}
