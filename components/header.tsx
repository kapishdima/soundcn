"use client";

import { SponsorButton } from "@/app/sponsors/components/sponsor-button";
import { AppLogo } from "@/components/app-logo";
import { AppMenu } from "@/components/app-menu";
import { GithubButton } from "@/components/github-button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
	return (
		<header className="container relative z-10 flex items-center justify-between py-5">
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
