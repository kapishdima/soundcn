"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { BatchInstallBar } from "@/components/batch-install-bar";
import { GlobalFiltersSidebar } from "@/components/global-filters-sidebar";
import { Hero } from "@/components/hero";
import { KeyboardTips } from "@/components/keyboard-tips";
import { SoundGrid } from "@/components/sound-grid";
import { SoundsCountTitle } from "@/components/sounds-count-title";
import { useGlobalFilters } from "@/hooks/use-global-filters";
import { useHoverPreview } from "@/hooks/use-hover-preview";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { cn } from "@/lib/utils";

const SoundDetail = dynamic(() =>
	import("@/components/sound-detail").then((mod) => mod.SoundDetail),
);

interface SoundsPageProps {
	sounds: SoundCatalogItem[];
}

export function SoundsPage({ sounds }: SoundsPageProps) {
	const gridFocusRef = useRef<(() => void) | null>(null);
	const { deferredSounds, isPending } = useGlobalFilters({
		sounds,
	});

	const { onPreviewStart, onPreviewStop } = useHoverPreview();

	const onApplySearch = () => gridFocusRef.current?.();

	return (
		<>
			<Hero sounds={sounds} />

			<div
				className="stagger-fade-up container flex flex-1 flex-col gap-8 py-8 lg:flex-row lg:items-start"
				style={{ animationDelay: "260ms" }}
			>
				<aside className="w-full lg:w-auto sticky top-2 self-start">
					<GlobalFiltersSidebar sounds={sounds} onApplySearch={onApplySearch} />
				</aside>

				<main id="main-content" className="flex min-w-0 flex-1 flex-col gap-6">
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
			</div>

			<BatchInstallBar sounds={sounds} />
			<SoundDetail sounds={deferredSounds} />
		</>
	);
}
