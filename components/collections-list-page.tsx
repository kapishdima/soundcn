import { AppHero } from "@/components/app-hero";
import { CollectionCard } from "@/components/collection-card";
import type { Collection } from "@/lib/collections";
import type { SoundCatalogItem } from "@/lib/sound-catalog";

interface CollectionsListPageProps {
	collections: Array<Collection & { sounds: SoundCatalogItem[] }>;
}

export function CollectionsListPage({ collections }: CollectionsListPageProps) {
	const totalSounds = collections.reduce((sum, c) => sum + c.sounds.length, 0);

	return (
		<>
			<AppHero
				eyebrow="Sound Collections"
				title={
					<>
						Sound packs.
						<br />
						<span className="text-muted-foreground">
							Themed for every world.
						</span>
					</>
				}
				description={
					<>
						Hand-picked packs from iconic game universes.{" "}
						<span className="text-foreground/60">
							<span className="font-medium text-foreground">{totalSounds}</span>{" "}
							sounds across {collections.length}{" "}
							{collections.length === 1 ? "collection" : "collections"}.
						</span>
					</>
				}
			/>

			<main
				id="main-content"
				className="stagger-fade-up mx-auto w-full max-w-6xl flex-1 px-6 py-10"
				style={{ animationDelay: "200ms" }}
			>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
					{collections.map((collection) => (
						<CollectionCard key={collection.name} collection={collection} />
					))}
				</div>
			</main>
		</>
	);
}
