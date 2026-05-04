export function ScoreCell({ label, value }: { label: string; value: string }) {
	return (
		<div className="relative flex flex-col border border-border/70 bg-card p-5">
			<p className="text-xs font-medium text-muted-foreground/70">{label}</p>
			<div className="mt-3 flex items-baseline justify-between gap-3">
				<span className="font-heading text-4xl font-bold leading-none tracking-tight tabular-nums sm:text-5xl">
					{value}
				</span>
			</div>
		</div>
	);
}
