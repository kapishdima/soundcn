"use client";

import { ArrowUpRight, Clock, HardDrive, Scale, Tag } from "lucide-react";
import Link from "next/link";
import { MetaPill } from "@/components/metal-pill";
import { SoundDownloadButton } from "@/components/sound-download-button";
import { SoundInstallInstructions } from "@/components/sound-install-instructions";
import { PlayerStrip } from "@/components/sound-player";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useSoundPlayback } from "@/hooks/use-sound-playback";
import { useSoundSelection } from "@/hooks/use-sound-selection";
import type { SoundCatalogItem } from "@soundcn/sounds/catalog";
import { formatDuration, formatSizeKb } from "@soundcn/sounds/catalog";

const EMPTY_TAGS: string[] = [];

export function SoundDetail({ sounds }: { sounds: SoundCatalogItem[] }) {
	const { selectedSound: sound, setSoundParam } = useSoundSelection({ sounds });
	const { playState, toggle } = useSoundPlayback(sound?.name ?? null);

	const onClose = () => setSoundParam(null);

	const tags = sound?.meta.tags ?? EMPTY_TAGS;

	return (
		<Drawer
			open={!!sound}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[90vh]">
				{sound ? (
					<div className="scrollbar-thin mx-auto w-full max-w-xl overflow-y-auto px-5 pb-8">
						{/* ── 1. Identity ── */}
						<DrawerHeader className="px-0 pb-1">
							<div className="flex items-start justify-between gap-3">
								<div className="min-w-0 flex-1">
									<div className="flex items-center gap-2 mb-1">
										<span className="inline-flex shrink-0 items-center rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
											{sound.broadCategory}
										</span>
									</div>
									<DrawerTitle className="truncate text-xl font-bold">
										{sound.title}
									</DrawerTitle>
									{sound.description ? (
										<DrawerDescription className="mt-1 line-clamp-2 text-sm leading-relaxed">
											{sound.description}
										</DrawerDescription>
									) : null}
								</div>

								<div className="flex shrink-0 items-center gap-1 mt-1">
									<Link
										href={`/sound/${sound.name}`}
										className="text-muted-foreground hover:text-primary hover:bg-primary/10 flex size-9 items-center justify-center rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
										aria-label="Open sound page"
									>
										<ArrowUpRight className="size-[18px]" aria-hidden="true" />
									</Link>
									<SoundDownloadButton name={sound.name} />
								</div>
							</div>
						</DrawerHeader>

						{/* ── 2. Player ── */}
						<div className="mt-4">
							<PlayerStrip
								name={sound.name}
								playState={playState}
								onToggle={toggle}
							/>
						</div>

						{/* ── 3. Metadata ── */}
						<div className="mt-4 flex flex-wrap items-center gap-2">
							<MetaPill icon={Clock}>
								{formatDuration(sound.meta.duration)}
							</MetaPill>
							<MetaPill icon={HardDrive}>
								{formatSizeKb(sound.meta.sizeKb)}
							</MetaPill>
							<MetaPill icon={Scale}>{sound.meta.license}</MetaPill>
							{tags.length > 0 ? (
								<MetaPill icon={Tag}>
									{tags.slice(0, 3).join(", ")}
									{tags.length > 3 ? ` +${tags.length - 3}` : null}
								</MetaPill>
							) : null}
						</div>

						{/* ── 4. Integration code ── */}
						<div className="mt-6">
							<SoundInstallInstructions soundName={sound.name} />
						</div>
					</div>
				) : null}
			</DrawerContent>
		</Drawer>
	);
}
