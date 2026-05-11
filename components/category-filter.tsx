"use client";

import { memo, useMemo } from "react";
import { ClickableWithSound } from "@/components/clickable-with-sound";
import { Button } from "@/components/ui/button";
import { useTrackEvent } from "@/lib/analytics";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { buildCategoryOptions } from "@/lib/sound-filters";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
	activeCategory: string;
	onChange: (category: string) => void;
	sounds: SoundCatalogItem[];
	className?: string;
}

export const CategoryFilter = memo(function CategoryFilter({
	activeCategory,
	onChange,
	sounds,
	className,
}: CategoryFilterProps) {
	const options = useMemo(() => buildCategoryOptions(sounds), [sounds]);
	const trackEvent = useTrackEvent();

	return (
		<div
			className={cn(
				"scrollbar-hide flex flex-row gap-1 overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-col",
				className,
			)}
		>
			{options.map((option) => {
				const isActive = option.key === activeCategory;
				return (
					<ClickableWithSound key={option.key}>
						<Button
							onClick={() => {
								onChange(option.key);
								trackEvent("category_filtered", { category: option.key });
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
							variant={isActive ? "default" : "ghost"}
							className="h-8 shrink-0 justify-between gap-2 px-3 text-xs lg:h-9 lg:w-full lg:gap-3 lg:text-sm"
						>
							<span className="truncate text-left">{option.label}</span>
							<span
								className={cn(
									"shrink-0 text-xs tabular-nums",
									isActive
										? "text-primary-foreground/65"
										: "text-muted-foreground",
								)}
							>
								{option.count}
							</span>
						</Button>
					</ClickableWithSound>
				);
			})}
		</div>
	);
});
