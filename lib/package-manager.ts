export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export const PACKAGE_MANAGERS: PackageManager[] = ["npm", "pnpm", "yarn", "bun"];

const PM_PREFIX: Record<PackageManager, string> = {
  npm: "npx shadcn@latest",
  pnpm: "pnpm dlx shadcn@latest",
  yarn: "npx shadcn@latest",
  bun: "bunx --bun shadcn@latest",
};

const PM_PREFIX_VUE: Record<PackageManager, string> = {
  npm: "npx shadcn-vue@latest",
  pnpm: "pnpm dlx shadcn-vue@latest",
  yarn: "npx shadcn-vue@latest",
  bun: "bunx --bun shadcn-vue@latest",
};

export const PM_STORAGE_KEY = "soundcn-pm";
export const DEFAULT_PM: PackageManager = "npm";

export function getInstallPrefix(pm: PackageManager, framework: "react" | "vue" = "react"): string {
  return framework === "vue" ? PM_PREFIX_VUE[pm] : PM_PREFIX[pm];
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
