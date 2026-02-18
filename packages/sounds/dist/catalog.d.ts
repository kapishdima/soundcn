declare const ALL_CATEGORY: "all";
interface SoundCatalogItem {
    name: string;
    title: string;
    description: string;
    author: string;
    categories: string[];
    primaryCategory: string;
    broadCategory: string;
    meta: {
        duration: number;
        sizeKb: number;
        license: string;
        tags: string[];
        keywords: string[];
    };
}
declare const CATEGORY_ORDER: readonly ["UI", "Feedback", "Game", "Impact", "Sci-Fi", "Retro", "Cards & Board", "Tones", "Jingles", "Voiceover", "Footsteps", "Items", "Environment", "Other"];
declare function getBroadCategory(primaryCategory: string): string;
declare function formatDuration(seconds: number): string;
declare function formatSizeKb(sizeKb: number): string;

export { ALL_CATEGORY, CATEGORY_ORDER, type SoundCatalogItem, formatDuration, formatSizeKb, getBroadCategory };
