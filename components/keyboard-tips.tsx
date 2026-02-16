import {
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	ListChecks,
} from "lucide-react";

export function KeyboardTips() {
	return (
		<div className="text-muted-foreground/60 text-xs hidden sm:flex items-center gap-4">
			<p className="flex items-center gap-1.5">
				<span className="flex items-center gap-0.5">
					<ArrowUp className="size-3" />
					<ArrowDown className="size-3" />
					<ArrowLeft className="size-3" />
					<ArrowRight className="size-3" />
				</span>
				to navigate
			</p>
			<p className="flex items-center gap-1.5">
				<ListChecks className="size-3.5" />
				<kbd className="font-mono text-[10px]">&#8984;</kbd>+click to batch
				select
			</p>
		</div>
	);
}
