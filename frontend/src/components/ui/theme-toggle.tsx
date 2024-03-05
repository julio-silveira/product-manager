"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
	const { setTheme, theme } = useTheme();

	const isDark = theme === "dark";

	return (
		<Button onClick={() => setTheme(isDark ? "light" : "dark")} size="icon">
			{isDark ? <SunIcon /> : <MoonIcon />}
		</Button>
	);
}
