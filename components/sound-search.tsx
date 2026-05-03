"use client";

import { Search } from "lucide-react";
import { useEffect, useRef } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

interface SoundSearchProps {
	value: string;
	onChange: (value: string) => void;
	onEnterGrid?: () => void;
	className?: string;
}

export function SoundSearch({
	value,
	onChange,
	onEnterGrid,
	className,
}: SoundSearchProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				inputRef.current?.focus();
			}
		}
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<InputGroup className={cn("max-w-[20vw]", className)}>
			<InputGroupAddon align="inline-start">
				<Search aria-hidden="true" />
			</InputGroupAddon>
			<InputGroupInput
				value={value}
				onChange={(e) => onChange(e.target.value)}
				name="search"
				aria-label="Search sounds"
				autoComplete="off"
				placeholder="Search sounds..."
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						onEnterGrid?.();
					}
				}}
				ref={inputRef}
			/>
			<InputGroupAddon align="inline-end">
				<Kbd>CMD+K</Kbd>
			</InputGroupAddon>
		</InputGroup>
	);
}
