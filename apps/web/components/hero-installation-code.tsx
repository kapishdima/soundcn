import { useMemo } from "react";
import { useInstallMethod } from "@/hooks/use-install-method";
import { usePackageManager } from "@/hooks/use-package-manager";
import { useTypewriter } from "@/hooks/use-typewriter";
import { getInstallPrefix } from "@/lib/package-manager";
import type { SoundCatalogItem } from "@soundcn/sounds/catalog";

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
	const [pm] = usePackageManager();
	const [method] = useInstallMethod();
	const heroWords = useMemo(() => pickHeroWords(sounds, 6), [sounds]);

	const { text: typedName, isTyping: cursorActive } = useTypewriter({
		words: heroWords,
	});

	const framework = method === "shadcn-vue" ? "vue" : "react";
	const prefix = getInstallPrefix(pm, framework);

	return (
		<div className="bg-secondary/70 border-border/60 inline-flex items-center gap-3 rounded-lg border px-4 py-2.5 font-mono text-sm backdrop-blur-sm">
			<span className="text-primary select-none">$</span>
			<code className="text-foreground/80">
				<span>{`${prefix} add @soundcn/`}</span>
				<span className="text-primary">{typedName}</span>
			</code>
			<span
				className="inline-block w-[7px] h-[15px] rounded-[1px] bg-primary/60"
				style={{
					animation: cursorActive
						? "none"
						: "blink-caret 1.1s step-end infinite",
				}}
				aria-hidden="true"
			/>
		</div>
	);
}
