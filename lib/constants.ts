// Deterministic bar configs for the hero equalizer
export const HERO_BARS = Array.from({ length: 32 }, (_, i) => ({
	duration: 0.6 + (((i * 7) % 11) / 11) * 0.9,
	delay: (((i * 3) % 17) / 17) * 1.5,
	height: 20 + (((i * 5) % 7) / 7) * 80,
}));

export const SOUNDS_LENGTH = "703+";
