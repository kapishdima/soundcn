export const ALL_CATEGORY = "all" as const;

export interface SoundCatalogItem {
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

const BROAD_CATEGORY_MAP: Record<string, string> = {
  // UI
  click: "UI",
  close: "UI",
  open: "UI",
  toggle: "UI",
  switch: "UI",
  scroll: "UI",
  maximize: "UI",
  minimize: "UI",
  hover: "UI",
  select: "UI",
  back: "UI",
  drop: "UI",

  // Feedback
  confirmation: "Feedback",
  error: "Feedback",
  notification: "Feedback",
  question: "Feedback",
  feedback: "Feedback",
  success: "Feedback",

  // Impact
  impact: "Impact",
  explosion: "Impact",
  glass: "Impact",
  metal: "Impact",
  chop: "Impact",

  // Game
  "game-8bit": "Game",
  arcade: "Game",
  battle: "Game",
  begin: "Game",
  championship: "Game",
  choose: "Game",
  combo: "Game",
  deathmatch: "Game",
  fight: "Game",
  flawless: "Game",
  kill: "Game",
  loser: "Game",
  multi: "Game",
  player: "Game",
  prepare: "Game",
  round: "Game",
  story: "Game",
  sudden: "Game",
  survival: "Game",
  three: "Game",
  tie: "Game",
  time: "Game",
  two: "Game",
  war: "Game",
  winner: "Game",
  "it's": "Game",

  // Retro
  glitch: "Retro",
  computer: "Retro",
  bong: "Retro",

  // Sci-Fi
  laser: "Sci-Fi",
  force: "Sci-Fi",
  phase: "Sci-Fi",
  phaser: "Sci-Fi",
  space: "Sci-Fi",
  thruster: "Sci-Fi",
  zap: "Sci-Fi",
  engine: "Sci-Fi",

  // Cards & Board
  card: "Cards & Board",
  cards: "Cards & Board",
  chip: "Cards & Board",
  chips: "Cards & Board",
  dice: "Cards & Board",
  die: "Cards & Board",

  // Jingles
  jingles: "Jingles",
  pep: "Jingles",

  // Voiceover
  voiceover: "Voiceover",

  // Footsteps
  footstep: "Footsteps",

  // Environment
  creak: "Environment",
  door: "Environment",

  // Items
  book: "Items",
  cloth: "Items",
  belt: "Items",
  handle: "Items",
  knife: "Items",
  slime: "Items",
  scratch: "Items",

  // Tones
  tone: "Tones",
  pluck: "Tones",
  tick: "Tones",
  low: "Tones",
  high: "Tones",

  // Power
  power: "Game",
  draw: "Cards & Board",
  hold: "Cards & Board",
};

export const CATEGORY_ORDER = [
  "UI",
  "Feedback",
  "Game",
  "Impact",
  "Sci-Fi",
  "Retro",
  "Cards & Board",
  "Tones",
  "Jingles",
  "Voiceover",
  "Footsteps",
  "Items",
  "Environment",
  "Other",
] as const;

export function getBroadCategory(primaryCategory: string): string {
  return BROAD_CATEGORY_MAP[primaryCategory] ?? "Other";
}

export function formatDuration(seconds: number): string {
  return `${seconds.toFixed(2)}s`;
}

export function formatSizeKb(sizeKb: number): string {
  return `${sizeKb}KB`;
}
