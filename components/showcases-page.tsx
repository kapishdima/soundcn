import { Github } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { HeroBars } from "@/components/hero-bars";
import { ShowcaseCard } from "@/components/showcase-card";
import type { Showcase } from "@/data/showcases";

// ── Empty states ────────────────────────────────────────────────────────────

function OfficialEmptyState() {
	return (
		<div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-secondary/20 px-8 py-16 text-center">
			<div
				className="mb-4 flex items-end justify-center gap-[3px] opacity-20"
				aria-hidden="true"
			>
				{[20, 45, 65, 80, 100, 80, 65, 45, 20].map((h) => (
					<div
						key={h}
						className="rounded-t-sm bg-primary"
						style={{ width: 4, height: h * 0.5 }}
					/>
				))}
			</div>
			<p className="text-sm font-medium text-foreground">
				Official showcases coming soon.
			</p>
			<p className="mt-1 text-xs text-muted-foreground">
				Check back for projects from the soundcn team.
			</p>
		</div>
	);
}

function CommunityEmptyState() {
	return (
		<div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-primary/25 bg-primary/[0.03] px-8 py-16 text-center">
			<div
				className="mb-4 flex items-end justify-center gap-[3px] opacity-25"
				aria-hidden="true"
			>
				{[20, 45, 65, 80, 100, 80, 65, 45, 20].map((h) => (
					<div
						key={h}
						className="rounded-t-sm bg-primary"
						style={{ width: 4, height: h * 0.5 }}
					/>
				))}
			</div>
			<p className="text-sm font-medium text-foreground">
				No community projects yet.
			</p>
			<p className="mt-1 text-xs text-muted-foreground">
				Be the first to submit yours!
			</p>
			<a
				href="https://github.com/kapishdima/soundcn/issues/new?template=project-showcase.md"
				target="_blank"
				rel="noopener noreferrer"
				className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/[0.08] px-4 py-2 text-xs font-medium text-primary transition-[background-color,border-color] hover:bg-primary/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
			>
				Submit your project
			</a>
		</div>
	);
}

// ── Main page ───────────────────────────────────────────────────────────────

interface ShowcasesPageProps {
	official: Showcase[];
	community: Showcase[];
}

export function ShowcasesPage({ official, community }: ShowcasesPageProps) {
	return (
		<div className="min-h-screen">
			<Header />

			<main id="main-content">
				{/* ── Hero — mirrors hero.tsx exactly ───────────────────── */}
				<section className="relative overflow-hidden px-6 pt-8 pb-14 sm:pt-14 sm:pb-20">
					{/* Animated EQ bars background — same as home */}
					<HeroBars />

					{/* Ambient blob */}
					<div
						className="pointer-events-none absolute -top-48 -left-32 size-[400px] rounded-full bg-primary opacity-[0.07] dark:opacity-[0.12] blur-2xl"
						aria-hidden="true"
					/>

					<div className="relative mx-auto max-w-6xl">
						<h1
							className="stagger-fade-up font-display text-4xl font-bold text-balance sm:text-5xl lg:text-6xl"
							style={{ animationDelay: "50ms" }}
						>
							Built with <span className="text-primary">soundcn.</span>
							<br />
							<span className="text-muted-foreground">
								Real projects. Real sounds.
							</span>
						</h1>

						<p
							className="stagger-fade-up text-muted-foreground mt-5 max-w-lg text-base text-pretty leading-relaxed sm:text-lg"
							style={{ animationDelay: "100ms" }}
						>
							Discover apps, games, and tools built with soundcn sounds. Get
							inspired — then submit your own project.
						</p>

						<div
							className="stagger-fade-up mt-7 flex flex-wrap gap-3"
							style={{ animationDelay: "150ms" }}
						>
							<a
								href="#submit"
								className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/15 transition-[background-color,box-shadow,opacity] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
							>
								Submit your project
							</a>
							<Link
								href="/"
								className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card px-5 py-2.5 text-sm font-medium transition-[color,border-color,background-color] duration-150 hover:border-primary/25 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
							>
								Browse sounds
							</Link>
						</div>
					</div>
				</section>

				{/* ── Community section ─────────────────────────────────── */}
				<section
					aria-labelledby="community-heading"
					className="stagger-fade-up mx-auto max-w-6xl px-6 py-16"
					style={{ animationDelay: "260ms" }}
				>
					<div className="mb-8 flex items-center gap-3">
						<h2
							id="community-heading"
							className="font-display text-2xl font-bold sm:text-3xl"
						>
							Community
						</h2>
						<span className="inline-flex items-center rounded-full border border-border/60 bg-secondary/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
							{community.length}
						</span>
					</div>

					{community.length > 0 ? (
						<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
							{community.map((showcase, i) => (
								<ShowcaseCard
									key={showcase.id}
									showcase={showcase}
									style={{
										animationDelay: `${Math.min(280 + i * 50, 400)}ms`,
									}}
								/>
							))}
						</div>
					) : (
						<CommunityEmptyState />
					)}
				</section>

				{/* ── Official section ──────────────────────────────────── */}
				<section
					aria-labelledby="official-heading"
					className="stagger-fade-up mx-auto max-w-6xl px-6 pb-16"
					style={{ animationDelay: "200ms" }}
				>
					<div className="mb-8 flex items-center gap-3">
						<h2
							id="official-heading"
							className="font-display text-2xl font-bold sm:text-3xl"
						>
							Official
						</h2>
						<span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/[0.08] px-2.5 py-0.5 text-xs font-medium text-primary">
							{official.length}
						</span>
					</div>

					{official.length > 0 ? (
						<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
							{official.map((showcase, i) => (
								<ShowcaseCard
									key={showcase.id}
									showcase={showcase}
									style={{
										animationDelay: `${Math.min(220 + i * 60, 380)}ms`,
									}}
								/>
							))}
						</div>
					) : (
						<OfficialEmptyState />
					)}
				</section>

				{/* ── Submit CTA ────────────────────────────────────────── */}
				<div
					id="submit"
					className="stagger-fade-up scroll-mt-20 mx-auto max-w-6xl px-6 pb-24"
					style={{ animationDelay: "320ms" }}
				>
					<div className="relative overflow-hidden rounded-2xl border border-dashed border-primary/30 bg-primary/[0.04] px-8 py-12 text-center">
						{/* Ambient blob inside CTA */}
						<div
							className="pointer-events-none absolute -bottom-20 -right-20 size-[280px] rounded-full bg-primary opacity-[0.06] dark:opacity-[0.10] blur-2xl"
							aria-hidden="true"
						/>

						<div className="relative">
							<h2 className="font-display text-2xl font-bold text-balance sm:text-3xl">
								Made something with soundcn?
							</h2>
							<p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground leading-relaxed text-pretty">
								Open a GitHub Issue using the showcase template. We review
								submissions and feature the best projects on this page.
							</p>
							<div className="mt-7 flex flex-wrap items-center justify-center gap-3">
								<a
									href="https://github.com/kapishdima/soundcn/issues/new?template=project-showcase.md"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/15 transition-[background-color,box-shadow,opacity] hover:opacity-90 hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
								>
									<Github className="size-4" aria-hidden="true" />
									Submit via GitHub Issues
								</a>
								<a
									href="https://github.com/kapishdima/soundcn"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card px-6 py-2.5 text-sm font-medium transition-[color,border-color,background-color] duration-150 hover:border-primary/25 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
								>
									View on GitHub
								</a>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
