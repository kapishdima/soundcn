"use client";

import { Check } from "lucide-react";
import { memo } from "react";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { formatDuration, formatSizeKb } from "@/lib/sound-catalog";
import { cn } from "@/lib/utils";

interface SoundCardProps {
	sound: SoundCatalogItem;
	selected?: boolean;
	selectMode?: boolean;
	onSelect: (sound: SoundCatalogItem) => void;
	onBatchSelect?: (soundName: string) => void;
	onPreviewStart: (soundName: string) => void;
	onPreviewStop: () => void;
}

export const SoundCard = memo(function SoundCard({
	sound,
	selected = false,
	selectMode = false,
	onSelect,
	onBatchSelect,
	onPreviewStart,
	onPreviewStop,
}: SoundCardProps) {
	const handleClick = (e: React.MouseEvent) => {
		if (e.shiftKey || e.metaKey || e.ctrlKey) {
			e.preventDefault();
			onBatchSelect?.(sound.name);
			return;
		}
		if (selectMode) {
			onBatchSelect?.(sound.name);
			return;
		}
		onSelect(sound);
	};

	const fallbackDescription =
		sound.description || sound.meta.tags.slice(0, 4).join(", ");

	return (
		<Card
			onClick={handleClick}
			onPointerEnter={(e) => {
				e.currentTarget.focus({ preventScroll: true });
				onPreviewStart(sound.name);
			}}
			onPointerLeave={onPreviewStop}
			onFocus={() => onPreviewStart(sound.name)}
			onBlur={onPreviewStop}
			className={cn(
				"cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/10 hover:ring-primary/30",
				selected &&
					"border-primary bg-primary/[0.06] ring-primary/30 scale-[0.99]",
			)}
		>
			<CardHeader>
				{(selectMode || selected) && (
					<span
						className={cn(
							"absolute top-2.5 right-2.5 flex size-5 items-center justify-center rounded-full border-2 transition-[transform,opacity,color,background-color,border-color] duration-150",
							selected
								? "border-primary bg-primary text-primary-foreground scale-100"
								: "border-muted-foreground/30 bg-card/80 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100",
						)}
					>
						{selected ? <Check className="size-3" strokeWidth={3} /> : null}
					</span>
				)}

				<CardTitle className="line-clamp-1 text-sm font-medium">
					{sound.title}
				</CardTitle>

				<CardDescription className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">
					{fallbackDescription}
				</CardDescription>

				<div className="mt-1 flex items-center justify-between gap-2 text-[10px] tabular-nums text-muted-foreground">
					<span className="inline-flex items-center rounded-sm bg-primary/10 px-1.5 py-0.5 font-medium text-primary/80">
						{sound.broadCategory}
					</span>
					<span className="inline-flex items-center gap-2">
						<span>{formatDuration(sound.meta.duration)}</span>
						<span className="text-muted-foreground/40">·</span>
						<span>{formatSizeKb(sound.meta.sizeKb)}</span>
					</span>
				</div>
			</CardHeader>
		</Card>
	);
});
