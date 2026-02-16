"use client";

import {
	ArrowUpRight,
	Clock,
	Download,
	HardDrive,
	Scale,
	Tag,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { CopyButton } from "@/components/copy-button";
import { PackageManagerSwitcher } from "@/components/package-manager-switcher";
import { SoundPlayControl } from "@/components/sound-control";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { usePackageManager } from "@/hooks/use-package-manager";
import { useSoundDownload } from "@/hooks/use-sound-download";
import { type PlayState, useSoundPlayback } from "@/hooks/use-sound-playback";
import { useSoundSelection } from "@/hooks/use-sound-selection";
import type { PackageManager } from "@/lib/package-manager";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { formatDuration, formatSizeKb } from "@/lib/sound-catalog";
import { generateWaveform } from "@/lib/sound-data";
import { getSoundSnippets } from "@/lib/sound-snippets";
import { cn } from "@/lib/utils";

const EMPTY_TAGS: string[] = [];

export function SoundDetail({ sounds }: { sounds: SoundCatalogItem[] }) {
	const [pm, onPmChange] = usePackageManager();
	const { selectedSound: sound, setSoundParam } = useSoundSelection({ sounds });
	const { playState, toggle } = useSoundPlayback(sound?.name ?? null);
	const download = useSoundDownload(sound?.name ?? null);

	const onClose = () => setSoundParam(null);

	const snippets = useMemo(
		() => (sound ? getSoundSnippets(sound.name, pm) : null),
		[sound, pm],
	);
	const tags = sound?.meta.tags ?? EMPTY_TAGS;

	return (
		<Drawer
			open={!!sound}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DrawerContent>
				{sound && snippets ? (
					<div className="mx-auto w-full max-w-xl px-5 pb-8">
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
									<button
										type="button"
										onClick={download}
										className="cursor-pointer text-muted-foreground hover:text-primary hover:bg-primary/10 flex size-9 items-center justify-center rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
										aria-label="Download sound file"
									>
										<Download className="size-[18px]" aria-hidden="true" />
									</button>
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
						<div className="mt-6 flex flex-col gap-5">
							<InstallBlock
								onPmChange={onPmChange}
								pm={pm}
								text={snippets.installCmd}
							/>
							<CopyBlock label="Usage" text={snippets.usageCode} />
						</div>
					</div>
				) : null}
			</DrawerContent>
		</Drawer>
	);
}

function PlayerStrip({
	name,
	playState,
	onToggle,
}: {
	name: string;
	playState: PlayState;
	onToggle: () => void;
}) {
	const bars = useMemo(() => generateWaveform(name, 56), [name]);
	const isPlaying = playState === "playing";

	return (
		<button
			type="button"
			onClick={onToggle}
			className={cn(
				"group/player relative flex w-full items-center gap-3 rounded-xl border px-4 py-3 transition-[color,background-color,border-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
				isPlaying
					? "border-primary/30 bg-primary/[0.06]"
					: "border-border/60 bg-secondary/40 hover:border-primary/20 hover:bg-secondary/70",
			)}
			aria-label={isPlaying ? "Stop sound" : "Play sound"}
		>
			<SoundPlayControl state={playState} />

			<div
				className="flex flex-1 items-center justify-center gap-[1.5px] h-8"
				aria-hidden="true"
			>
				{bars.map((h, i) => (
					<span
						key={`${name}-${i}-${h}`}
						className={cn(
							"min-w-0 flex-1 max-w-[3px] rounded-full transition-colors duration-300",
							isPlaying
								? "bg-primary/60"
								: "bg-muted-foreground/15 group-hover/player:bg-muted-foreground/25",
						)}
						style={{ height: `${h}%` }}
					/>
				))}
			</div>
		</button>
	);
}

/* ── Presentational: Metadata pill ── */

function MetaPill({
	icon: Icon,
	children,
}: {
	icon: React.ComponentType<{ className?: string }>;
	children: React.ReactNode;
}) {
	return (
		<span className="inline-flex items-center gap-1.5 rounded-md bg-secondary/60 px-2.5 py-1 text-xs text-muted-foreground">
			<Icon className="size-3 shrink-0" />
			{children}
		</span>
	);
}

/* ── Presentational: Copiable code block ── */

function CopyBlock({ label, text }: { label: string; text: string }) {
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground text-[11px] font-semibold uppercase">
					{label}
				</span>
				<CopyButton value={text} />
			</div>
			<pre className="overflow-x-auto rounded-lg border border-border/40 bg-secondary/30 p-3 text-[13px] leading-relaxed [scrollbar-width:none]">
				<code className="font-mono">{text}</code>
			</pre>
		</div>
	);
}

/* ── Install block with package manager switcher ── */

function InstallBlock({
	text,
	pm,
	onPmChange,
}: {
	text: string;
	pm: PackageManager;
	onPmChange: (pm: PackageManager) => void;
}) {
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground text-[11px] font-semibold uppercase">
					Install
				</span>
				<CopyButton value={text} successText="Install command copied!" />
			</div>
			<div className="rounded-lg border border-border/40 bg-secondary/30">
				<div className="border-b border-border/40 px-3 py-1.5">
					<PackageManagerSwitcher value={pm} onChange={onPmChange} />
				</div>
				<pre className="overflow-x-auto p-3 text-[13px] leading-relaxed [scrollbar-width:none]">
					<code className="font-mono">{text}</code>
				</pre>
			</div>
		</div>
	);
}
