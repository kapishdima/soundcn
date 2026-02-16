const HERO_BARS = Array.from({ length: 32 }, (_, i) => ({
	duration: 0.6 + (((i * 7) % 11) / 11) * 0.9,
	delay: (((i * 3) % 17) / 17) * 1.5,
	height: 20 + (((i * 5) % 7) / 7) * 80,
}));

export function HeroBars() {
	return (
		<div
			className="pointer-events-none absolute inset-0 flex items-end gap-[2px] overflow-hidden opacity-[0.045] dark:opacity-[0.08] [contain:layout_style]"
			aria-hidden="true"
		>
			{HERO_BARS.map((bar, i) => (
				<span
					key={`hero-bar-${bar.height}-${i}`}
					className="hero-eq-bar min-w-0 flex-1 rounded-t-sm bg-primary"
					style={{
						height: `${bar.height}%`,
						transformOrigin: "bottom",
						animation: `eq ${bar.duration}s ease-in-out ${bar.delay}s infinite`,
					}}
				/>
			))}
		</div>
	);
}
