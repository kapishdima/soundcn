"use client";

import { ExternalLink, Twitter } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Showcase } from "@/data/showcases";

interface ShowcaseCardProps {
	showcase: Showcase;
	style?: React.CSSProperties;
}

export function ShowcaseCard({ showcase, style }: ShowcaseCardProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const playPromiseRef = useRef<Promise<void> | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const handlePointerEnter = () => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const v = videoRef.current;
		if (!v) return;
		playPromiseRef.current = v
			.play()
			.then(() => setIsPlaying(true))
			.catch(() => {});
	};

	const handlePointerLeave = () => {
		const v = videoRef.current;
		if (!v) return;
		const settle = playPromiseRef.current ?? Promise.resolve();
		settle
			.then(() => {
				v.pause();
				v.currentTime = 0;
				setIsPlaying(false);
			})
			.catch(() => {});
		playPromiseRef.current = null;
	};

	// Deterministic bar heights from id hash for EQ animation
	const eqHeights = [40, 70, 55, 85, 60].map(
		(h, i) =>
			((h + (showcase.id.charCodeAt(i % showcase.id.length) ?? 0)) % 60) + 35,
	);

	return (
		<article
			className="stagger-fade-up group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.08] hover:scale-[1.02] active:scale-[0.97] transition-[border-color,box-shadow,transform] duration-200 focus-within:ring-2 focus-within:ring-ring/50 focus-within:outline-none"
			onPointerEnter={handlePointerEnter}
			onPointerLeave={handlePointerLeave}
			style={style}
		>
			{/* Video */}
			<div className="relative aspect-video w-full overflow-hidden bg-muted">
				<video
					ref={videoRef}
					src={showcase.videoSrc}
					poster={showcase.posterSrc}
					loop
					playsInline
					preload="none"
					width={640}
					height={360}
					className="h-full w-full object-cover"
					aria-label={`Preview of ${showcase.title}`}
				>
					<track kind="captions" />
				</video>

				{/* Play hint — fades out when playing */}
				<div
					className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200"
					style={{ opacity: isPlaying ? 0 : 1 }}
					aria-hidden="true"
				>
					<div className="flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/80 backdrop-blur-sm shadow-sm">
						<div className="ml-0.5 size-0 border-y-[5px] border-l-[9px] border-y-transparent border-l-foreground/70" />
					</div>
				</div>
			</div>

			{/* Card body */}
			<div className="flex flex-1 flex-col gap-3 p-4">
				{/* Title row with compact EQ bars — animate on group hover via CSS */}
				<div className="flex items-start gap-2.5">
					{/* Compact EQ strip — 16px tall, 5 bars, same animation system */}
					<div
						className="flex shrink-0 items-end gap-[2px] pt-0.5"
						style={{ height: 16 }}
						aria-hidden="true"
					>
						{eqHeights.map((h, i) => (
							<span
								key={i}
								className="eq-bar-mini w-[2.5px] rounded-full bg-muted-foreground/25 group-hover:bg-primary/55"
								style={
									{
										height: `${h}%`,
										"--eq-d": `${0.65 + (i % 3) * 0.15}s`,
										"--eq-del": `${i * 0.07}s`,
									} as React.CSSProperties
								}
							/>
						))}
					</div>
					<div className="min-w-0">
						<h3 className="font-display text-sm font-bold leading-snug line-clamp-1">
							{showcase.title}
						</h3>
						<p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
							by{" "}
							<a
								href={showcase.authorUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								{showcase.author}
							</a>
						</p>
					</div>
				</div>

				{/* Description */}
				{showcase.description && (
					<p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed text-pretty">
						{showcase.description}
					</p>
				)}

				{/* Sound chips — styled like inactive category pills */}
				{showcase.sounds.length > 0 && (
					<div className="flex flex-wrap gap-1.5">
						{showcase.sounds.slice(0, 3).map((sound) => (
							<Link
								key={sound.name}
								href={`/sound/${sound.name}`}
								className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground transition-[color,border-color,background-color] duration-150 hover:border-primary/25 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
							>
								{sound.title}
							</Link>
						))}
						{showcase.sounds.length > 3 && (
							<span className="inline-flex items-center rounded-full border border-border/50 bg-card px-2.5 py-1 text-xs text-muted-foreground/50">
								+{showcase.sounds.length - 3}
							</span>
						)}
					</div>
				)}

				{/* Actions */}
				<footer className="mt-auto flex items-center justify-between pt-1">
					<a
						href={showcase.projectUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground shadow-sm shadow-primary/15 transition-[background-color,box-shadow,opacity] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
					>
						<ExternalLink className="size-3" aria-hidden="true" />
						View Project
					</a>

					{showcase.twitterUrl && (
						<a
							href={showcase.twitterUrl}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`${showcase.author} on Twitter`}
							className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
						>
							<Twitter className="size-4" aria-hidden="true" />
						</a>
					)}
				</footer>
			</div>
		</article>
	);
}
