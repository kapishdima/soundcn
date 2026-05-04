import { ClickableWithSound } from "@/components/clickable-with-sound";
import { type UsedByItem, USED_BY } from "@/lib/used-by";

const COLS = 3;

function initials(label: string) {
	return label.replace(/^@/, "").slice(0, 2).toUpperCase();
}

function UsedByCell({ item }: { item: UsedByItem }) {
	return (
		<ClickableWithSound>
			<a
				href={item.tweetUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`${item.name} on X`}
				className="group flex h-20 items-center justify-center bg-background transition-colors duration-150 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset"
			>
				{item.logo ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={item.logo}
						alt={item.name}
						loading="lazy"
						decoding="async"
						className="size-8 rounded-full object-cover opacity-80 transition-opacity duration-150 group-hover:opacity-100"
					/>
				) : (
					<span className="text-xs font-medium text-muted-foreground">
						{initials(item.name)}
					</span>
				)}
			</a>
		</ClickableWithSound>
	);
}

export function UsedByStrip() {
	if (!USED_BY.length) return null;

	const total = Math.max(COLS, Math.ceil(USED_BY.length / COLS) * COLS);
	const empties = total - USED_BY.length;

	return (
		<div className="space-y-3">
			<p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
				Used by
			</p>
			<div className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-border/40 bg-border/40">
				{USED_BY.map((item) => (
					<UsedByCell key={item.id} item={item} />
				))}
				{Array.from({ length: empties }).map((_, i) => (
					<div
						key={`empty-${i}`}
						className="h-20 bg-background"
						aria-hidden
					/>
				))}
			</div>
		</div>
	);
}
