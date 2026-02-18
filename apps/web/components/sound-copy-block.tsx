import { CopyButton } from "@/components/copy-button";

export function SoundCopyBlock({
	label,
	text,
}: {
	label: string;
	text: string;
}) {
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground text-[11px] font-semibold uppercase">
					{label}
				</span>
				<CopyButton value={text} />
			</div>
			<pre className="scrollbar-thin overflow-x-auto overflow-y-auto max-h-64 rounded-lg border border-border/40 bg-secondary/30 p-3 text-[13px] leading-relaxed">
				<code className="font-mono">{text}</code>
			</pre>
		</div>
	);
}
