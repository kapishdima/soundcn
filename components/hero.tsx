"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeroProps = {
	title: ReactNode;
	description: ReactNode;
	action?: ReactNode;
	aside?: ReactNode;
	children?: ReactNode;
};

export function Hero({
	title,
	description,
	action,
	aside,
	children,
}: HeroProps) {
	const hasAside = Boolean(aside);

	return (
		<section className="relative -mt-20 pt-28 pb-14 sm:pt-32 sm:pb-20 ">
			<div className="container relative">
				<div
					className={cn(
						hasAside &&
							"grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-center lg:gap-14",
					)}
				>
					<div className="flex w-full min-w-0 flex-col items-center justify-center text-center">
						<h1
							className="font-heading text-4xl font-bold text-balance sm:text-5xl lg:text-6xl"
							style={{ animationDelay: "50ms" }}
						>
							{title}
						</h1>

						<p
							className="text-muted-foreground mt-5 max-w-xl text-base text-balance leading-snug sm:text-lg"
							style={{ animationDelay: "100ms" }}
						>
							{description}
						</p>

						<div
							className="mt-7 w-full max-w-full"
							style={{ animationDelay: "150ms" }}
						>
							{action}
						</div>
					</div>

					{hasAside ? <div className="hidden lg:block">{aside}</div> : null}
				</div>
			</div>

			{children ? <div className="container">{children}</div> : null}
		</section>
	);
}
