import { EMPTY_EQ } from "@/lib/constants";

export function EmptyBars() {
	return (
		<div
			className="mx-auto mb-4 flex items-end justify-center gap-[3px] h-8"
			aria-hidden="true"
		>
			{EMPTY_EQ.map((h, i) => (
				<span
					key={`empty-${h}-${i}`}
					className="w-[3px] rounded-full bg-muted-foreground/15"
					style={{ height: `${h}%` }}
				/>
			))}
		</div>
	);
}
