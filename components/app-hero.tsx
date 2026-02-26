import type { ReactNode } from "react";
import { HeroBars } from "@/components/hero-bars";

interface AppHeroProps {
	/** Inner content of the pill badge rendered above the title */
	eyebrow?: ReactNode;
	/** Element rendered above the title without badge styling (e.g. breadcrumb) */
	breadcrumb?: ReactNode;
	title: ReactNode;
	description?: ReactNode;
	/** Extra content below the description (tickets, disclaimers, CTAs…) */
	children?: ReactNode;
}

export function AppHero({
	eyebrow,
	breadcrumb,
	title,
	description,
	children,
}: AppHeroProps) {
	const hasLeader = !!(eyebrow || breadcrumb);

	return (
		<section className="relative overflow-hidden px-6 pt-8 pb-14 sm:pt-14 sm:pb-20">
			<HeroBars />

			<div
				className="pointer-events-none absolute -top-48 -left-32 size-[400px] rounded-full bg-primary opacity-[0.07] dark:opacity-[0.12] blur-2xl"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute -bottom-20 -right-12 size-[280px] rounded-full bg-primary opacity-[0.04] dark:opacity-[0.08] blur-3xl"
				aria-hidden="true"
			/>

			<div className="relative mx-auto max-w-6xl">
				{breadcrumb}

				{eyebrow && (
					<div
						className="stagger-fade-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-xs font-medium text-primary mb-6"
						style={{ animationDelay: "30ms" }}
					>
						{eyebrow}
					</div>
				)}

				<h1
					className="stagger-fade-up font-display text-4xl font-bold text-balance sm:text-5xl lg:text-6xl"
					style={{ animationDelay: hasLeader ? "60ms" : "30ms" }}
				>
					{title}
				</h1>

				{description && (
					<p
						className="stagger-fade-up text-muted-foreground mt-5 max-w-lg text-base text-pretty leading-relaxed sm:text-lg"
						style={{ animationDelay: hasLeader ? "110ms" : "80ms" }}
					>
						{description}
					</p>
				)}

				{children}
			</div>
		</section>
	);
}
