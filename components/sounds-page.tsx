"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef } from "react";
import { BatchInstallBar } from "@/components/batch-install-bar";
import { GlobalFilters } from "@/components/global-fiters";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { KeyboardTips } from "@/components/keyboard-tips";
import { SoundGrid } from "@/components/sound-grid";
import { SoundsCountTitle } from "@/components/sounds-count-title";
import { useGlobalFilters } from "@/hooks/use-global-filters";
import { useHoverPreview } from "@/hooks/use-hover-preview";
import { usePackageManager } from "@/hooks/use-package-manager";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { cn } from "@/lib/utils";

const SoundDetail = dynamic(() =>
	import("@/components/sound-detail").then((mod) => mod.SoundDetail),
);

interface SoundsPageProps {
	sounds: SoundCatalogItem[];
}

export function SoundsPage({ sounds }: SoundsPageProps) {
	const [pm, setPm] = usePackageManager();

	const gridFocusRef = useRef<(() => void) | null>(null);
	const { deferredSounds, isPending } = useGlobalFilters({
		sounds,
	});

	const { onPreviewStart, onPreviewStop } = useHoverPreview();

	const handleClose = useCallback(() => {
		setSoundParam("");
	}, [setSoundParam]);

	return (
		<div className="flex min-h-svh flex-col">
			<Header />
			<Hero sounds={sounds} />
			<GlobalFilters
				sounds={sounds}
				onApplySearch={() => gridFocusRef.current?.()}
			/>

			{/* ── Content ── */}
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

			{/* ── Batch install floating bar ── */}
			<BatchInstallBar sounds={sounds} />

			{/* ── Drawer ── */}
			<SoundDetail
				sound={selectedSound}
				onClose={handleClose}
				pm={pm}
				onPmChange={setPm}
			/>
		</div>
	);
}
