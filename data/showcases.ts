export interface ShowcaseSound {
	name: string; // slug → /sound/[name]
	title: string;
}

export interface Showcase {
	id: string;
	type: "official" | "community";
	title: string;
	description?: string;
	author: string;
	videoSrc: string; // /showcases/*.mp4 or external URL
	posterSrc?: string; // thumbnail
	authorUrl?: string;
	projectUrl: string;
	twitterUrl?: string;
	sounds: ShowcaseSound[];
}

export const SHOWCASES: Showcase[] = [
	{
		id: "snap-rotation-dial",
		type: "community",
		title: "Snap Rotation Dial",
		description:
			"A draggable circular dial with snap-to-angle ticks, spring physics, live index display, and tactile sound feedback",
		author: "zenith",
		videoSrc: "/showcases/snap-rotation-dial.mp4",
		posterSrc: "/showcases/snap-rotation-dial.png",
		authorUrl: "https://x.com/bossadizenith",
		projectUrl: "https://micro.bossadizenith.me/components/dial",
		twitterUrl: "https://x.com/zenith/status/2024499594529214799",
		sounds: [
			{
				name: "chip-lay-1",
				title: "Chip Lay",
			},
		],
	},
	// Official and community showcases will be added here.
	// Official entries are created by the soundcn author.
	// Community entries are submitted via GitHub Issues using the showcase template.
];

export const officialShowcases = SHOWCASES.filter((s) => s.type === "official");
export const communityShowcases = SHOWCASES.filter(
	(s) => s.type === "community",
);
