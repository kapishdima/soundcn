import type { Metadata } from "next";
import { SponsorsPage } from "@/components/sponsors-page";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://soundcn.dev";

export const metadata: Metadata = {
	title: "Sponsors",
	description:
		"People and companies who support soundcn — free open-source sound effects for modern web apps.",
	openGraph: {
		type: "website",
		url: `${siteUrl}/sponsors`,
		title: "Sponsors | soundcn",
		description: "People and companies who keep soundcn free and open source.",
	},
	alternates: {
		canonical: `${siteUrl}/sponsors`,
	},
};

export default function Page() {
	return <SponsorsPage />;
}
