import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { RoadmapStatus, RoadmapStep } from "@/lib/roadmap";
import { playSound } from "@/lib/sound-engine";
import { loadSoundAsset } from "@/lib/sound-loader";
import { cn } from "@/lib/utils";

const EQ_HEIGHTS = [40, 70, 30, 80, 50] as const;

// Store in-flight Promises to prevent duplicate loads when multiple items
// with the same soundName reveal simultaneously.
const soundCache = new Map<string, Promise<string>>();

// Timestamp-based check avoids a mutable let + module-level setTimeout.
const PAGE_LOAD_MS = typeof window !== "undefined" ? Date.now() : 0;
const isPageSettled = () => Date.now() - PAGE_LOAD_MS > 700;

async function fireSound(soundName: string, volume = 0.42) {
	try {
		let promise = soundCache.get(soundName);
		if (!promise) {
			promise = loadSoundAsset(soundName).then((asset) => asset.dataUri);
			soundCache.set(soundName, promise);
		}
		const dataUri = await promise;
		await playSound(dataUri, { volume });
	} catch {
		// Autoplay blocked or asset missing — fail silently
	}
}

function useReveal(soundName: string) {
	const [isVisible, setIsVisible] = useState(false);
	const [pinged, setPinged] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(false);

	const elementRef = useRef<HTMLDivElement>(null);
	const hasRevealedRef = useRef(false);
	const pingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const unpingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Observe reduced-motion preference
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReducedMotion(mq.matches);
		const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	// Scroll-reveal + sound trigger.
	// Skip re-observing if the element has already revealed — reducedMotion
	// changes after reveal only affect future items, not this one.
	useEffect(() => {
		const el = elementRef.current;
		if (!el || hasRevealedRef.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting || hasRevealedRef.current) return;

				hasRevealedRef.current = true;
				setIsVisible(true);

				if (isPageSettled() && !reducedMotion) {
					pingTimer.current = setTimeout(() => {
						fireSound(soundName);
						setPinged(true);
						unpingTimer.current = setTimeout(() => setPinged(false), 1400);
					}, 220);
				}
			},
			{ threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
		);

		observer.observe(el);
		return () => {
			observer.disconnect();
			if (pingTimer.current) clearTimeout(pingTimer.current);
			if (unpingTimer.current) clearTimeout(unpingTimer.current);
		};
	}, [soundName, reducedMotion]);

	return { elementRef, isVisible, pinged, reducedMotion };
}

export function RoadmapItem({
	step,
	isLast,
}: {
	step: RoadmapStep;
	isLast: boolean;
}) {
	const { elementRef, isVisible, pinged, reducedMotion } = useReveal(
		step.soundName,
	);

	return (
		<div
			ref={elementRef}
			className="flex gap-6 sm:gap-10"
			style={{
				opacity: isVisible ? 1 : 0,
				transform:
					reducedMotion || isVisible ? "translateY(0)" : "translateY(40px)",
				transition: reducedMotion
					? "opacity 0.3s ease-out"
					: "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)",
			}}
		>
			{/* ── Left: step index + connector line ─────────────────── */}
			<div className="flex w-6 shrink-0 flex-col items-center">
				<span
					className={cn(
						"font-mono text-xs tabular-nums select-none pt-1 transition-colors duration-500",
						isVisible ? "text-primary/55" : "text-muted-foreground/25",
					)}
				>
					{String(step.id).padStart(2, "0")}
				</span>

				{!isLast && (
					<div className="mt-3 flex-1 min-h-16 w-px" aria-hidden="true">
						<div
							className="h-full w-full origin-top"
							style={{
								background:
									"linear-gradient(to bottom, color-mix(in oklch, var(--border) 65%, transparent), transparent)",
								transform: isVisible ? "scaleY(1)" : "scaleY(0)",
								transition: "transform 1s cubic-bezier(0.22,1,0.36,1) 400ms",
							}}
						/>
					</div>
				)}
			</div>

			{/* ── Right: content ───────────────────────────────────── */}
			<div className="relative min-w-0 flex-1 pb-16 overflow-hidden">
				{/* Decorative large step number */}
				<span
					className="pointer-events-none absolute -top-2 right-0 font-display font-bold leading-none text-foreground select-none"
					style={{
						fontSize: "clamp(5rem, 12vw, 8.5rem)",
						opacity: isVisible ? 0.032 : 0,
						transform: reducedMotion || isVisible ? "scale(1)" : "scale(1.25)",
						transition: reducedMotion
							? "opacity 0.3s ease-out"
							: "opacity 1.1s ease-out 100ms, transform 1.1s cubic-bezier(0.22,1,0.36,1) 100ms",
					}}
					aria-hidden="true"
				>
					{String(step.id).padStart(2, "0")}
				</span>

				{/* Status */}
				<div
					className="mb-4 ml-1"
					style={{
						opacity: isVisible ? 1 : 0,
						transition: "opacity 0.5s ease-out 180ms",
					}}
				>
					<StatusIndicator status={step.status} />
				</div>

				{/* Title */}
				<h2
					className="font-display text-xl font-bold sm:text-2xl mb-3 text-balance"
					style={{
						opacity: isVisible ? 1 : 0,
						transform:
							reducedMotion || isVisible
								? "translateX(0)"
								: "translateX(-10px)",
						transition: reducedMotion
							? "opacity 0.3s ease-out"
							: "opacity 0.65s ease-out 100ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) 100ms",
					}}
				>
					{step.title}
				</h2>

				{/* Description */}
				<p
					className="text-muted-foreground leading-relaxed text-pretty max-w-lg text-sm sm:text-[0.9375rem]"
					style={{
						opacity: isVisible ? 1 : 0,
						transition: "opacity 0.7s ease-out 200ms",
					}}
				>
					{step.description}
				</p>

				{/* Sound feedback label */}
				<SoundLabel
					soundName={step.soundName}
					stepId={step.id}
					pinged={pinged}
					isVisible={isVisible}
					reducedMotion={reducedMotion}
				/>
			</div>
		</div>
	);
}

function StatusIndicator({ status }: { status: RoadmapStatus }) {
	if (status === "shipped") {
		return (
			<span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-primary/80">
				<span className="flex size-4 items-center justify-center rounded-full bg-primary/15 border border-primary/25">
					<Check className="size-2.5" aria-hidden="true" />
				</span>
				Shipped
			</span>
		);
	}

	if (status === "building") {
		return (
			<span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-amber-600 dark:text-amber-400">
				<span className="relative flex size-3 shrink-0" aria-hidden="true">
					<span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-amber-400 opacity-60" />
					<span className="relative inline-flex size-3 rounded-full bg-amber-500" />
				</span>
				Building
			</span>
		);
	}

	return (
		<span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/45">
			Next up
		</span>
	);
}

function SoundLabel({
	soundName,
	stepId,
	pinged,
	isVisible,
	reducedMotion,
}: {
	soundName: string;
	stepId: number;
	pinged: boolean;
	isVisible: boolean;
	reducedMotion: boolean;
}) {
	return (
		<div
			className="mt-5 flex items-center gap-2"
			style={{
				opacity: isVisible ? 1 : 0,
				transform:
					reducedMotion || isVisible ? "translateY(0)" : "translateY(6px)",
				transition:
					"opacity 0.6s ease-out 320ms, transform 0.6s ease-out 320ms",
			}}
		>
			{/* Mini EQ bars — animate when pinged */}
			<span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
				{EQ_HEIGHTS.map((h) => (
					<span
						key={`eq-${stepId}-${h}`}
						className={cn(
							"w-[2px] rounded-full transition-colors duration-700",
							pinged
								? "bg-primary/55 eq-bar-mini eq-bar-playing"
								: "bg-muted-foreground/25",
						)}
						style={
							{
								height: `${h}%`,
								"--eq-d": `${0.55 + h * 0.1}s`,
								"--eq-del": `${h * 0.07}s`,
							} as React.CSSProperties
						}
					/>
				))}
			</span>

			<span
				className={cn(
					"font-mono text-[11px] transition-colors duration-700",
					pinged ? "text-primary/60" : "text-muted-foreground/35",
				)}
			>
				{soundName}
			</span>
		</div>
	);
}
