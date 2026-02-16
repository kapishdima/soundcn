import { Github } from "lucide-react";
import { EqLogo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
	return (
		<header className="stagger-fade-up mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
			<div className="flex items-center gap-2.5">
				<EqLogo />
				<span className="font-display text-lg font-bold">soundcn</span>
			</div>
			<div className="flex items-center gap-4">
				<a
					href="https://github.com/kapishdima/soundcn"
					target="_blank"
					rel="noopener noreferrer"
					className="text-muted-foreground hover:text-foreground transition-colors"
					aria-label="GitHub"
				>
					<Github className="size-5" aria-hidden="true" />
				</a>
				<ThemeToggle />
			</div>
		</header>
	);
}
