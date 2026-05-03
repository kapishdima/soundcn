"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { playSound } from "@/lib/sound-engine";
import { loadSoundAsset } from "@/lib/sound-loader";
import type { Sponsor } from "@/lib/sponsors";
import { isSvgSource, SPONSORS } from "@/lib/sponsors";
import { cn } from "@/lib/utils";

// Cache the asset promise so we don't load it on every hover
let orcSoundPromise: Promise<string> | null = null;

async function playOrcSound() {
	try {
		if (!orcSoundPromise) {
			orcSoundPromise = loadSoundAsset(
				"orc-female-standard-npcfarewell-03",
			).then((a) => a.dataUri);
		}
		const dataUri = await orcSoundPromise;
		await playSound(dataUri, { volume: 0.7 });
	} catch {
		// Autoplay blocked or asset missing — fail silently
	}
}

function SponsorPill({ sponsor }: { sponsor: Sponsor }) {
	const isOrc = sponsor.name === "OrcDev";
	const cooldown = useRef(false);

	const handleEnter = () => {
		if (isOrc && !cooldown.current) {
			cooldown.current = true;
			playOrcSound();
			setTimeout(() => {
				cooldown.current = false;
			}, 2500);
		}
	};

	return (
		<Badge variant="outline" asChild className="py-4 px-2">
			<a
				href={sponsor.url}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={sponsor.name}
				onMouseEnter={handleEnter}
			>
				<Avatar className="size-4">
					{sponsor.logo && isSvgSource(sponsor.logo) ? (
						<div
							className="size-4 rounded-full bg-muted overflow-hidden flex items-center justify-center p-[3px] shrink-0 [&>svg]:size-full"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted sponsor SVG source
							dangerouslySetInnerHTML={{ __html: sponsor.logo }}
						/>
					) : (
						<AvatarImage src={sponsor.logo} alt={sponsor.name} />
					)}
				</Avatar>
				<span>{sponsor.name}</span>
			</a>
		</Badge>
	);
}

export function HeroSponsors() {
	const [paused, setPaused] = useState(false);

	// Duplicate for seamless loop
	const doubled = [...SPONSORS, ...SPONSORS];

	if (SPONSORS.length === 0) return null;

	return (
		<div className="stagger-fade-up mt-8" style={{ animationDelay: "200ms" }}>
			{/* Header row */}
			<div className="flex items-center gap-3 mb-3">
				<span className="shrink-0 text-xs font-semibold tracking-tighter text-muted-foreground/40">
					Backed by
				</span>
				<div
					className="h-px flex-1 max-w-[48px]"
					style={{
						background:
							"linear-gradient(to right, color-mix(in oklch, var(--border) 70%, transparent), transparent)",
					}}
					aria-hidden
				/>
				<Button asChild variant="ghost" size="xs" className="ml-auto">
					<Link href="/sponsors">
						Become a sponsor <ArrowRight />
					</Link>
				</Button>
			</div>

			{/* Marquee strip */}
			<div
				className="overflow-hidden"
				style={{
					maskImage:
						"linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
					WebkitMaskImage:
						"linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
				}}
			>
				<div
					className="flex gap-2 w-max cursor-default py-2"
					style={{
						animation: "sponsor-scroll 38s linear infinite",
						animationPlayState: paused ? "paused" : "running",
					}}
					onMouseEnter={() => setPaused(true)}
					onMouseLeave={() => setPaused(false)}
				>
					{doubled.map((sponsor, i) => (
						<SponsorPill
							// biome-ignore lint/suspicious/noArrayIndexKey: intentional duplicate for marquee loop
							key={`${sponsor.name}-${i}`}
							sponsor={sponsor}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
