import type { Metadata } from "next";
import { CollectionsListPage } from "@/components/collections-list-page";
import { COLLECTIONS, getCollectionSounds } from "@/lib/collections";

export const metadata: Metadata = {
	title: "Collections",
	description:
		"Curated sound packs themed around games and universes. Browse World of Warcraft sounds and more.",
};

export default function Page() {
	const collections = COLLECTIONS.map((collection) => ({
		...collection,
		sounds: getCollectionSounds(collection.name),
	}));

	return <CollectionsListPage collections={collections} />;
}
