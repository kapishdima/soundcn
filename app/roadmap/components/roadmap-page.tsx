"use client";

import { RoadmapItem } from "@/app/roadmap/components/roadmap-item";
import { Hero } from "@/components/hero";
import { ROADMAP_STEPS } from "@/lib/roadmap";

export function RoadmapPage() {
	return (
		<>
			<Hero
				title={
					<>
						The plan
						<br />
						<span className="text-muted-foreground">No vague promises</span>
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
