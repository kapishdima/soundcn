import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { HeroBars } from "@/components/hero-bars";
import type { Collection } from "@/lib/collections";
import type { SoundCatalogItem } from "@/lib/sound-catalog";

interface CollectionsListPageProps {
	collections: Array<Collection & { sounds: SoundCatalogItem[] }>;
}

const SUBCATEGORY_ORDER = [
	"Voice",
	"Interface",
	"Combat",
	"Ambient",
	"Doors",
	"Loot",
	"Crafting",
	"Quests",
	"Fishing",
];

function getSubcategoryLabels(sounds: SoundCatalogItem[]): string[] {
	const seen = new Set<string>();
	for (const s of sounds) {
		if (s.broadCategory && s.broadCategory !== "Other")
			seen.add(s.broadCategory);
	}
	return SUBCATEGORY_ORDER.filter((l) => seen.has(l));
}

export function CollectionsListPage({ collections }: CollectionsListPageProps) {
	const totalSounds = collections.reduce((sum, c) => sum + c.sounds.length, 0);

	return (
		<div className="flex min-h-svh flex-col">
			<Header />

			{/* ── Hero ── */}
			<section className="relative overflow-hidden px-6 pt-8 pb-14 sm:pt-14 sm:pb-20">
				<div
					className="pointer-events-none absolute -top-48 -left-32 size-[400px] rounded-full bg-primary opacity-[0.07] dark:opacity-[0.12] blur-2xl"
					aria-hidden="true"
				/>
				<HeroBars />

				<div className="relative mx-auto max-w-6xl">
					<div
						className="stagger-fade-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-xs font-medium text-primary mb-6"
						style={{ animationDelay: "30ms" }}
					>
						Sound Collections
					</div>

					{/* Fix #1: identity-first headline, total sounds as context */}
					<h1
						className="stagger-fade-up font-display text-4xl font-bold text-balance sm:text-5xl lg:text-6xl"
						style={{ animationDelay: "60ms" }}
					>
						Sound packs.
						<br />
						<span className="text-muted-foreground">
							Themed for every world.
						</span>
					</h1>

					<p
						className="stagger-fade-up text-muted-foreground mt-5 max-w-lg text-base text-pretty leading-relaxed sm:text-lg"
						style={{ animationDelay: "110ms" }}
					>
						Hand-picked packs from iconic game universes.{" "}
						<span className="text-foreground/60">
							<span className="font-medium text-foreground">{totalSounds}</span>{" "}
							sounds across {collections.length}{" "}
							{collections.length === 1 ? "collection" : "collections"}.
						</span>
					</p>
				</div>
			</section>

			{/* ── Collections grid ── */}
			<main
				id="main-content"
				className="stagger-fade-up mx-auto w-full max-w-6xl flex-1 px-6 py-10"
				style={{ animationDelay: "200ms" }}
			>
				{/* Fix #2: max 2 columns so single card isn't lost in a 3-col grid */}
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
					{collections.map((collection) => {
						const labels = getSubcategoryLabels(collection.sounds);
						return (
							<Link
								key={collection.name}
								href={`/collections/${collection.name}`}
								/* Fix #5: removed cursor-pointer (redundant on <a>) */
								className="group relative flex flex-col gap-3 rounded-xl border border-border/50 bg-card p-4 transition-[border-color,box-shadow,transform] duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.08] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
							>
								{/* Title */}
								<span className="font-display text-base font-bold leading-snug text-balance">
									{collection.title}
								</span>

								{/* Description */}
								<p className="text-xs text-muted-foreground leading-relaxed text-pretty line-clamp-3 flex-1">
									{collection.description}
								</p>

								{/* Fix #3: text-xs (12px) instead of text-[10px] */}
								{labels.length > 0 && (
									<div className="flex flex-wrap gap-1">
										{labels.slice(0, 5).map((label) => (
											<span
												key={label}
												className="rounded-full border border-border/50 bg-accent/40 px-2 py-0.5 text-xs text-muted-foreground"
											>
												{label}
											</span>
										))}
									</div>
								)}

								{/* Fix #4: prominent CTA + unified border/50 */}
								<div className="flex items-center justify-between border-t border-border/50 pt-2">
									<span className="text-xs text-muted-foreground tabular-nums">
										<span className="font-semibold text-primary">
											{collection.sounds.length}
										</span>{" "}
										sounds
									</span>
									<span className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-primary">
										Browse collection
										<ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
									</span>
								</div>
							</Link>
						);
					})}
				</div>
			</main>
		</div>
	);
}
