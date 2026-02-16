"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
	INSTALL_METHODS,
	INSTALL_METHOD_LABELS,
	type InstallMethod,
} from "@/lib/install-method";
import { cn } from "@/lib/utils";

interface InstallMethodSwitcherProps {
	value: InstallMethod;
	onChange: (method: InstallMethod) => void;
}

export function InstallMethodSwitcher({
	value,
	onChange,
}: InstallMethodSwitcherProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [indicator, setIndicator] = useState({ x: 0, width: 0, baseWidth: 1 });
	const measured = useRef(false);

	const measure = useCallback(() => {
		const container = containerRef.current;
		if (!container) return;
		const activeBtn = container.querySelector<HTMLButtonElement>(
			"[aria-checked='true']",
		);
		if (!activeBtn) return;
		const firstBtn = container.querySelector<HTMLButtonElement>("button");
		const baseWidth = firstBtn?.offsetWidth || activeBtn.offsetWidth;
		setIndicator({
			x: activeBtn.offsetLeft,
			width: activeBtn.offsetWidth,
			baseWidth,
		});
		measured.current = true;
	}, []);

	useEffect(() => {
		measure();
	}, [value, measure]);

	useEffect(() => {
		const ro = new ResizeObserver(measure);
		if (containerRef.current) ro.observe(containerRef.current);
		return () => ro.disconnect();
	}, [measure]);

	return (
		<div
			ref={containerRef}
			className="relative inline-flex items-center rounded-lg border border-border/60 bg-secondary/50 p-[3px] backdrop-blur-sm"
			role="radiogroup"
			aria-label="Installation method"
		>
			{indicator.width > 0 && (
				<span
					className={cn(
						"absolute top-[3px] bottom-[3px] rounded-md bg-background shadow-sm shadow-primary/10 dark:shadow-primary/5",
						measured.current &&
							"transition-transform duration-200 ease-out",
					)}
					style={{
						width: indicator.baseWidth,
						transform: `translateX(${indicator.x}px) scaleX(${indicator.width / indicator.baseWidth})`,
						transformOrigin: "left",
					}}
					aria-hidden="true"
				/>
			)}

			{INSTALL_METHODS.map((method) => {
				const isActive = method === value;
				return (
					// biome-ignore lint/a11y/useSemanticElements: radiogroup pattern
					<button
						type="button"
						key={method}
						role="radio"
						aria-checked={isActive}
						onClick={() => onChange(method)}
						className={cn(
							"relative z-10 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150",
							"focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
							isActive
								? "text-foreground"
								: "text-muted-foreground/70 hover:text-muted-foreground",
						)}
					>
						{INSTALL_METHOD_LABELS[method]}
					</button>
				);
			})}
		</div>
	);
}
