"use client";

import { AppLogo } from "@/components/app-logo";
import { AppMenu } from "@/components/app-menu";
import { GithubButton } from "@/components/github-button";
import { SponsorButton } from "@/components/sponsor-button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
	return (
		<header className="stagger-fade-up mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
			<AppLogo />

			<div className="flex items-center">
				<AppMenu />

				<div className="flex items-center gap-3">
					<SponsorButton />
					<GithubButton />
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
