export type SponsorStats = {
	monthLabel: string;
	visitors: number;
	pageViews: number;
	bounceRate: number;
};

export const SPONSOR_STATS: SponsorStats = {
	monthLabel: "May 2026",
	visitors: 2.641,
	pageViews: 4.465,
	bounceRate: 0.73,
};

export function formatCount(n: number): string {
	if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
	if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
	return String(n);
}

export function formatPct(n: number): string {
	return `${Math.round(n * 100)}%`;
}

export function formatDelta(n: number): string {
	const sign = n > 0 ? "+" : n < 0 ? "−" : "";
	return `${sign}${Math.round(Math.abs(n) * 100)}%`;
}
