import { Coffee, Crown, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BillingMode, Tier } from "@/lib/sponsorship-tiers";

const TIER_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
	"shu-puer": Coffee,
	support: Heart,
	premium: Crown,
};

export function TierCard({
	tier,
	billing,
}: {
	tier: Tier;
	billing: BillingMode;
}) {
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
				>
					Choose {tier.name}
				</a>
			</Button>
		</article>
	);
}
