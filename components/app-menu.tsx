import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClickableWithSound } from "@/components/clickable-with-sound";
import { MENU } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const AppMenu = () => {
	const pathname = usePathname();

	return (
		<nav
			className="hidden sm:flex items-center gap-1 pr-10"
			aria-label="Primary navigation"
		>
			{MENU.map(({ href, label }) => (
				<ClickableWithSound key={href}>
					<Link
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
				</ClickableWithSound>
			))}
		</nav>
	);
};
