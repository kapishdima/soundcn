"use client";

import { useState } from "react";
import { ScoreCell } from "@/app/sponsors/components/score-cell";
import { SponsorsGrid } from "@/app/sponsors/components/sponsors-grid";
import { TiersList } from "@/app/sponsors/components/tiers-list";
import { Hero } from "@/components/hero";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { formatCount, formatPct, SPONSOR_STATS } from "@/lib/sponsor-stats";
import { SPONSORS } from "@/lib/sponsors";
import type { BillingMode } from "@/lib/sponsorship-tiers";

export function SponsorsPage() {
	const [billing, setBilling] = useState<BillingMode>("subscription");
	const active = SPONSORS.filter((s) => s.isCurrent);
	const past = SPONSORS.filter((s) => !s.isCurrent);

	return (
		<>
			<Hero
				title={
					<>
						Support keeps
						<br />
						<span className="text-primary">soundcn free.</span>
					</>
				}
				description={
					<>
						soundcn is open source and runs on the goodwill of people who chip
						in.{" "}
						<span className="text-foreground/60">
							Three ways to support, billed monthly or one-time.
						</span>
					</>
				}
			/>

			<main
				id="main-content"
				className="stagger-fade-up flex-1"
				style={{ animationDelay: "200ms" }}
			>
				{/* ─── Stats ─── */}
				<section className="container py-12 sm:py-16">
					<div className="mb-5 flex items-center gap-3">
						<span className="text-xs font-medium text-primary">
							Last 30 days
						</span>
						<span
							className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent"
							aria-hidden
						/>
					</div>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						<ScoreCell
							label="Visitors"
							value={formatCount(SPONSOR_STATS.visitors)}
						/>
						<ScoreCell
							label="Page views"
							value={formatCount(SPONSOR_STATS.pageViews)}
						/>
						<ScoreCell
							label="Bounce rate"
							value={formatPct(SPONSOR_STATS.bounceRate)}
						/>
					</div>
				</section>

				{/* ─── Tiers ─── */}
				<section id="tiers" className="container pb-16">
					<div className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
						<div>
							<p className="text-xs font-medium text-primary">Sponsorship</p>
							<h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
								Pick a tier that fits.
							</h2>
						</div>

						<Tabs
							value={billing}
							onValueChange={(v) => setBilling(v as BillingMode)}
						>
							<TabsList>
								<TabsTrigger value="subscription">Monthly</TabsTrigger>
								<TabsTrigger value="one-time">One-time</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>

					<TiersList billing={billing} />

					<p className="mt-6 text-xs text-muted-foreground/70">
						Need a custom arrangement?{" "}
						<a
							href={`mailto:${SUPPORT_EMAIL}`}
							className="text-muted-foreground underline underline-offset-2 transition-colors duration-150 hover:text-foreground"
						>
							{SUPPORT_EMAIL}
						</a>
					</p>
				</section>

				<SponsorsGrid sponsors={active} title="Currently sponsoring" isActive />
				<SponsorsGrid sponsors={past} title="Past sponsors" />
			</main>
		</>
	);
}
