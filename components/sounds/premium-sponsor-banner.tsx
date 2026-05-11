import { Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	isSvgSource,
	PREMIUM_BANNER,
	type PremiumBannerSlot,
} from "@/lib/sponsors";
import { cn } from "@/lib/utils";

const SPONSOR_HREF = "/sponsors#tiers";

const SHELL_CLASSES =
	"group/banner relative flex flex-col gap-4 overflow-hidden bg-card p-4 ring-1 ring-foreground/5 transition-colors hover:border-primary/40";

export function PremiumSponsorBanner({ className }: { className?: string }) {
	if (PREMIUM_BANNER) {
		return <FilledBanner sponsor={PREMIUM_BANNER} className={className} />;
	}
	return <PlaceholderBanner className={className} />;
}

function FilledBanner({
	sponsor,
	className,
}: {
	sponsor: PremiumBannerSlot;
	className?: string;
}) {
	return (
		<a
			href={sponsor.url}
			target="_blank"
			rel="noopener noreferrer sponsored"
			aria-label={`Sponsored by ${sponsor.name}`}
			className={cn(SHELL_CLASSES, className)}
		>
			<div className="-mx-4 -mt-4 flex items-center justify-between gap-2 border-b border-border/70 bg-primary/[0.06] px-4 py-1.5">
				<span className="text-[10px] font-medium uppercase tracking-wide text-primary">
					Sponsored
				</span>
				<span className="text-[10px] tabular-nums text-primary/70">
					Premium
				</span>
			</div>

			<div className="flex items-center gap-3">
				<SponsorLogo logo={sponsor.logo} name={sponsor.name} />
				<div className="min-w-0">
					<p className="line-clamp-1 font-heading text-sm font-medium tracking-tight text-balance">
						{sponsor.name}
					</p>
					<p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">
						{sponsor.tagline}
					</p>
				</div>
			</div>

			<Button asChild size="sm" className="w-full" tabIndex={-1}>
				<span>{sponsor.cta ?? `Visit ${sponsor.name}`}</span>
			</Button>
		</a>
	);
}

function SponsorLogo({ logo, name }: { logo: string; name: string }) {
	if (isSvgSource(logo)) {
		return (
			<span
				aria-hidden
				className="flex size-9 shrink-0 items-center justify-center  text-primary [&_svg]:size-5 [&_svg]:shrink-0"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: logo }}
			/>
		);
	}
	return (
		<Image
			src={logo}
			alt={`${name} logo`}
			width={36}
			height={36}
			className="size-9 shrink-0 object-cover"
			unoptimized={logo.startsWith("http")}
		/>
	);
}

function PlaceholderBanner({ className }: { className?: string }) {
	return (
		<aside
			aria-label="Sponsor this spot"
			className={cn(SHELL_CLASSES, "gap-3", className)}
		>
			<div className="-mx-4 -mt-4 flex items-center justify-between gap-2 border-b border-border/70 bg-primary/[0.06] px-4 py-1.5">
				<span className="text-[10px] font-medium uppercase tracking-wide text-primary">
					Premium spot
				</span>
				<span className="text-[10px] tabular-nums text-primary/70">1 / 1</span>
			</div>

			<div className="flex items-center gap-3">
				<div className="flex size-9 shrink-0 items-center justify-center border border-primary/40 bg-primary/10 text-primary">
					<Crown className="size-4" />
				</div>
				<div className="min-w-0">
					<p className="font-heading text-sm font-medium tracking-tight text-balance">
						Your banner here
					</p>
					<p className="text-[11px] leading-snug text-muted-foreground">
						Seen on every page of soundcn.
					</p>
				</div>
			</div>

			<Button asChild size="sm" className="w-full">
				<Link href={SPONSOR_HREF}>Claim this spot</Link>
			</Button>
		</aside>
	);
}
