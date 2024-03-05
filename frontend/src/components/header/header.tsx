"use client";

import useAuthStore from "@/stores/auth.store";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ExitIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("../ui/theme-toggle"));

type HeaderProps = {
	title: string;
};

export default function Header({ title }: HeaderProps) {
	const logout = useAuthStore((state) => state.logout);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const checkAuth = useAuthStore((state) => state.checkAuth);
	const user = useAuthStore((state) => state.user);

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
				<h1 className="text-2xl font-extrabold  lg:text-3xl">{title}</h1>
				<div className="flex gap-1 items-center ">
					{user && (
						<h1 className="text-lg font-semibold mr-2">{`User: ${user.username}`}</h1>
					)}
					<ThemeToggle />
					<Button onClick={() => logout()} size="icon">
						<ExitIcon />
					</Button>
				</div>
			</div>
		</header>
	);
}
