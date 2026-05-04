"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import {
	CodeBlockCommand,
	convertNpmCommand,
} from "@/components/code-block-command/code-block-command";
import { GlobalFilters } from "@/components/global-filters";
import { Hero } from "@/components/hero";
import { SoundGrid } from "@/components/sounds/sound-grid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UsedByStrip } from "@/components/used-by-strip";
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
	const { deferredSounds } = useGlobalFilters({
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
				description={
					<p className="text-md ">
						Open-source collection (CC0-licensed primarily{" "}
						<a
							href="https://kenney.nl/assets/category:Audio"
							className="underline"
						>
							Kenney
						</a>
						) of sound effects for creative web apps. Install any sound with a
						shadcn
					</p>
				}
				action={
					<div className="flex w-full max-w-full items-end gap-x-2">
						<Card className="scrollbar-hide max-w-full overflow-x-auto whitespace-nowrap px-4 py-1.5 font-mono text-sm sm:text-base">
							$ {convertNpmCommand(`npx shadcn add @soundcn/belt-handle-2`).bun}
						</Card>
					</div>
				}
			/>

			<div className="container-wide flex flex-1 flex-col gap-4 pb-8 sm:gap-6 lg:flex-row lg:items-start lg:gap-8">
				<aside className="w-full lg:sticky lg:top-2 lg:w-auto">
					<GlobalFilters sounds={sounds} onApplySearch={onApplySearch} />
				</aside>

				<main
					id="main-content"
					className="flex flex-1 flex-col gap-6 min-h-screen h-full"
				>
					<SoundGrid
						sounds={deferredSounds}
						onPreviewStart={onPreviewStart}
						onPreviewStop={onPreviewStop}
						focusRef={gridFocusRef}
					/>
				</main>
			</div>

			<SoundDetail sounds={deferredSounds} />
		</>
	);
}
