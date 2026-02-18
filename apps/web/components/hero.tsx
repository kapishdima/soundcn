import { HeroBars } from "@/components/hero-bars";
import { HeroInstallationCode } from "@/components/hero-installation-code";
import { SOUNDS_LENGTH } from "@/lib/constants";
import type { SoundCatalogItem } from "soundcn/catalog";

export function Hero({ sounds }: { sounds: SoundCatalogItem[] }) {
	return (
		<section className="relative overflow-hidden px-6 pt-8 pb-14 sm:pt-14 sm:pb-20">
			<div
				className="pointer-events-none absolute -top-48 -left-32 size-[400px] rounded-full bg-primary opacity-[0.07] dark:opacity-[0.12] blur-2xl"
				aria-hidden="true"
			/>

			<HeroBars />

			<div className="relative mx-auto max-w-6xl">
				<h1
					className="stagger-fade-up font-display text-4xl font-bold text-balance sm:text-5xl lg:text-6xl"
					style={{ animationDelay: "50ms" }}
				>
					<span className="text-primary">{SOUNDS_LENGTH}</span> curated UI
					sounds.
					<br />
					<span className="text-muted-foreground">Copy. Paste. Play.</span>
				</h1>

				<p
					className="stagger-fade-up text-muted-foreground mt-5 max-w-lg text-base text-pretty leading-relaxed sm:text-lg"
					style={{ animationDelay: "100ms" }}
				>
					Open-source sound effects for modern web apps. Install any sound with
					a single CLI command.
				</p>

				<div
					className="stagger-fade-up mt-7"
					style={{ animationDelay: "150ms" }}
				>
					<HeroInstallationCode sounds={sounds} />
				</div>
			</div>
		</section>
	);
}
