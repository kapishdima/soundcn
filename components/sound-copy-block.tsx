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
			<pre className="overflow-x-auto rounded-lg border border-border/40 bg-secondary/30 p-3 text-[13px] leading-relaxed [scrollbar-width:none]">
				<code className="font-mono">{text}</code>
			</pre>
		</div>
	);
}
