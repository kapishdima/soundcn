// Deterministic bar configs for the hero equalizer
export const HERO_BARS = Array.from({ length: 32 }, (_, i) => ({
	duration: 0.6 + (((i * 7) % 11) / 11) * 0.9,
	delay: (((i * 3) % 17) / 17) * 1.5,
	height: 20 + (((i * 5) % 7) / 7) * 80,
}));

export const SOUNDS_LENGTH = "703+";
export const EMPTY_EQ = [35, 55, 25, 70, 40, 60, 30];

export const SPONSOR_URL =
	"https://www.creem.io/payment/prod_6HJFTdpzKJPSsXuBFpG1RC";

export const SPONSOR_PRICE = "$5";
export const SPONSOR_PRICE_TYPE = "one-time";

export const MENU = [
	{ href: "/collections", label: "Collections" },
	{ href: "/roadmap", label: "Roadmap" },
	{ href: "/sponsors", label: "Sponsors" },
] as const;

export const GITHUB_URL = "https://github.com/kapishdima/soundcn";

export const SUPPORT_EMAIL = "kapishdima@gmail.com";
