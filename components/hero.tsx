"use client";

import type { ReactNode } from "react";

type HeroProps = {
	title: ReactNode;
	description: ReactNode;
	action?: ReactNode;
	children?: ReactNode;
};

export function Hero({ title, description, action, children }: HeroProps) {
	return (
		<section className="relative -mt-20 pt-28 pb-14 sm:pt-32 sm:pb-20 ">
			<div className="container relative">
				<h1
					className="font-heading text-4xl font-bold text-balance sm:text-5xl lg:text-6xl"
					style={{ animationDelay: "50ms" }}
				>
					{title}
				</h1>

				<p
					className="text-muted-foreground mt-5 max-w-xl text-base text-balance leading-tight sm:text-lg"
					style={{ animationDelay: "100ms" }}
				>
					{description}
				</p>

				<div className="mt-7" style={{ animationDelay: "150ms" }}>
					{action}
				</div>
			</div>

			<div className="container">{children}</div>
		</section>
	);
}
