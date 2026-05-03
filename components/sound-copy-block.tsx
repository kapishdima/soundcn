import { CodeBlock } from "@/components/code-block/code-block";
import { CopyButton } from "@/components/copy-button/copy-button";

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
				<CopyButton value={text} text={"Copy"} size="icon-sm" />
			</div>
			<div className="bg-code">
				<CodeBlock>{text}</CodeBlock>
			</div>
			{/* <pre className="scrollbar-thin overflow-x-auto overflow-y-auto max-h-64 rounded-lg border border-border/40 bg-secondary/30 p-3 text-[13px] leading-relaxed">
				<code className="font-mono">{text}</code>
			</pre> */}
		</div>
	);
}
