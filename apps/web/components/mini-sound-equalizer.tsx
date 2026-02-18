import { useMemo } from "react";
import { generateSoundWaves } from "@/lib/sound-data";
import { cn } from "@/lib/utils";

export function MiniSoundEqualizer({
	name,
	selected = false,
}: {
	name: string;
	selected?: boolean;
}) {
	const bars = useMemo(() => generateSoundWaves(name), [name]);

	return (
		<div
			className="flex items-end justify-center gap-[3px] h-10"
			aria-hidden="true"
		>
			{bars.map((bar, i) => (
				<span
					key={`${name}-${i}-${bar.height}-${bar.duration}-${bar.delay}`}
					className={cn(
						"eq-bar-mini w-[3.5px] rounded-full transition-colors",
						selected
							? "bg-primary/60"
							: "bg-muted-foreground/20 group-hover:bg-primary/70",
					)}
					style={
						{
							height: `${bar.height}%`,
							"--eq-d": `${bar.duration}`,
							"--eq-del": `${bar.delay}`,
						} as React.CSSProperties
					}
				/>
			))}
		</div>
	);
}
