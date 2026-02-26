import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Collection } from "@/lib/collections";
import {
	getSubcategoryLabels,
	type SoundCatalogItem,
} from "@/lib/sound-catalog";

export function CollectionCard({
	collection,
}: {
	collection: Collection & {
		sounds: SoundCatalogItem[];
	};
}) {
	const labels = getSubcategoryLabels(collection.sounds);

	return (
		<Link
			key={collection.name}
			href={`/collections/${collection.name}`}
			/* Fix #5: removed cursor-pointer (redundant on <a>) */
			className="group relative flex flex-col gap-3 rounded-xl border border-border/50 bg-card p-4 transition-[border-color,box-shadow,transform] duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.08] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
		>
			{/* Title */}
			<span className="font-display text-base font-bold leading-snug text-balance">
				{collection.title}
			</span>

			{/* Description */}
			<p className="text-xs text-muted-foreground leading-relaxed text-pretty line-clamp-3 flex-1">
				{collection.description}
			</p>

			{/* Fix #3: text-xs (12px) instead of text-[10px] */}
			{labels.length > 0 && (
				<div className="flex flex-wrap gap-1">
					{labels.slice(0, 5).map((label) => (
						<span
							key={label}
							className="rounded-full border border-border/50 bg-accent/40 px-2 py-0.5 text-xs text-muted-foreground"
						>
							{label}
						</span>
					))}
				</div>
			)}

			{/* Fix #4: prominent CTA + unified border/50 */}
			<div className="flex items-center justify-between border-t border-border/50 pt-2">
				<span className="text-xs text-muted-foreground tabular-nums">
					<span className="font-semibold text-primary">
						{collection.sounds.length}
					</span>{" "}
					sounds
				</span>
				<span className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-primary">
					Browse collection
					<ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
				</span>
			</div>
		</Link>
	);
}
