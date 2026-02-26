"use client";

import { AppHero } from "@/components/app-hero";
import { RoadmapItem } from "@/components/roadmap-item";
import { ROADMAP_STEPS } from "@/lib/roadmap";

export function RoadmapPage() {
	return (
		<>
			<AppHero
				eyebrow={
					<>
						<span className="relative flex size-2 shrink-0" aria-hidden="true">
							<span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-primary opacity-50" />
							<span className="relative inline-flex size-2 rounded-full bg-primary" />
						</span>
						What&apos;s coming
					</>
				}
				title={
					<>
						The plan.
						<br />
						<span className="text-muted-foreground">No vague promises.</span>
					</>
				}
				description={
					<>
						Seven things shipping.{" "}
						<span className="text-foreground/60">
							Each step plays its sound as you scroll.
						</span>
					</>
				}
			/>

			<main
				id="main-content"
				className="mx-auto w-full max-w-3xl flex-1 px-6 pt-10 pb-28"
			>
				{ROADMAP_STEPS.map((step, i) => (
					<RoadmapItem
						key={step.id}
						step={step}
						isLast={i === ROADMAP_STEPS.length - 1}
					/>
				))}
			</main>
		</>
	);
}
