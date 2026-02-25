"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { BatchInstallBar } from "@/components/batch-install-bar";
import { GlobalFilters } from "@/components/global-fiters";
import { Header } from "@/components/header";
import { HeroBars } from "@/components/hero-bars";
import { KeyboardTips } from "@/components/keyboard-tips";
import { SoundGrid } from "@/components/sound-grid";
import { SoundsCountTitle } from "@/components/sounds-count-title";
import { useGlobalFilters } from "@/hooks/use-global-filters";
import { useHoverPreview } from "@/hooks/use-hover-preview";
import type { Collection } from "@/lib/collections";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { cn } from "@/lib/utils";

const SoundDetail = dynamic(() =>
	import("@/components/sound-detail").then((mod) => mod.SoundDetail),
);

interface CollectionDetailPageProps {
	collection: Collection;
	sounds: SoundCatalogItem[];
}

export function CollectionDetailPage({
	collection,
	sounds,
}: CollectionDetailPageProps) {
	const gridFocusRef = useRef<(() => void) | null>(null);
	const { deferredSounds, isPending } = useGlobalFilters({ sounds });
	const { onPreviewStart, onPreviewStop } = useHoverPreview();

	return (
		<div className="flex min-h-svh flex-col">
			<Header />

			{/* ── Hero ── */}
			<section className="relative overflow-hidden px-6 pt-8 pb-14 sm:pt-14 sm:pb-20">
				<div
					className="pointer-events-none absolute -top-48 -left-32 size-[400px] rounded-full bg-primary opacity-[0.07] dark:opacity-[0.12] blur-2xl"
					aria-hidden="true"
				/>
				<HeroBars />

				<div className="relative mx-auto max-w-6xl">
					{/* Fix #10: breadcrumb is static — not part of stagger, appears instantly */}
					<Link
						href="/collections"
						className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded-sm"
					>
						<ChevronLeft className="size-4" />
						Collections
					</Link>

					{/* Fix #7: collection title is primary, sound count is secondary context */}
					<h1
						className="stagger-fade-up font-display text-4xl font-bold text-balance sm:text-5xl lg:text-6xl"
						style={{ animationDelay: "50ms" }}
					>
						{collection.title}.
						<br />
						{/* Fix #9: eyebrow removed, count moved here as muted subline */}
						<span className="text-muted-foreground">
							<span className="tabular-nums">{sounds.length}</span> sounds.
						</span>
					</h1>

					<p
						className="stagger-fade-up text-muted-foreground mt-5 max-w-lg text-base text-pretty leading-relaxed sm:text-lg"
						style={{ animationDelay: "100ms" }}
					>
						{collection.description}
					</p>
				</div>
			</section>

			{/* ── Filters ── */}
			<GlobalFilters
				sounds={sounds}
				onApplySearch={() => gridFocusRef.current?.()}
			/>

			{/* ── Sound grid ── */}
			<main
				id="main-content"
				className="stagger-fade-up mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-8"
				style={{ animationDelay: "260ms" }}
			>
				<div className="flex items-center justify-between">
					{/* Fix #8: SoundsCountTitle reflects filtered count, hero shows total — no contradiction */}
					<SoundsCountTitle count={deferredSounds.length} />
					<KeyboardTips />
				</div>

				<div
					className={cn(
						"transition-opacity duration-150",
						isPending ? "opacity-50" : "opacity-100",
					)}
				>
					<SoundGrid
						sounds={deferredSounds}
						onPreviewStart={onPreviewStart}
						onPreviewStop={onPreviewStop}
						focusRef={gridFocusRef}
					/>
				</div>
			</main>

			<BatchInstallBar sounds={sounds} />
			<SoundDetail sounds={deferredSounds} />
		</div>
	);
}
