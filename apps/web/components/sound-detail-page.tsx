"use client";

import { ArrowLeft, Clock, HardDrive, Scale, Tag } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { MetaPill } from "@/components/metal-pill";
import { MiniSoundEqualizer } from "@/components/mini-sound-equalizer";
import { SoundDownloadButton } from "@/components/sound-download-button";
import { SoundInstallInstructions } from "@/components/sound-install-instructions";
import { PlayerStrip } from "@/components/sound-player";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { useHoverPreview } from "@/hooks/use-hover-preview";
import { useSoundPlayback } from "@/hooks/use-sound-playback";
import type { SoundCatalogItem } from "@soundcn/sounds/catalog";
import { formatDuration, formatSizeKb } from "@soundcn/sounds/catalog";

/* ── Main page component ── */

interface SoundDetailPageProps {
	sound: SoundCatalogItem;
	relatedSounds: SoundCatalogItem[];
}

export function SoundDetailPage({
	sound,
	relatedSounds,
}: SoundDetailPageProps) {
	const { playState, toggle } = useSoundPlayback(sound.name);

	const { onPreviewStart, onPreviewStop } = useHoverPreview();
	const { gridRef: relatedGridRef, onKeyDown: relatedKeyDown } =
		useGridNavigation();

	const tags = sound.meta.tags;

	return (
		<div className="flex min-h-dvh flex-col">
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium"
			>
				Skip to Content
			</a>

			{/* ── Back navigation ── */}
			<nav className="stagger-fade-up mx-auto w-full max-w-3xl px-6 pt-6 pb-2">
				<Link
					href="/"
					className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
				>
					<ArrowLeft className="size-4" aria-hidden="true" />
					Back to Catalog
				</Link>
			</nav>

			<main
				id="main-content"
				className="mx-auto w-full max-w-3xl flex-1 px-6 pb-16"
			>
				{/* ── Identity ── */}
				<header
					className="stagger-fade-up pt-4 pb-6"
					style={{ animationDelay: "50ms" }}
				>
					<div className="flex items-start justify-between gap-4">
						<div className="min-w-0 flex-1">
							<div className="flex items-center gap-2 mb-2">
								<span className="inline-flex shrink-0 items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
									{sound.broadCategory}
								</span>
								<span className="text-muted-foreground text-xs">
									by {sound.author}
								</span>
							</div>
							<h1 className="font-display text-3xl font-bold text-balance sm:text-4xl">
								{sound.title}
							</h1>
							{sound.description ? (
								<p className="mt-2 text-muted-foreground text-base leading-relaxed text-pretty max-w-xl">
									{sound.description}
								</p>
							) : null}
						</div>

						<SoundDownloadButton name={sound.name} />
					</div>
				</header>

				{/* ── Player ── */}
				<div className="stagger-fade-up" style={{ animationDelay: "100ms" }}>
					<PlayerStrip
						name={sound.name}
						playState={playState}
						onToggle={toggle}
					/>
				</div>

				{/* ── Metadata ── */}
				<div
					className="stagger-fade-up mt-5 flex flex-wrap items-center gap-2"
					style={{ animationDelay: "150ms" }}
				>
					<MetaPill icon={Clock}>
						{formatDuration(sound.meta.duration)}
					</MetaPill>
					<MetaPill icon={HardDrive}>
						{formatSizeKb(sound.meta.sizeKb)}
					</MetaPill>
					<MetaPill icon={Scale}>{sound.meta.license}</MetaPill>
					{tags.length > 0 ? (
						<MetaPill icon={Tag}>
							{tags.slice(0, 4).join(", ")}
							{tags.length > 4 ? ` +${tags.length - 4}` : null}
						</MetaPill>
					) : null}
				</div>

				{/* ── Integration code ── */}
				<div
					className="stagger-fade-up mt-8"
					style={{ animationDelay: "200ms" }}
				>
					<SoundInstallInstructions soundName={sound.name} />
				</div>

				{/* ── Related sounds ── */}
				{relatedSounds.length > 0 ? (
					<section
						className="stagger-fade-up mt-12"
						style={{ animationDelay: "260ms" }}
					>
						<div className="flex items-center justify-between mb-4">
							<h2 className="font-display text-lg font-bold text-balance">
								More {sound.broadCategory} Sounds
							</h2>
							<Link
								href={`/?category=${encodeURIComponent(sound.broadCategory)}`}
								className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none rounded-md px-2 py-1"
							>
								View all
							</Link>
						</div>
						{/** biome-ignore lint/a11y/useSemanticElements: <explanation> */}
						<div
							ref={relatedGridRef}
							onKeyDown={relatedKeyDown}
							role="grid"
							aria-label="Related sounds"
							className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
						>
							{relatedSounds.map((s) => (
								<RelatedSoundCard
									key={s.name}
									sound={s}
									onPreviewStart={onPreviewStart}
									onPreviewStop={onPreviewStop}
								/>
							))}
						</div>
					</section>
				) : null}
			</main>
		</div>
	);
}

const RelatedSoundCard = memo(function RelatedSoundCard({
	sound,
	onPreviewStart,
	onPreviewStop,
}: {
	sound: SoundCatalogItem;
	onPreviewStart: (name: string) => void;
	onPreviewStop: () => void;
}) {
	return (
		<Link
			href={`/sound/${sound.name}`}
			onPointerEnter={() => onPreviewStart(sound.name)}
			onPointerLeave={onPreviewStop}
			onFocus={() => onPreviewStart(sound.name)}
			onBlur={onPreviewStop}
			className="group relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-border/50 bg-card p-4 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.08] hover:scale-[1.03] active:scale-[0.97] transition-[border-color,box-shadow,transform] duration-200 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
		>
			{/* Mini equalizer bars */}
			<MiniSoundEqualizer selected={false} name={sound.name} />

			<span className="line-clamp-1 text-center text-sm font-medium">
				{sound.title}
			</span>

			<span className="text-muted-foreground text-xs">
				{sound.broadCategory} &middot; {formatDuration(sound.meta.duration)}
			</span>
		</Link>
	);
});
