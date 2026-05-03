"use client";

import { ArrowUpRight, Clock, HardDrive, Scale, Tag } from "lucide-react";
import Link from "next/link";
import { MetaPill } from "@/components/metal-pill";
import { SoundDownloadButton } from "@/components/sound-download-button";
import { SoundInstallInstructions } from "@/components/sound-install-instructions";
import { PlayerStrip } from "@/components/sound-player";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useSoundPlayback } from "@/hooks/use-sound-playback";
import { useSoundSelection } from "@/hooks/use-sound-selection";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { formatDuration, formatSizeKb } from "@/lib/sound-catalog";

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
										<Badge>{sound.broadCategory}</Badge>
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
									<Button asChild variant="ghost" size="icon-sm">
										<Link
											href={`/sound/${sound.name}`}
											aria-label="Open sound page"
										>
											<ArrowUpRight aria-hidden="true" />
										</Link>
									</Button>
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
