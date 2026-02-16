"use client";

import {
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	Check,
	ListChecks,
	Package,
} from "lucide-react";
import dynamic from "next/dynamic";
import { parseAsString, useQueryState } from "nuqs";
import {
	useCallback,
	useDeferredValue,
	useMemo,
	useRef,
	useState,
} from "react";
import { BatchInstallBar } from "@/components/batch-install-bar";
import { CategoryFilter } from "@/components/category-filter";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SoundGrid } from "@/components/sound-grid";
import { SoundSearch } from "@/components/sound-search";
import { useHoverPreview } from "@/hooks/use-hover-preview";
import { usePackageManager } from "@/hooks/use-package-manager";
import { useTypewriter } from "@/hooks/use-typewriter";
import type { PackageManager } from "@/lib/package-manager";
import { ALL_CATEGORY, type SoundCatalogItem } from "@/lib/sound-catalog";
import { buildCategoryOptions, filterSounds } from "@/lib/sound-filters";
import { buildInstallCommand } from "@/lib/sound-install";
import { cn } from "@/lib/utils";

const SoundDetail = dynamic(() =>
	import("@/components/sound-detail").then((mod) => mod.SoundDetail),
);

interface SoundsPageProps {
	sounds: SoundCatalogItem[];
}

/* ── Install-all-in-category button ── */

function InstallCategoryButton({
	sounds,
	pm,
}: {
	sounds: SoundCatalogItem[];
	pm: PackageManager;
}) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		const cmd = buildInstallCommand(
			sounds.map((s) => s.name),
			pm,
		);
		try {
			await navigator.clipboard.writeText(cmd);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			/* noop */
		}
	};

	return (
		<button
			onClick={handleCopy}
			className={cn(
				"inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-[color,background-color,border-color,box-shadow] duration-150 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
				copied
					? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
					: "border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 active:scale-[0.97]",
			)}
		>
			{copied ? (
				<>
					<Check className="size-3.5" />
					<span className="hidden sm:inline">Copied!</span>
				</>
			) : (
				<>
					<Package className="size-3.5" />
					<span className="hidden sm:inline">Install all</span>
					<span className="sm:hidden">All</span>
				</>
			)}
			<span className="sr-only" aria-live="polite">
				{copied ? "Install command copied" : ""}
			</span>
		</button>
	);
}

export function SoundsPage({ sounds }: SoundsPageProps) {
	const [pm, setPm] = usePackageManager();

	const [query, setQuery] = useQueryState(
		"q",
		parseAsString
			.withDefault("")
			.withOptions({ shallow: true, throttleMs: 300 }),
	);
	const [activeCategory, setActiveCategory] = useQueryState(
		"category",
		parseAsString.withDefault(ALL_CATEGORY).withOptions({ shallow: true }),
	);

	// ── Deep link: ?sound=click-soft ──
	const [soundParam, setSoundParam] = useQueryState(
		"sound",
		parseAsString.withDefault("").withOptions({ shallow: true }),
	);

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

	const handleClearFilters = useCallback(() => {
		setQuery("");
		setActiveCategory(ALL_CATEGORY);
	}, [setQuery, setActiveCategory]);

	// ── Filtering ──
	const filteredSounds = useMemo(
		() => filterSounds(sounds, query, activeCategory),
		[sounds, query, activeCategory],
	);

	// Keep old cards visible while React prepares new ones
	const deferredSounds = useDeferredValue(filteredSounds);
	const isPending = deferredSounds !== filteredSounds;

	const categoryOptions = useMemo(() => buildCategoryOptions(sounds), [sounds]);

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

	const showInstallAll =
		activeCategory !== ALL_CATEGORY && deferredSounds.length > 1;

	return (
		<div className="flex min-h-svh flex-col">
			<Header />

			{/* ── Hero ── */}
			<Hero sounds={sounds} />

			{/* ── Sticky search & filter bar ── */}
			<div
				className="stagger-fade-up bg-background/95 sticky top-0 z-40 border-b"
				style={{ animationDelay: "200ms" }}
			>
				<div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-6 py-3">
					<SoundSearch
						value={query}
						onChange={setQuery}
						onEnterGrid={() => gridFocusRef.current?.()}
					/>
					<div className="min-w-0 flex-1">
						<CategoryFilter
							options={categoryOptions}
							activeCategory={activeCategory}
							onChange={setActiveCategory}
						/>
					</div>
					{showInstallAll ? (
						<InstallCategoryButton sounds={deferredSounds} pm={pm} />
					) : null}
				</div>
			</div>

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
