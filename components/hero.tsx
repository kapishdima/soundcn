// import { HeroBars } from "@/components/hero-bars";
import { HeroInstallationCode } from "@/components/hero-installation-code";
import { HeroSponsors } from "@/components/hero-sponsors";
import PixelBlast from "@/components/PixelBlast";
import type { SoundCatalogItem } from "@/lib/sound-catalog";

export function Hero({ sounds }: { sounds: SoundCatalogItem[] }) {
	return (
		<section className="relative overflow-hidden px-6 pt-8 pb-14 sm:pt-14 sm:pb-20">
			<div
				className="pointer-events-none absolute -top-48 -left-32 size-[400px] rounded-full bg-primary opacity-[0.07] dark:opacity-[0.12] blur-2xl"
				aria-hidden="true"
			/>
			<div className="w-full absolute inset-0">
				<PixelBlast
					variant="square"
					pixelSize={8}
					color="#ffe8e0"
					patternScale={2.5}
					patternDensity={1.2}
					enableRipples={false}
					rippleSpeed={0.35}
					rippleThickness={0.1}
					rippleIntensityScale={1}
					speed={0.2}
					transparent
					edgeFade={0.35}
				/>
			</div>
			{/* <HeroBars /> */}

			<div className="relative mx-auto max-w-6xl">
				<h1
					className="font-display text-4xl font-bold text-balance sm:text-5xl lg:text-6xl"
					style={{ animationDelay: "50ms" }}
				>
					Curated UI sounds
					<br />
					<span className="text-primary">Copy. Paste. Play</span>
				</h1>

				<p
					className="stagger-fade-up text-muted-foreground mt-5 max-w-lg text-base text-pretty leading-relaxed sm:text-lg"
					style={{ animationDelay: "100ms" }}
				>
					Open-source sound effects for creative web apps. Install any sound
					with a shadcn
				</p>

				<div
					className="stagger-fade-up mt-7"
					style={{ animationDelay: "150ms" }}
				>
					<HeroInstallationCode sounds={sounds} />
				</div>

				<HeroSponsors />
			</div>
		</section>
	);
}
