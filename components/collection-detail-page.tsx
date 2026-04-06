"use client";

import { ChevronLeft, ShieldAlert } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AppHero } from "@/components/app-hero";
import { BatchInstallBar } from "@/components/batch-install-bar";
import { GlobalFilters } from "@/components/global-fiters";
import { KeyboardTips } from "@/components/keyboard-tips";
import { SoundGrid } from "@/components/sound-grid";
import { SoundsCountTitle } from "@/components/sounds-count-title";
import { useGlobalFilters } from "@/hooks/use-global-filters";
import { useHoverPreview } from "@/hooks/use-hover-preview";
import type { Collection } from "@/lib/collections";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { trackEvent } from "@/lib/analytics";
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

	useEffect(() => {
		trackEvent("collection_viewed", { collectionName: collection.title });
	}, [collection.title]);
	const { onPreviewStart, onPreviewStop } = useHoverPreview();

	return (
		<>
			<AppHero
				breadcrumb={
					<Link
						href="/collections"
						className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded-sm"
					>
						<ChevronLeft className="size-4" />
						Collections
					</Link>
				}
				title={
					<>
						{collection.title}.
						<br />
						<span className="text-muted-foreground">
							<span className="tabular-nums">{sounds.length}</span> sounds.
						</span>
					</>
				}
				description={collection.description}
			>
				{collection.disclaimer && (
					<div
						className="stagger-fade-up mt-7 max-w-2xl"
						style={{ animationDelay: "150ms" }}
					>
						<div
							className="relative overflow-hidden rounded-r-lg border-l-2 border-primary/60 bg-primary/[0.04] dark:bg-primary/[0.07] pl-5 pr-5 py-4"
							style={{
								backgroundImage:
									"repeating-linear-gradient(135deg, transparent, transparent 12px, oklch(0.55 0.17 55 / 0.025) 12px, oklch(0.55 0.17 55 / 0.025) 13px)",
							}}
						>
							<div className="flex items-center gap-2 mb-2">
								<ShieldAlert
									className="size-3.5 text-primary/70 shrink-0"
									aria-hidden="true"
								/>
								<span className="font-display text-[10px] font-bold tracking-[0.14em] uppercase text-primary/70">
									Legal Notice
								</span>
								<span className="flex-1 h-px bg-primary/15" aria-hidden="true" />
							</div>

							<p className="text-xs text-muted-foreground leading-relaxed">
								{collection.disclaimer}
							</p>
						</div>
					</div>
				)}
			</AppHero>

			<GlobalFilters
				sounds={sounds}
				onApplySearch={() => gridFocusRef.current?.()}
			/>

			<main
				id="main-content"
				className="stagger-fade-up mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-8"
				style={{ animationDelay: "260ms" }}
			>
				<div className="flex items-center justify-between">
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
		</>
	);
}
