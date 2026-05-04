import { SponsorChip } from "@/app/sponsors/components/sponsor-chip";
import type { Sponsor } from "@/lib/sponsors";

type SponsorsGridProps = {
	sponsors: Sponsor[];
	title: string;
	isActive?: boolean;
};

export function SponsorsGrid({ sponsors, title, isActive }: SponsorsGridProps) {
	if (!sponsors.length) return null;

	return (
		<section className="container pb-12">
			<div className="mb-5 flex items-center gap-3">
				<h3 className="text-xs font-medium text-primary">{title}</h3>
				<span
					className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent"
					aria-hidden
				/>
			</div>
			<div className="flex flex-wrap items-center gap-2.5">
				{sponsors.map((sponsor) => (
					<SponsorChip key={sponsor.name} sponsor={sponsor} active={isActive} />
				))}
			</div>
		</section>
	);
}
