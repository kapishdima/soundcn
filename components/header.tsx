"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EqLogo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
// import { SPONSOR_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
	const pathname = usePathname();

	return (
		<header className="stagger-fade-up mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
			<Link href="/" className="flex items-center gap-2.5">
				<EqLogo />
				<span className="font-display text-lg font-bold">soundcn</span>
			</Link>

			<div className="flex items-center">
				<nav
					className="hidden sm:flex items-center gap-1 pr-10"
					aria-label="Primary navigation"
				>
					{(
						[
							{ href: "/collections", label: "Collections" },
							{ href: "/roadmap", label: "Roadmap" },
							{ href: "/sponsors", label: "Sponsors" },
						] as const
					).map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							aria-current={pathname === href ? "page" : undefined}
							className={cn(
								"px-3 py-1.5 text-sm font-medium transition-colors duration-150",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded-sm",
								pathname === href
									? "text-primary"
									: "text-muted-foreground hover:text-foreground",
							)}
						>
							{label}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-3">
					{/* <a
						href={SPONSOR_URL}
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							"inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
							"border border-primary/30 bg-primary/[0.08] text-primary",
							"hover:bg-primary/[0.14] hover:border-primary/50 transition-all duration-150",
							"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
						)}
						aria-label="Sponsor soundcn"
					>
						<Heart className="size-3 fill-current" aria-hidden="true" />
						Sponsor
					</a> */}
					<a
						href="https://github.com/kapishdima/soundcn"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-foreground transition-colors"
						aria-label="View soundcn on GitHub"
					>
						<Github className="size-5" aria-hidden="true" />
					</a>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
