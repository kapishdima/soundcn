"use client";

import { X } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { useInstallMethod } from "@/hooks/use-install-method";
import { usePackageManager } from "@/hooks/use-package-manager";
import { useSoundSelection } from "@/hooks/use-sound-selection";
import type { SoundCatalogItem } from "soundcn/catalog";
import { buildInstallCommand } from "@/lib/sound-install";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/soundcn/ui/button";

interface BatchInstallBarProps {
	sounds: SoundCatalogItem[];
}

export function BatchInstallBar({ sounds }: BatchInstallBarProps) {
	const [pm] = usePackageManager();
	const [method] = useInstallMethod();
	const { selectedNames, handleClearSelection } = useSoundSelection({ sounds });

	const count = selectedNames.size;

	if (count === 0) return null;

	const cmd = buildInstallCommand(Array.from(selectedNames), pm, method);

	return (
		<div
			className={cn(
				"fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pb-[env(safe-area-inset-bottom)]",
				"flex items-center gap-3 rounded-2xl border border-primary/20",
				"bg-card/95 backdrop-blur-xl shadow-2xl shadow-primary/15",
				"px-5 py-3",
				"animate-in slide-in-from-bottom-4 fade-in-0 duration-300",
			)}
		>
			{/* Count badge */}
			<span className="flex items-center gap-2 text-sm font-semibold text-foreground">
				<span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold tabular-nums">
					{count}
				</span>
				<span className="hidden sm:inline text-muted-foreground font-normal">
					selected
				</span>
			</span>

			{/* Divider */}
			<span className="h-6 w-px bg-border/60" aria-hidden="true" />

			{cmd ? (
				<>
					{/* Copy install command */}
					<CopyButton value={cmd} />

					{/* Preview command (truncated) */}
					<code className="hidden md:block max-w-[280px] truncate text-[11px] text-muted-foreground font-mono">
						{cmd}
					</code>
				</>
			) : (
				<span className="text-xs text-muted-foreground">
					Manual install
				</span>
			)}

			{/* Clear selection */}
			<Button
				onClick={handleClearSelection}
				className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
				aria-label="Clear selection"
			>
				<X className="size-3.5" />
			</Button>
		</div>
	);
}
