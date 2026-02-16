"use client";

import { memo, useMemo } from "react";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
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
						<button
							type="button"
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
						</button>
					);
				})}
			</div>
		</div>
	);
});
