import { TierCard } from "@/app/sponsors/components/tier-card";
import { type BillingMode, TIERS } from "@/lib/sponsorship-tiers";

export function TiersList({ billing }: { billing: BillingMode }) {
	return (
		<div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
			{TIERS.map((tier) => (
				<TierCard key={tier.key} tier={tier} billing={billing} />
			))}
		</div>
	);
}
