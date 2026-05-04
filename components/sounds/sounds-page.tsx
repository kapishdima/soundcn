"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { GlobalFilters } from "@/components/global-filters";
import { Hero } from "@/components/hero";
import { SoundGrid } from "@/components/sounds/sound-grid";
import { useGlobalFilters } from "@/hooks/use-global-filters";
import { useHoverPreview } from "@/hooks/use-hover-preview";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { cn } from "@/lib/utils";

const SoundDetail = dynamic(() =>
	import("@/components/sounds/sound-detail").then((mod) => mod.SoundDetail),
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
			<Hero
				title={
					<>
						Curated UI sounds for <br />
						<span className="text-primary">Copy. Paste. Play</span>
					</>
				}
				description="Open-source sound effects for creative web apps. Install any sound with a shadcn"
			/>

			<div
				className="stagger-fade-up container flex flex-1 flex-col gap-8 py-8 lg:flex-row lg:items-start"
				style={{ animationDelay: "260ms" }}
			>
				<aside className="w-full lg:w-auto sticky top-2 self-start">
					<GlobalFilters sounds={sounds} onApplySearch={onApplySearch} />
				</aside>

				<main id="main-content" className="flex min-w-0 flex-1 flex-col gap-6">
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

			<SoundDetail sounds={deferredSounds} />
		</>
	);
}
