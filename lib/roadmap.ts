export type RoadmapStatus = "shipped" | "building" | "next";

export interface RoadmapStep {
	id: number;
	title: string;
	description: string;
	status: RoadmapStatus;
	soundName: string;
}

export const ROADMAP_STEPS: RoadmapStep[] = [
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
