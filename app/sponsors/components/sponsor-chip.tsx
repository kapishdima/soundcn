import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { trackEvent } from "@/lib/analytics";
import { isSvgSource, type Sponsor } from "@/lib/sponsors";

export function SponsorChip({
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
			onClick={() => trackEvent("sponsor_link_clicked")}
			className={`group/chip inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-medium leading-none transition-all hover:-translate-y-px ${
				active
					? "border-primary/30 bg-primary/[0.06] hover:border-primary/50 hover:bg-primary/[0.12]"
					: "border-border/70 bg-card/60 hover:border-border hover:bg-card"
			}`}
			rel="noopener"
		>
			<Avatar className="size-7 shrink-0">
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
