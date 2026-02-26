import { ExternalLink } from "lucide-react";
import Image from "next/image";
import type { Sponsor } from "@/lib/sponsors";

export function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
	return (
		<a
			href={sponsor.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group relative flex flex-col items-center gap-4 rounded-xl border border-border/50 bg-card p-6 text-center transition-[border-color,box-shadow,transform] duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.08] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
		>
			{/* External link — appears on hover */}
			<ExternalLink className="absolute top-3 right-3 size-3 text-muted-foreground/0 transition-all duration-200 group-hover:text-primary/40" />

			{/* Avatar / Logo */}
			<div className="size-20 rounded-full overflow-hidden border border-border/50 bg-muted flex items-center justify-center shrink-0">
				{sponsor.logo ? (
					<Image
						src={sponsor.logo}
						alt={sponsor.name}
						width={80}
						height={80}
						className="size-full object-cover"
					/>
				) : (
					<span className="font-display text-2xl font-bold text-muted-foreground/40">
						{sponsor.name[0].toUpperCase()}
					</span>
				)}
			</div>

			{/* Name + tagline */}
			<div className="space-y-1">
				<p className="font-display text-sm font-bold text-foreground leading-snug">
					{sponsor.name}
				</p>
				{sponsor.tagline && (
					<p className="text-xs text-muted-foreground leading-relaxed">
						{sponsor.tagline}
					</p>
				)}
			</div>
		</a>
	);
}
