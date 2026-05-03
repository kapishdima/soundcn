"use client";

import { memo, useMemo } from "react";
import { ClickableWithSound } from "@/components/clickable-with-sound";
import { Button } from "@/components/ui/button";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { trackEvent } from "@/lib/analytics";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { buildCategoryOptions } from "@/lib/sound-filters";
import { cn } from "@/lib/utils";

export interface CategoryFilterOption {
	key: string;
	label: string;
	count: number;
}

interface CategoryFilterProps {
	activeCategory: string;
	onChange: (category: string) => void;
	sounds: SoundCatalogItem[];
}

export const CategoryFilter = memo(function CategoryFilter({
	activeCategory,
	onChange,
	sounds,
}: CategoryFilterProps) {
	const { ref, isGrabbing } = useHorizontalScroll<HTMLDivElement>();
	const options = useMemo(() => buildCategoryOptions(sounds), [sounds]);

	return (
		<div
			ref={ref}
			className={cn(
				"scrollbar-hide w-full overflow-x-auto cursor-grab active:cursor-grabbing",
				isGrabbing && "cursor-grabbing",
			)}
		>
			<div className="flex min-w-max gap-2 pr-4">
				{options.map((option) => {
					const isActive = option.key === activeCategory;
					return (
						<ClickableWithSound key={option.key}>
							<Button
								onClick={() => {
									onChange(option.key);
									trackEvent("category_filtered", { category: option.key });
								}}
								variant={isActive ? "default" : "outline"}
							>
								{option.label}
								<span
									className={cn(
										"text-xs tabular-nums",
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
		</div>
	);
});
