export interface Sponsor {
	name: string;
	url: string;
	/** URL to a square logo/avatar (recommended 200×200px) */
	logo?: string;
	/** Short tagline shown on the card */
	tagline?: string;
}

// Add sponsors here as they come in
export const SPONSORS: Sponsor[] = [];
