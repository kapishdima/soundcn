import { useMemo } from "react";
import { SoundPlayControl } from "@/components/sound-control";
import type { PlayState } from "@/hooks/use-sound-playback";
import { generateWaveform } from "@/lib/sound-data";
import { cn } from "@/lib/utils";

export function PlayerStrip({
	name,
	playState,
	onToggle,
}: {
	name: string;
	playState: PlayState;
	onToggle: () => void;
}) {
	const bars = useMemo(() => generateWaveform(name, 56), [name]);
	const isPlaying = playState === "playing";

	return (
		<button
			type="button"
			onClick={onToggle}
			className={cn(
				"group/player relative flex w-full items-center gap-3 rounded-xl border px-4 py-3 transition-[color,background-color,border-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
				isPlaying
					? "border-primary/30 bg-primary/[0.06]"
					: "border-border/60 bg-secondary/40 hover:border-primary/20 hover:bg-secondary/70",
			)}
			aria-label={isPlaying ? "Stop sound" : "Play sound"}
		>
			<SoundPlayControl state={playState} />

			<div
				className="flex flex-1 items-center justify-center gap-[1.5px] h-8"
				aria-hidden="true"
			>
				{bars.map((h, i) => (
					<span
						key={`${name}-${i}-${h}`}
						className={cn(
							"min-w-0 flex-1 max-w-[3px] rounded-full transition-colors duration-300",
							isPlaying
								? "bg-primary/60"
								: "bg-muted-foreground/15 group-hover/player:bg-muted-foreground/25",
						)}
						style={{ height: `${h}%` }}
					/>
				))}
			</div>
		</button>
	);
}
