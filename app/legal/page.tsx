import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://soundcn.dev";

export const metadata: Metadata = {
	title: "Privacy & Terms",
	description:
		"soundcn privacy policy and terms of service. Open-source sound effects for modern web apps.",
	openGraph: {
		type: "website",
		url: `${siteUrl}/legal`,
		title: "Privacy & Terms | soundcn",
		description: "soundcn privacy policy and terms of service.",
	},
	alternates: {
		canonical: `${siteUrl}/legal`,
	},
};

export default function Page() {
	return <LegalPage />;
}
