import { cache } from "react";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { getAllSounds } from "@/lib/sound-data";

export interface Collection {
	name: string;
	title: string;
	description: string;
	icon: string;
}

export const COLLECTIONS: Collection[] = [
	{
		name: "warcraft",
		title: "World of Warcraft",
		description:
			"110 iconic sounds — interface chimes, NPC voices, combat impacts, dungeon doors, and ambient atmosphere from Blizzard's legendary MMORPG.",
		icon: "⚔️",
	},
];

export const getCollectionSounds = cache(
	(collectionName: string): SoundCatalogItem[] => {
		return getAllSounds().filter((s) => s.categories.includes(collectionName));
	},
);
