"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { CodeBlock } from "@/components/code-block/code-block";
import { CopyButton } from "@/components/copy-button/copy-button";
import { cn } from "@/lib/utils";

const LONG_THRESHOLD = 6;

export function SoundCopyBlock({
	label,
	text,
}: {
	label: string;
	text: string;
}) {
	const lineCount = text.split("\n").length;
	const isLong = lineCount > LONG_THRESHOLD;

	const [expanded, setExpanded] = useState(false);

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<div className="flex items-baseline gap-2">
					<div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
						{label}
					</div>
					{isLong ? (
						<div className="text-[11px] tabular-nums text-muted-foreground/60">
							{lineCount} lines
						</div>
					) : null}
				</div>
				<CopyButton text={text} size="icon-sm" />
			</div>
			<div className="relative overflow-hidden bg-code">
				<div
					className={cn(
						"transition-[max-height] duration-300 ease-out",
						isLong && !expanded
							? "max-h-56 overflow-hidden"
							: "max-h-[2000px]",
					)}
				>
					<CodeBlock>{text}</CodeBlock>
				</div>
				{isLong && !expanded ? (
					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-code via-code/80 to-transparent"
						aria-hidden
					/>
				) : null}
			</div>
			{isLong ? (
				<button
					type="button"
					onClick={() => setExpanded((v) => !v)}
					className="flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary/40 hover:text-foreground"
				>
					<ChevronDown
						className={cn(
							"size-3.5 transition-transform duration-200",
							expanded && "rotate-180",
						)}
						aria-hidden
					/>
					<span>{expanded ? "Show less" : "Show all"}</span>
				</button>
			) : null}
		</div>
	);
}
