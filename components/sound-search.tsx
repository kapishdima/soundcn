"use client";

import { Search } from "lucide-react";
import { useEffect, useRef } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";

interface SoundSearchProps {
	value: string;
	onChange: (value: string) => void;
	onEnterGrid?: () => void;
}

export function SoundSearch({
	value,
	onChange,
	onEnterGrid,
}: SoundSearchProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	// TODO: Replace with useEvent
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
		<InputGroup>
			<InputGroupAddon align="inline-start">
				<Search
					className="text-muted-foreground/60 absolute left-3 top-1/2 size-4 -translate-y-1/2"
					aria-hidden="true"
				/>
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
