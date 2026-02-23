import type { Metadata } from "next";
import { ShowcasesPage } from "@/components/showcases-page";
import { communityShowcases, officialShowcases } from "@/data/showcases";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://soundcn.dev";

export const metadata: Metadata = {
	title: "Showcases",
	description:
		"Real projects built with soundcn. Explore official and community apps that bring their UX to life with sound effects.",
	openGraph: {
		type: "website",
		url: `${siteUrl}/showcases`,
		title: "Showcases | soundcn",
		description:
			"Real projects built with soundcn. Explore official and community apps that bring their UX to life with sound effects.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Showcases | soundcn",
		description:
			"Real projects built with soundcn. Explore official and community apps that bring their UX to life with sound effects.",
	},
	alternates: {
		canonical: `${siteUrl}/showcases`,
	},
};

export default function Page() {
	return (
		<ShowcasesPage
			official={officialShowcases}
			community={communityShowcases}
		/>
	);
}
