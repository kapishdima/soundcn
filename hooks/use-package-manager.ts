"use client";

import { use } from "react";
import { PackageManagerContext } from "@/contexts/package-manager-context";
import type { PackageManager } from "@/lib/package-manager";

export function usePackageManager(): [
  PackageManager,
  (pm: PackageManager) => void,
  boolean,
] {
  const context = use(PackageManagerContext);
  if (!context) {
    throw new Error(
      "usePackageManager must be used within <PackageManagerProvider>",
    );
  }
  return context;
}
