"use client";

import {
	Coffee,
	Crown,
	Heart,
	Star,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Hero } from "@/components/hero";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trackEvent } from "@/lib/analytics";
import { SUPPORT_EMAIL } from "@/lib/constants";
import {
	formatCount,
	formatDelta,
	formatPct,
	SPONSOR_STATS,
} from "@/lib/sponsor-stats";
import { isSvgSource, SPONSORS, type Sponsor } from "@/lib/sponsors";
import { type BillingMode, TIERS, type Tier } from "@/lib/sponsorship-tiers";

const TIER_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
	"shu-puer": Coffee,
	support: Heart,
	premium: Crown,
};

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
							Last 30 days · {SPONSOR_STATS.monthLabel}
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

					<div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
						{TIERS.map((tier) => (
							<TierCard key={tier.key} tier={tier} billing={billing} />
						))}
					</div>

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

				{/* ─── Currently sponsoring ─── */}
				{active.length > 0 && (
					<section className="container pb-12">
						<div className="mb-5 flex items-center gap-3">
							<h3 className="text-xs font-medium text-primary">
								Currently sponsoring
							</h3>
							<span
								className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent"
								aria-hidden
							/>
						</div>
						<div className="flex flex-wrap items-center gap-2.5">
							{active.map((sponsor) => (
								<SponsorChip key={sponsor.name} sponsor={sponsor} active />
							))}
						</div>
					</section>
				)}

				{/* ─── Past supporters ─── */}
				{past.length > 0 && (
					<section className="container pb-24">
						<div className="mb-5 flex items-center gap-3">
							<h3 className="text-xs font-medium text-muted-foreground/70">
								Past supporters
							</h3>
							<span
								className="h-px flex-1 bg-gradient-to-r from-border to-transparent"
								aria-hidden
							/>
						</div>
						<div className="flex flex-wrap items-center gap-2">
							{past.map((sponsor) => (
								<SponsorChip key={sponsor.name} sponsor={sponsor} />
							))}
						</div>
					</section>
				)}
			</main>
		</>
	);
}

function TierCard({ tier, billing }: { tier: Tier; billing: BillingMode }) {
	const Icon = TIER_ICON[tier.key] ?? Star;

	return (
		<article
			className={`group/tier relative flex flex-col gap-5 overflow-hidden border bg-card p-6 transition-all duration-200 hover:-translate-y-1 ${
				tier.highlight
					? "border-primary/40 bg-primary/[0.04] shadow-[0_8px_30px_-12px_color-mix(in_oklch,var(--primary)_30%,transparent)] hover:shadow-[0_16px_40px_-12px_color-mix(in_oklch,var(--primary)_40%,transparent)] dark:bg-primary/[0.06]"
					: "border-border/70 hover:border-border hover:shadow-[0_8px_24px_-10px_rgba(0,0,0,0.15)]"
			}`}
		>
			{tier.highlight && (
				<span
					aria-hidden
					className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/[0.08] to-transparent transition-transform duration-700 group-hover/tier:translate-x-full"
				/>
			)}

			{/* Header — name + icon (centered to each other) */}
			<div className="flex items-center justify-between gap-3">
				<div className="flex items-center gap-3">
					<div
						className={`flex size-10 shrink-0 items-center justify-center border ${
							tier.highlight
								? "border-primary/40 bg-primary/10 text-primary"
								: "border-border/70 bg-background text-muted-foreground/70"
						}`}
					>
						<Icon className="size-4" />
					</div>
					<p className="font-heading text-lg font-bold tracking-tight">
						{tier.name}
					</p>
				</div>
				{tier.highlight && (
					<span className="text-xs font-medium text-primary">Most impact</span>
				)}
			</div>

			{/* Perforated divider */}
			<div className="relative -mx-6">
				<span
					className="absolute -left-[9px] top-1/2 size-[18px] -translate-y-1/2 rounded-full border border-border/70 bg-background"
					aria-hidden
				/>
				<span
					className="absolute -right-[9px] top-1/2 size-[18px] -translate-y-1/2 rounded-full border border-border/70 bg-background"
					aria-hidden
				/>
				<span
					className="block h-px border-t border-dashed border-border/70"
					aria-hidden
				/>
			</div>

			{/* Price (aligned to bottom of header block) */}
			<div>
				<div className="flex items-baseline gap-2">
					<span className="font-heading text-5xl font-bold leading-none tracking-tight tabular-nums">
						${tier.price}
					</span>
					<span className="text-sm text-muted-foreground/80">
						{billing === "subscription" ? "/ month" : "one-time"}
					</span>
				</div>
				<p className="mt-3 text-xs leading-relaxed text-muted-foreground">
					{tier.tagline}
				</p>
			</div>

			{/* Perks — flex-1 so CTA aligns to bottom across all 3 cards */}
			<ul className="flex-1 space-y-2">
				{tier.perks.map((perk) => (
					<li
						key={perk}
						className="flex items-start gap-2 text-xs leading-relaxed text-foreground/85"
					>
						<span
							className={`mt-[5px] size-1.5 shrink-0 rounded-full ${
								tier.highlight ? "bg-primary/70" : "bg-muted-foreground/40"
							}`}
							aria-hidden
						/>
						{perk}
					</li>
				))}
			</ul>

			{/* CTA */}
			<Button
				asChild
				size="lg"
				variant={tier.highlight ? "default" : "outline"}
				className="w-full"
			>
				<a
					href={tier.urls[billing]}
					target="_blank"
					rel="noopener noreferrer"
					onClick={() => trackEvent("sponsor_link_clicked")}
				>
					Choose {tier.name}
				</a>
			</Button>
		</article>
	);
}

function ScoreCell({ label, value }: { label: string; value: string }) {
	return (
		<div className="relative flex flex-col border border-border/70 bg-card p-5">
			<p className="text-xs font-medium text-muted-foreground/70">{label}</p>
			<div className="mt-3 flex items-baseline justify-between gap-3">
				<span className="font-heading text-4xl font-bold leading-none tracking-tight tabular-nums sm:text-5xl">
					{value}
				</span>
			</div>
			<span
				className="mt-auto block h-px border-t border-dotted border-border/70 pt-4"
				aria-hidden
			/>
		</div>
	);
}

function SponsorChip({
	sponsor,
	active,
}: {
	sponsor: Sponsor;
	active?: boolean;
}) {
	return (
		<a
			href={sponsor.url}
			target="_blank"
			rel="noopener noreferrer"
			onClick={() => trackEvent("sponsor_link_clicked")}
			className={`group/chip inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-medium leading-none transition-all hover:-translate-y-px ${
				active
					? "border-primary/30 bg-primary/[0.06] hover:border-primary/50 hover:bg-primary/[0.12]"
					: "border-border/70 bg-card/60 hover:border-border hover:bg-card"
			}`}
		>
			<Avatar className="size-5 shrink-0">
				{sponsor.logo && isSvgSource(sponsor.logo) ? (
					<div
						className="flex size-full items-center justify-center [&>svg]:size-3"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted sponsor SVG source
						dangerouslySetInnerHTML={{ __html: sponsor.logo }}
					/>
				) : (
					<AvatarImage src={sponsor.logo} alt={sponsor.name} />
				)}
			</Avatar>
			<span className={active ? "text-foreground" : "text-foreground/85"}>
				{sponsor.name}
			</span>
		</a>
	);
}
