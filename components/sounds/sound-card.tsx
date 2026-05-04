"use client";

import { Check, Copy, Tag, Terminal } from "lucide-react";
import type React from "react";
import { memo } from "react";
import {
	convertNpmCommand,
	type PackageManagerWithoutPrompt,
	usePackageManager,
} from "@/components/code-block-command/code-block-command";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { formatDuration, formatSizeKb } from "@/lib/sound-catalog";
import { cn } from "@/lib/utils";

interface SoundCardProps {
	sound: SoundCatalogItem;
	selected?: boolean;
	selectMode?: boolean;
	onSelect: (sound: SoundCatalogItem) => void;
	onBatchSelect?: (soundName: string) => void;
	onPreviewStart: (soundName: string) => void;
	onPreviewStop: () => void;
}

export const SoundCard = memo(function SoundCard({
	sound,
	selected = false,
	selectMode = false,
	onSelect,
	onBatchSelect,
	onPreviewStart,
	onPreviewStop,
}: SoundCardProps) {
	const handleClick = (e: React.MouseEvent) => {
		if (e.shiftKey || e.metaKey || e.ctrlKey) {
			e.preventDefault();
			onBatchSelect?.(sound.name);
			return;
		}
		if (selectMode) {
			onBatchSelect?.(sound.name);
			return;
		}
		onSelect(sound);
	};

	const fallbackDescription =
		sound.description || sound.meta.tags.slice(0, 4).join(", ");

	return (
		<Card
			onClick={handleClick}
			onPointerEnter={(e) => {
				e.currentTarget.focus({ preventScroll: true });
				onPreviewStart(sound.name);
			}}
			onPointerLeave={onPreviewStop}
			onFocus={() => onPreviewStart(sound.name)}
			onBlur={onPreviewStop}
			className={cn(
				"relative min-h-[180px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/10 hover:ring-primary/30",
				selected &&
					"border-primary bg-primary/[0.06] ring-primary/30 scale-[0.99]",
			)}
		>
			<CardHeader>
				{(selectMode || selected) && (
					<span
						className={cn(
							"absolute top-2.5 right-2.5 flex size-5 items-center justify-center rounded-full border-2 transition-[transform,opacity,color,background-color,border-color] duration-150",
							selected
								? "border-primary bg-primary text-primary-foreground scale-100"
								: "border-muted-foreground/30 bg-card/80 scale-90 opacity-0 group-hover/card:opacity-100 group-hover/card:scale-100",
						)}
					>
						{selected ? <Check className="size-3" strokeWidth={3} /> : null}
					</span>
				)}

				<CardTitle className="line-clamp-1 text-sm font-medium">
					{sound.title}
				</CardTitle>

				<CardDescription className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">
					{fallbackDescription}
				</CardDescription>

				<div className="mt-1 flex items-center justify-between gap-2 text-[10px] tabular-nums text-muted-foreground">
					<span className="inline-flex items-center rounded-none bg-primary/10 px-1.5 py-0.5 font-medium text-primary/80">
						{sound.broadCategory}
					</span>
					<span className="inline-flex items-center gap-2">
						<span>{formatDuration(sound.meta.duration)}</span>
						<span className="text-muted-foreground/40">·</span>
						<span>{formatSizeKb(sound.meta.sizeKb)}</span>
					</span>
				</div>
			</CardHeader>

			<SoundActions sound={sound} />
		</Card>
	);
});

const SoundActions: React.FC<{ sound: SoundCatalogItem }> = ({ sound }) => {
	const [packageManager] = usePackageManager();

	const installCommand = convertNpmCommand(
		`npx shadcn add @soundcn/${sound.name}`,
	);
	const { state: copyNameState, copy: copyName } = useCopyToClipboard();
	const { state: copyCommandState, copy: copyCommand } = useCopyToClipboard();

	const command =
		installCommand[packageManager as PackageManagerWithoutPrompt] ||
		installCommand.npm;

	const handleCopyName = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		copyName(sound.name);
	};

	const handleCopyCommand = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		copyCommand(command);
	};

	return (
		<TooltipProvider delayDuration={150}>
			<div className="mt-auto flex items-center justify-start gap-1 px-4">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="icon-sm"
							variant="outline"
							onClick={handleCopyName}
							aria-label={
								copyNameState === "done"
									? "Sound name copied"
									: "Copy sound name"
							}
						>
							{copyNameState === "done" ? (
								<Check className="size-3.5" strokeWidth={2.5} />
							) : (
								<Copy className="size-3.5" />
							)}
						</Button>
					</TooltipTrigger>
					<TooltipContent side="top">
						{copyNameState === "done" ? "Copied" : "Copy sound name"}
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="icon-sm"
							variant="outline"
							onClick={handleCopyCommand}
							aria-label={
								copyCommandState === "done"
									? "Install command copied"
									: "Copy install command"
							}
						>
							{copyCommandState === "done" ? (
								<Check className="size-3.5" strokeWidth={2.5} />
							) : (
								<Terminal className="size-3.5" />
							)}
						</Button>
					</TooltipTrigger>
					<TooltipContent side="top">
						{copyCommandState === "done" ? "Copied" : "Copy install command"}
					</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);
};
