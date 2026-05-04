import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SoundCatalogItem } from "@/lib/sound-catalog";

type SoundNavigationProps = {
	sounds: SoundCatalogItem[];
	sound: SoundCatalogItem | null;
	setSoundParam: (name: string | null) => void;
};

export const SoundNavigation = ({
	sounds,
	sound,
	setSoundParam,
}: SoundNavigationProps) => {
	const currentIndex = sound
		? sounds.findIndex((s) => s.name === sound.name)
		: -1;
	const canPrev = currentIndex > 0;
	const canNext = currentIndex >= 0 && currentIndex < sounds.length - 1;
	const goPrev = () => {
		if (canPrev) setSoundParam(sounds[currentIndex - 1].name);
	};
	const goNext = () => {
		if (canNext) setSoundParam(sounds[currentIndex + 1].name);
	};

	return (
		<div className="mx-1 flex items-center gap-1">
			<Button
				variant="ghost"
				size="icon-sm"
				onClick={goPrev}
				disabled={!canPrev}
				aria-label="Previous sound"
			>
				<ChevronLeft aria-hidden="true" />
			</Button>
			<Button
				variant="ghost"
				size="icon-sm"
				onClick={goNext}
				disabled={!canNext}
				aria-label="Next sound"
			>
				<ChevronRight aria-hidden="true" />
			</Button>
		</div>
	);
};
