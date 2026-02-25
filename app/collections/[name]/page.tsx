import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionDetailPage } from "@/components/collection-detail-page";
import { COLLECTIONS, getCollectionSounds } from "@/lib/collections";

interface Props {
	params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
	return COLLECTIONS.map((c) => ({ name: c.name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { name } = await params;
	const collection = COLLECTIONS.find((c) => c.name === name);
	if (!collection) return {};
	return {
		title: collection.title,
		description: collection.description,
	};
}

export default async function Page({ params }: Props) {
	const { name } = await params;
	const collection = COLLECTIONS.find((c) => c.name === name);
	if (!collection) notFound();

	const sounds = getCollectionSounds(name);

	return <CollectionDetailPage collection={collection} sounds={sounds} />;
}
