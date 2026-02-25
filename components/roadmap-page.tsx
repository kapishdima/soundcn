"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroBars } from "@/components/hero-bars";
import { playSound } from "@/lib/play-sound";
import { loadSoundAsset } from "@/lib/sound-loader";
import { cn } from "@/lib/utils";

// ── Types ────────────────────────────────────────────────────────────────────

type RoadmapStatus = "shipped" | "building" | "next";

interface RoadmapStep {
	id: number;
	title: string;
	description: string;
	status: RoadmapStatus;
	soundName: string;
}

// ── Data ─────────────────────────────────────────────────────────────────────

const ROADMAP_STEPS: RoadmapStep[] = [
	{
		id: 1,
		title: "New Components",
		description:
			"shadcn-style wrappers with sounds already wired in. A Button that clicks, a Toast that pops, a Dialog that whooshes open. Drop them in, they just work.",
		status: "building",
		soundName: "click-8bit",
	},
	{
		id: 2,
		title: "Sound Collections",
		description:
			"Hand-picked packs sorted by feel, not category. \u201CMinimal UI\u201D for things that whisper. \u201CGame Feel\u201D for things that slap. One command to grab the whole pack.",
		status: "building",
		soundName: "notification-pop",
	},
	{
		id: 3,
		title: "Audio Control",
		description:
			"A global sound manager. Mute the whole app from one place, dial in volume per category, respect prefers-reduced-motion without any manual checks. The kind of thing that should have shipped first.",
		status: "next",
		soundName: "toggle-001",
	},
	{
		id: 4,
		title: "Real Showcases",
		description:
			"Actual projects using soundcn in production. Not demos. Real UX decisions, real feedback from real users. Submit yours — good ones get featured.",
		status: "building",
		soundName: "success-chime",
	},
	{
		id: 5,
		title: "MCP + Agent Skill",
		description:
			"A Claude MCP server so your coding agent can browse, preview, and install sounds on its own. Tell it what you want, it finds the right sound, wires up the hook, you press accept.",
		status: "next",
		soundName: "laser-1",
	},
	{
		id: 6,
		title: "React Native",
		description:
			"useSound() but on your phone. The same hook, the same install flow — but wired into React Native's audio layer. Expo-compatible, works on iOS and Android. Your web sounds follow you to mobile.",
		status: "next",
		soundName: "phase-jump-1",
	},
	{
		id: 7,
		title: "More Sounds",
		description:
			"703 is a floor, not a ceiling. Ambient loops for loading states, haptic-style micro-interactions, a proper set of destructive-action sounds. Plus community submissions once the pipeline's live.",
		status: "next",
		soundName: "jingles-nes-00",
	},
];

// ── Sound cache ───────────────────────────────────────────────────────────────

const soundCache = new Map<string, string>();

// Allow scroll-triggered sounds only after the page has settled.
// Prevents a burst of audio from all initially-visible items.
let pageSettled = false;
if (typeof window !== "undefined") {
	setTimeout(() => {
		pageSettled = true;
	}, 700);
}

async function fireSound(soundName: string, volume = 0.42) {
	try {
		let dataUri = soundCache.get(soundName);
		if (!dataUri) {
			const asset = await loadSoundAsset(soundName);
			dataUri = asset.dataUri;
			soundCache.set(soundName, dataUri);
		}
		await playSound(dataUri, { volume });
	} catch {
		// Autoplay blocked or asset missing — fail silently
	}
}

// ── Reduced motion ────────────────────────────────────────────────────────────

function usePrefersReducedMotion() {
	const [reduced, setReduced] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
		const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	return reduced;
}

// ── Scroll reveal hook ────────────────────────────────────────────────────────

function useScrollReveal(soundName: string) {
	const [isVisible, setIsVisible] = useState(false);
	const [pinged, setPinged] = useState(false);
	const elementRef = useRef<HTMLDivElement>(null);
	const hasRevealedRef = useRef(false);

	useEffect(() => {
		const el = elementRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasRevealedRef.current) {
					hasRevealedRef.current = true;
					setIsVisible(true);

					if (
						pageSettled &&
						!window.matchMedia("(prefers-reduced-motion: reduce)").matches
					) {
						setTimeout(() => {
							fireSound(soundName);
							setPinged(true);
							// EQ animation runs ~1.4 s then fades back to resting state
							setTimeout(() => setPinged(false), 1400);
						}, 220);
					}
				}
			},
			{ threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [soundName]);

	return { elementRef, isVisible, pinged };
}

// ── Status indicator ──────────────────────────────────────────────────────────

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
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
					<span className="relative inline-flex size-3 rounded-full bg-red-500" />
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

// ── EQ sound label ────────────────────────────────────────────────────────────
// Non-interactive label that visually pulses when the scroll sound fires.

const EQ_HEIGHTS = [40, 70, 30, 80, 50] as const;

function SoundLabel({
	soundName,
	stepId,
	pinged,
	isVisible,
}: {
	soundName: string;
	stepId: number;
	pinged: boolean;
	isVisible: boolean;
}) {
	return (
		<div
			className="mt-5 flex items-center gap-2"
			style={{
				opacity: isVisible ? 1 : 0,
				transform: isVisible ? "translateY(0)" : "translateY(6px)",
				transition:
					"opacity 0.6s ease-out 320ms, transform 0.6s ease-out 320ms",
			}}
		>
			{/* Mini EQ bars — animate when pinged */}
			<span
				className="flex items-end gap-[2px]"
				style={{ height: 12 }}
				aria-hidden="true"
			>
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

// ── Roadmap item ──────────────────────────────────────────────────────────────

function RoadmapItem({ step, isLast }: { step: RoadmapStep; isLast: boolean }) {
	const { elementRef, isVisible, pinged } = useScrollReveal(step.soundName);
	const reducedMotion = usePrefersReducedMotion();

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
			<div
				className="flex shrink-0 flex-col items-center"
				style={{ width: 24 }}
			>
				<span
					className={cn(
						"font-mono text-xs tabular-nums select-none pt-1 transition-colors duration-500",
						isVisible ? "text-primary/55" : "text-muted-foreground/25",
					)}
				>
					{String(step.id).padStart(2, "0")}
				</span>

				{!isLast && (
					<div
						className="mt-3 flex-1 min-h-16"
						style={{ width: 1 }}
						aria-hidden="true"
					>
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
					className="mb-4"
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
				/>
			</div>
		</div>
	);
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function RoadmapPage() {
	return (
		<div className="flex min-h-svh flex-col">
			<Header />

			{/* ── Hero ─────────────────────────────────────────────── */}
			<section className="relative overflow-hidden px-6 pt-8 pb-14 sm:pt-14 sm:pb-20">
				<HeroBars />

				<div
					className="pointer-events-none absolute -top-48 -left-32 size-[400px] rounded-full bg-primary opacity-[0.07] dark:opacity-[0.12] blur-2xl"
					aria-hidden="true"
				/>
				<div
					className="pointer-events-none absolute -bottom-20 -right-12 size-[280px] rounded-full bg-primary opacity-[0.04] dark:opacity-[0.08] blur-3xl"
					aria-hidden="true"
				/>

				<div className="relative mx-auto max-w-6xl">
					{/* Eyebrow */}
					<div
						className="stagger-fade-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-xs font-medium text-primary mb-6"
						style={{ animationDelay: "30ms" }}
					>
						<span className="relative flex size-2 shrink-0" aria-hidden="true">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
							<span className="relative inline-flex size-2 rounded-full bg-primary" />
						</span>
						What&apos;s coming
					</div>

					<h1
						className="stagger-fade-up font-display text-4xl font-bold text-balance sm:text-5xl lg:text-6xl"
						style={{ animationDelay: "60ms" }}
					>
						The plan.
						<br />
						<span className="text-muted-foreground">No vague promises.</span>
					</h1>

					<p
						className="stagger-fade-up text-muted-foreground mt-5 max-w-lg text-base text-pretty leading-relaxed sm:text-lg"
						style={{ animationDelay: "110ms" }}
					>
						Seven things shipping.{" "}
						<span className="text-foreground/60">
							Each step plays its sound as you scroll.
						</span>
					</p>
				</div>
			</section>

			{/* ── Timeline ─────────────────────────────────────────── */}
			<main
				id="main-content"
				className="mx-auto w-full max-w-3xl flex-1 px-6 pt-10 pb-28"
			>
				{ROADMAP_STEPS.map((step, i) => (
					<RoadmapItem
						key={step.id}
						step={step}
						isLast={i === ROADMAP_STEPS.length - 1}
					/>
				))}
			</main>

			<Footer />
		</div>
	);
}
