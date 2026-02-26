import { SPONSOR_PRICE, SPONSOR_PRICE_TYPE } from "@/lib/constants";

export function SponsorTicker() {
	return (
		<div className="relative inline-flex flex-col sm:flex-row">
			{/* Price column */}
			<div className="relative flex flex-col justify-center gap-1 rounded-tl-lg rounded-tr-lg sm:rounded-tr-none sm:rounded-bl-lg border border-border/70 bg-card px-6 py-4 pr-8">
				<span className="font-display text-[2.75rem] font-bold leading-none text-foreground tracking-tight">
					{SPONSOR_PRICE}
				</span>
				<span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/70">
					{SPONSOR_PRICE_TYPE}
				</span>
				{/* Perforation notch — bottom on mobile, right on desktop */}
				<span
					className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 size-[18px] rounded-full border border-border/70 bg-background sm:bottom-auto sm:top-1/2 sm:-right-[9px] sm:left-auto sm:-translate-x-0 sm:-translate-y-1/2"
					aria-hidden="true"
				/>
			</div>

			{/* Perks column */}
			<div className="flex flex-col justify-center gap-2 rounded-bl-lg rounded-br-lg sm:rounded-bl-none sm:rounded-tr-lg border border-t-0 sm:border-t sm:border-l-0 border-border/70 bg-card/60 px-6 py-4 pl-8">
				{[
					"Your name & link on the sponsors page",
					"Direct support for open-source development",
				].map((perk) => (
					<p
						key={perk}
						className="flex items-start gap-2 text-xs text-muted-foreground"
					>
						<span
							className="mt-[3px] size-1.5 rounded-full bg-primary/50 shrink-0"
							aria-hidden="true"
						/>
						{perk}
					</p>
				))}
				{/* Dashed perforation line */}
				<span
					className="absolute top-0 left-0 hidden sm:block h-full border-l-2 border-dashed border-border/50"
					aria-hidden="true"
				/>
			</div>
		</div>
	);
}
