"use client";

import type { ReactNode } from "react";
import PixelBlast from "@/components/PixelBlast";

type HeroProps = {
	title: ReactNode;
	description: ReactNode;
	action?: ReactNode;
	children?: ReactNode;
};

export function Hero({ title, description, action, children }: HeroProps) {
	return (
		<section className="relative -mt-20 overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-20">
			<div
				className="pointer-events-none absolute -top-48 -left-32 size-[400px] rounded-full bg-primary opacity-[0.07] blur-2xl dark:opacity-[0.12]"
				aria-hidden="true"
			/>
			<div className="absolute inset-0 w-full">
				<PixelBlast
					variant="square"
					pixelSize={8}
					color="#ffe8e0"
					patternScale={2.5}
					patternDensity={1.2}
					enableRipples={false}
					rippleSpeed={0.35}
					rippleThickness={0.1}
					rippleIntensityScale={1}
					speed={0.2}
					transparent
					edgeFade={0.35}
				/>
			</div>

			<div className="container relative">
				<h1
					className="font-heading text-4xl font-bold text-balance sm:text-5xl lg:text-6xl"
					style={{ animationDelay: "50ms" }}
				>
					{title}
				</h1>

				<p
					className="text-muted-foreground mt-5 max-w-lg text-base text-balance leading-tight sm:text-lg"
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
