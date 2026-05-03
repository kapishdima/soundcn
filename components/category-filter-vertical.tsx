"use client";

import { memo, useMemo } from "react";
import { ClickableWithSound } from "@/components/clickable-with-sound";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { buildCategoryOptions } from "@/lib/sound-filters";
import { cn } from "@/lib/utils";

interface CategoryFilterVerticalProps {
	activeCategory: string;
	onChange: (category: string) => void;
	sounds: SoundCatalogItem[];
}

export const CategoryFilterVertical = memo(function CategoryFilterVertical({
	activeCategory,
	onChange,
	sounds,
}: CategoryFilterVerticalProps) {
	const options = useMemo(() => buildCategoryOptions(sounds), [sounds]);

	return (
		<div className="flex flex-col gap-1">
			{options.map((option) => {
				const isActive = option.key === activeCategory;
				return (
					<ClickableWithSound key={option.key}>
						<Button
							onClick={() => {
								onChange(option.key);
								trackEvent("category_filtered", { category: option.key });
							}}
							variant={isActive ? "default" : "ghost"}
							className="w-full justify-between gap-3 px-3"
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
