import { useMemo } from "react";
import {
	CodeBlockCommand,
	convertNpmCommand,
} from "@/components/code-block-command/code-block-command";
import { Card } from "@/components/ui/card";
import { useInstallMethod } from "@/hooks/use-install-method";
import { usePackageManager } from "@/hooks/use-package-manager";
import { useTypewriter } from "@/hooks/use-typewriter";
import { getInstallPrefix } from "@/lib/package-manager";
import type { SoundCatalogItem } from "@/lib/sound-catalog";

// Pick a diverse subset of sound names for the hero typewriter
function pickHeroWords(sounds: SoundCatalogItem[], count: number): string[] {
	if (sounds.length === 0) return ["click-soft"];
	// Deterministic spread: pick evenly spaced items
	const step = Math.max(1, Math.floor(sounds.length / count));
	const picked: string[] = [];

	for (let i = 0; i < sounds.length && picked.length < count; i += step) {
		picked.push(sounds[i].name);
	}

	return picked;
}

export function HeroInstallationCode({
	sounds,
}: {
	sounds: SoundCatalogItem[];
}) {
	const heroWords = useMemo(() => pickHeroWords(sounds, 6), [sounds]);

	const { text: typedName } = useTypewriter({
		words: heroWords,
	});

	return (
		<Card className="p-0 max-w-[35vw]">
			<CodeBlockCommand
				{...convertNpmCommand(`npx shadcn add @soundcn/${typedName}`)}
			/>
		</Card>
	);
}
