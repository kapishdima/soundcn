"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { playSound } from "@/lib/sound-engine";
import { loadSoundAsset } from "@/lib/sound-loader";
import type { Sponsor } from "@/lib/sponsors";
import { SPONSORS } from "@/lib/sponsors";
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
		<a
			href={sponsor.url}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={sponsor.name}
			onMouseEnter={handleEnter}
			className={cn(
				"flex items-center gap-2 shrink-0 select-none",
				"px-3 py-[7px] rounded-full",
				"border border-border bg-card shadow-sm",
				"hover:border-primary/60 hover:shadow-md hover:shadow-primary/[0.08] hover:-translate-y-px",
				"transition-all duration-200",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				isOrc &&
					"hover:border-[#4ade80]/60 hover:shadow-md hover:shadow-[#4ade80]/15",
			)}
		>
			{sponsor.logo ? (
				// biome-ignore lint/performance/noImgElement: sponsor avatar in pill
				<img
					src={sponsor.logo}
					alt={sponsor.name}
					width={20}
					height={20}
					className="size-5 rounded-full object-cover shrink-0"
				/>
			) : (
				<span className="size-5 rounded-full bg-muted flex items-center justify-center text-[9px] font-bold text-muted-foreground/70 shrink-0">
					{sponsor.name[0].toUpperCase()}
				</span>
			)}
			<span
				className={cn(
					"text-[11.5px] font-semibold whitespace-nowrap leading-none",
					"text-foreground/70",
					isOrc && "text-foreground/70",
				)}
			>
				{sponsor.name}
			</span>
		</a>
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
				<span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
					backed by
				</span>
				<div
					className="h-px flex-1 max-w-[48px]"
					style={{
						background:
							"linear-gradient(to right, color-mix(in oklch, var(--border) 70%, transparent), transparent)",
					}}
					aria-hidden
				/>
				<Link
					href="/sponsors"
					className="ml-auto text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/40 hover:text-primary transition-colors duration-150"
				>
					Become a sponsor →
				</Link>
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
