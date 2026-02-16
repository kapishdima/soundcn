"use client";

import {
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	ListChecks,
} from "lucide-react";
import dynamic from "next/dynamic";
import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useMemo, useRef, useState } from "react";
import { BatchInstallBar } from "@/components/batch-install-bar";
import { GlobalFilters } from "@/components/global-fiters";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SoundGrid } from "@/components/sound-grid";
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

/* ── Install-all-in-category button ── */

export function SoundsPage({ sounds }: SoundsPageProps) {
	const [pm, setPm] = usePackageManager();

	// ── Deep link: ?sound=click-soft ──
	const [soundParam, setSoundParam] = useQueryState(
		"sound",
		parseAsString.withDefault("").withOptions({ shallow: true }),
	);

	const {
		deferredSounds,
		isPending,
		activeCategory,
		query,
		handleClearFilters,
	} = useGlobalFilters({
		sounds,
	});

	// Build a name→item lookup for deep linking
	const soundsByName = useMemo(() => {
		const map = new Map<string, SoundCatalogItem>();
		for (const s of sounds) {
			map.set(s.name, s);
		}
		return map;
	}, [sounds]);

	// Resolve the selected sound from URL param or null
	const selectedSound = soundParam
		? (soundsByName.get(soundParam) ?? null)
		: null;

	// ── Batch selection ──
	const [selectedNames, setSelectedNames] = useState<Set<string>>(
		() => new Set(),
	);
	const selectMode = selectedNames.size > 0;

	const handleToggleSelect = useCallback((name: string) => {
		setSelectedNames((prev) => {
			const next = new Set(prev);
			if (next.has(name)) {
				next.delete(name);
			} else {
				next.add(name);
			}
			return next;
		});
	}, []);

	const handleClearSelection = useCallback(() => {
		setSelectedNames(new Set());
	}, []);

	const gridFocusRef = useRef<(() => void) | null>(null);

	const { onPreviewStart, onPreviewStop } = useHoverPreview();

	const handleSelect = useCallback(
		(sound: SoundCatalogItem) => {
			onPreviewStop();
			setSoundParam(sound.name);
		},
		[onPreviewStop, setSoundParam],
	);

	const handleClose = useCallback(() => {
		setSoundParam("");
	}, [setSoundParam]);

	// Clear batch selection when category/search changes (render-time reset
	// avoids the extra re-render + one-frame stale-selection flash of useEffect)
	const prevFiltersRef = useRef({ activeCategory, query });
	if (
		prevFiltersRef.current.activeCategory !== activeCategory ||
		prevFiltersRef.current.query !== query
	) {
		prevFiltersRef.current = { activeCategory, query };
		if (selectedNames.size > 0) {
			setSelectedNames(new Set());
		}
	}

	return (
		<div className="flex min-h-svh flex-col">
			<Header />
			<Hero sounds={sounds} />

			{/* ── Sticky search & filter bar ── */}
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
					<p className="text-muted-foreground text-sm tabular-nums">
						{deferredSounds.length} sound
						{deferredSounds.length !== 1 ? "s" : ""}
					</p>

					<div className="text-muted-foreground/60 text-xs hidden sm:flex items-center gap-4">
						<p className="flex items-center gap-1.5">
							<span className="flex items-center gap-0.5">
								<ArrowUp className="size-3" />
								<ArrowDown className="size-3" />
								<ArrowLeft className="size-3" />
								<ArrowRight className="size-3" />
							</span>
							to navigate
						</p>
						<p className="flex items-center gap-1.5">
							<ListChecks className="size-3.5" />
							<kbd className="font-mono text-[10px]">&#8984;</kbd>+click to
							batch select
						</p>
					</div>
				</div>

				<div
					className={cn(
						"transition-opacity duration-150",
						isPending ? "opacity-50" : "opacity-100",
					)}
				>
					<SoundGrid
						sounds={deferredSounds}
						selectedNames={selectedNames}
						selectMode={selectMode}
						onSelect={handleSelect}
						onToggleSelect={handleToggleSelect}
						onPreviewStart={onPreviewStart}
						onPreviewStop={onPreviewStop}
						onClearFilters={handleClearFilters}
						focusRef={gridFocusRef}
					/>
				</div>
			</main>

			{/* ── Batch install floating bar ── */}
			<BatchInstallBar
				selectedNames={selectedNames}
				onClear={handleClearSelection}
				pm={pm}
			/>

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
