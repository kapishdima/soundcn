import { Loader2, Play, Square } from "lucide-react";
import type { PlayState } from "@/hooks/use-sound-playback";
import { cn } from "@/lib/utils";

export function SoundPlayControl({ state }: { state: PlayState }) {
	const isPlaying = state === "playing";
	const isLoading = state === "loading";

	return (
		<span
			className={cn(
				"relative flex size-9 shrink-0 items-center justify-center rounded-full transition-[color,background-color,box-shadow] duration-200",
				isPlaying
					? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
					: "bg-secondary text-muted-foreground group-hover/player:bg-primary/10 group-hover/player:text-primary",
			)}
		>
			{isPlaying ? (
				<span className="bg-primary/20 absolute inset-0 animate-ping motion-reduce:animate-none rounded-full" />
			) : null}
			{isLoading ? (
				<Loader2 className="size-4 animate-spin" />
			) : isPlaying ? (
				<Square className="relative size-3.5" />
			) : (
				<Play className="relative ml-0.5 size-4" />
			)}
		</span>
	);
}
