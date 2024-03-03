"use client";

import useAuthStore from "@/stores/auth.store";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/theme-toggle";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type HeaderProps = {
	title: string;
};

export default function Header({ title }: HeaderProps) {
	const logout = useAuthStore((state) => state.logout);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const checkAuth = useAuthStore((state) => state.checkAuth);

	const router = useRouter();

	useEffect(() => {
		checkAuth();
		if (!isAuthenticated) {
			router.push("/");
		}
	}, [checkAuth, isAuthenticated, router]);

	return (
		<header className="sticky top-0 z-40 border-b bg-background">
			<div className="container flex h-16 items-center justify-between py-4">
				{title}
				<div className="flex space-x-4">
					<ThemeToggle />
					<Button onClick={() => logout()}>Logout</Button>
				</div>
			</div>
		</header>
	);
}
