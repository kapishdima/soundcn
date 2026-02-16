"use client";

import { memo, useMemo } from "react";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { buildCategoryOptions } from "@/lib/sound-filters";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/soundcn/ui/button";

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
	const options = useMemo(() => buildCategoryOptions(sounds), [sounds]);

	return (
		<div className="scrollbar-hide overflow-x-auto">
			<div className="flex min-w-max gap-2">
				{options.map((option) => {
					const isActive = option.key === activeCategory;
					return (
						<Button
							key={option.key}
							onClick={() => onChange(option.key)}
							className={cn(
								"inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-[color,border-color,box-shadow,background-color] duration-150 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
								isActive
									? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/15"
									: "border-border/50 bg-card text-foreground hover:border-primary/25 hover:bg-accent",
							)}
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
					);
				})}
			</div>
		</div>
	);
});
