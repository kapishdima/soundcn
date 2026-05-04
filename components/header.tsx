"use client";

import { SponsorButton } from "@/app/sponsors/components/sponsor-button";
import { AppLogo } from "@/components/app-logo";
import { AppMenu } from "@/components/app-menu";
import { GithubButton } from "@/components/github-button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
	return (
		<header className="container relative z-10 flex items-center justify-between gap-3 py-4 sm:py-5">
			<AppLogo />

			<div className="flex items-center gap-1 sm:gap-2">
				<AppMenu />

				<div className="flex items-center gap-1.5 sm:gap-3">
					<SponsorButton />
					<GithubButton />
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
