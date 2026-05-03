"use client";

import { Check } from "lucide-react";
import { memo } from "react";
import { MiniSoundEqualizer } from "@/components/mini-sound-equalizer";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { formatDuration } from "@/lib/sound-catalog";
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
		// Shift+click or ctrl/cmd+click toggles selection
		if (e.shiftKey || e.metaKey || e.ctrlKey) {
			e.preventDefault();
			onBatchSelect?.(sound.name);
			return;
		}
		// In select mode, toggle selection on normal click
		if (selectMode) {
			onBatchSelect?.(sound.name);
			return;
		}
		onSelect(sound);
	};

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
				selected
					? "border-primary bg-primary/[0.06] ring-1 ring-primary/30 scale-[0.97] transition-[border-color,box-shadow,transform] duration-200"
					: "border-border/50 bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.08] hover:scale-[1.03] active:scale-[0.97] transition-[border-color,box-shadow,transform] duration-200",
			)}
		>
			<CardHeader>
				{/* Selection indicator */}
				{selectMode || selected ? (
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
				) : null}

				{/* Mini equalizer bars */}
				<MiniSoundEqualizer name={sound.name} selected={selected} />

				{/* Sound name */}
				<CardTitle className="line-clamp-1 text-center text-sm font-medium">
					{sound.title}
				</CardTitle>

				{/* Category + duration */}
				<CardDescription className="text-muted-foreground text-xs text-center">
					{sound.broadCategory} · {formatDuration(sound.meta.duration)}
				</CardDescription>
			</CardHeader>
		</Card>
	);
});
