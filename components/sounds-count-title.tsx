export function SoundsCountTitle({ count }: { count: number }) {
	return (
		<p className="text-muted-foreground text-sm tabular-nums">
			{count} sound
			{count !== 1 ? "s" : ""}
		</p>
	);
}
