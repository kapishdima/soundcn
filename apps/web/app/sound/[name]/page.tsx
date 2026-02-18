import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SoundDetailPage } from "@/components/sound-detail-page";
import {
	getAllSounds,
	getRelatedSounds,
	getSoundByName,
} from "@/lib/sound-data";

interface PageProps {
	params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
	return getAllSounds().map((s) => ({ name: s.name }));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { name } = await params;
	const sound = getSoundByName(name);
	if (!sound) return {};

	const title = `${sound.title} - ${sound.broadCategory} Sound Effect`;
	const description =
		sound.description ||
		`${sound.title} is a free ${sound.broadCategory.toLowerCase()} sound effect. Duration: ${sound.meta.duration.toFixed(2)}s. Install with a single CLI command.`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `https://soundcn.dev/sound/${name}`,
			type: "website",
		},
		twitter: {
			card: "summary",
			title,
			description,
		},
		alternates: {
			canonical: `https://soundcn.dev/sound/${name}`,
		},
	};
}

export default async function SoundPage({ params }: PageProps) {
	const { name } = await params;
	const sound = getSoundByName(name);
	if (!sound) notFound();

	const related = getRelatedSounds(name, sound.broadCategory);

	return <SoundDetailPage sound={sound} relatedSounds={related} />;
}
