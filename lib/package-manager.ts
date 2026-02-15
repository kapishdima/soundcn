export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export const PACKAGE_MANAGERS: PackageManager[] = ["npm", "pnpm", "yarn", "bun"];

const PM_PREFIX: Record<PackageManager, string> = {
  npm: "npx shadcn",
  pnpm: "pnpm dlx shadcn",
  yarn: "npx shadcn",
  bun: "bunx --bun shadcn",
};

export const PM_STORAGE_KEY = "soundcn-pm";
export const DEFAULT_PM: PackageManager = "npm";

export function getInstallPrefix(pm: PackageManager): string {
  return PM_PREFIX[pm];
}

export function loadPackageManager(): PackageManager {
  if (typeof window === "undefined") return DEFAULT_PM;
  try {
    const stored = localStorage.getItem(PM_STORAGE_KEY);
    if (stored && PACKAGE_MANAGERS.includes(stored as PackageManager)) {
      return stored as PackageManager;
    }
  } catch {
    /* SSR or restricted storage */
  }
  return DEFAULT_PM;
}

export function savePackageManager(pm: PackageManager): void {
  try {
    localStorage.setItem(PM_STORAGE_KEY, pm);
  } catch {
    /* restricted storage */
  }
}
