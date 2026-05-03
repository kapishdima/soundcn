"use client";

import { ArrowUpRight, Clock, HardDrive, Scale, Tag } from "lucide-react";
import Link from "next/link";
import { SoundDownloadButton } from "@/components/sound-download-button";
import { SoundInstallInstructions } from "@/components/sound-install-instructions";
import { PlayerStrip } from "@/components/sound-player";
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
			direction="right"
			open={!!sound}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-xl">
				{sound ? (
					<div className="scrollbar-thin flex w-full flex-1 flex-col gap-7 overflow-y-auto px-6 pt-4 pb-10">
						{/* Header */}
						<DrawerHeader className="flex flex-col gap-3 px-0 pb-0">
							<div className="flex items-start justify-between gap-3">
								<div className="min-w-0 flex-1 space-y-2">
									<div className="text-xs font-medium tracking-tight text-muted-foreground">
										{sound.broadCategory}
									</div>
									<DrawerTitle className="text-2xl font-semibold tracking-tight text-balance">
										{sound.title}
									</DrawerTitle>
									{sound.description ? (
										<DrawerDescription className="max-w-[60ch] text-sm text-pretty leading-relaxed text-muted-foreground">
											{sound.description}
										</DrawerDescription>
									) : null}
								</div>
								<div className="flex shrink-0 items-center gap-1">
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

						{/* Meta as bare icon row, no pill chrome */}
						<div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
							<div className="flex items-center gap-1.5 tabular-nums">
								<Clock className="size-3.5" aria-hidden />
								<span>{formatDuration(sound.meta.duration)}</span>
							</div>
							<div className="flex items-center gap-1.5 tabular-nums">
								<HardDrive className="size-3.5" aria-hidden />
								<span>{formatSizeKb(sound.meta.sizeKb)}</span>
							</div>
							<div className="flex items-center gap-1.5">
								<Scale className="size-3.5" aria-hidden />
								<span>{sound.meta.license}</span>
							</div>
							{tags.length > 0 ? (
								<div className="flex items-center gap-1.5">
									<Tag className="size-3.5" aria-hidden />
									<span>
										{tags.slice(0, 3).join(", ")}
										{tags.length > 3 ? ` +${tags.length - 3}` : null}
									</span>
								</div>
							) : null}
						</div>

						{/* Player */}
						<PlayerStrip
							name={sound.name}
							playState={playState}
							onToggle={toggle}
						/>

						{/* Install */}
						<div className="border-border/60 border-t pt-6">
							<SoundInstallInstructions soundName={sound.name} />
						</div>
					</div>
				) : null}
			</DrawerContent>
		</Drawer>
	);
}
