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
			<RegisterForm />
		</main>
	);
}
