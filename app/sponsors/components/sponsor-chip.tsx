import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { isSvgSource, type Sponsor } from "@/lib/sponsors";
import { cn } from "@/lib/utils";

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
			className={`group/chip inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-medium leading-none transition-all hover:-translate-y-px ${
				active
					? "border-primary/30 bg-primary/6 hover:border-primary/50 hover:bg-primary/12 px-4 py-2.5 text-sm"
					: "border-border/70 bg-card/60 hover:border-border hover:bg-card"
			}`}
			rel="noopener"
		>
			<Avatar className={cn("shrink-0", active ? "size-10" : "size-7 ")}>
				{sponsor.logo && isSvgSource(sponsor.logo) ? (
					<div
						className="flex size-full items-center justify-center [&>svg]:size-8"
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
