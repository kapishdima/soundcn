import type { Metadata } from "next";
import { RoadmapPage } from "@/components/roadmap-page";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://soundcn.dev";

export const metadata: Metadata = {
	title: "Roadmap",
	description:
		"Where soundcn is headed — new components, curated packs, global audio control, real showcases, MCP tooling, and more sounds.",
	openGraph: {
		type: "website",
		url: `${siteUrl}/roadmap`,
		title: "Roadmap | soundcn",
		description:
			"Where soundcn is headed — new components, curated packs, global audio control, real showcases, MCP tooling, and more sounds.",
	},
	alternates: {
		canonical: `${siteUrl}/roadmap`,
	},
};

export default function Page() {
	return <RoadmapPage />;
}
