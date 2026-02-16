import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/soundcn/ui/button";

type CopyButtonProps = {
	value: string;
	successText?: string;
	children?: React.ReactNode;
};

export function CopyButton({
	value,
	successText = "Copied!",
	children,
}: CopyButtonProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			/* noop */
		}
	};

	return (
		<Button
			onClick={handleCopy}
			className={cn(
				"inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-[color,background-color,border-color,box-shadow] duration-150 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
				copied
					? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
					: "border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 active:scale-[0.97]",
			)}
		>
			{copied ? (
				<>
					<Check className="size-3.5" />
					<span className="hidden sm:inline">{successText}</span>
				</>
			) : (
				(children ?? <span className="hidden sm:inline">Copy</span>)
			)}
			<span className="sr-only" aria-live="polite">
				{copied ? successText : ""}
			</span>
		</Button>
	);
}
