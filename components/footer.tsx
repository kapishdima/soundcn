import Link from "next/link";
import { EqLogo } from "@/components/logo";

export function Footer() {
	return (
		<footer className="mt-auto border-t border-border/40">
			<div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
				<div className="flex items-center gap-2">
					<EqLogo />
					<span className="font-display text-sm font-bold">soundcn</span>
				</div>

				<div className="flex items-center gap-6 text-sm text-muted-foreground">
					<Link
						href="/legal"
						className="hover:text-foreground transition-colors duration-150"
					>
						Privacy & Terms
					</Link>
					<a
						href="https://github.com/kapishdima/soundcn"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-foreground transition-colors duration-150"
					>
						GitHub
					</a>
				</div>

				<p className="text-xs text-muted-foreground/50">
					&copy; {new Date().getFullYear()} soundcn. Open source.
				</p>
			</div>
		</footer>
	);
}
