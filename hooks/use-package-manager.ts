"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import {
  type PackageManager,
  DEFAULT_PM,
  PM_STORAGE_KEY,
  PACKAGE_MANAGERS,
  loadPackageManager,
  savePackageManager,
} from "@/lib/package-manager";

export function usePackageManager(): [PackageManager, (pm: PackageManager) => void, boolean] {
  // Always start with the default so server and client HTML match
  const [pm, setPm] = useState<PackageManager>(DEFAULT_PM);
  const [isPending, startTransition] = useTransition();

  // After hydration, read localStorage in a transition (no flash)
  useEffect(() => {
    const stored = loadPackageManager();
    if (stored !== DEFAULT_PM) {
      startTransition(() => setPm(stored));
    }
  }, []);

  const set = useCallback((next: PackageManager) => {
    savePackageManager(next);
    startTransition(() => setPm(next));
  }, [startTransition]);

  // Sync across tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== PM_STORAGE_KEY) return;
      if (e.newValue && PACKAGE_MANAGERS.includes(e.newValue as PackageManager)) {
        startTransition(() => setPm(e.newValue as PackageManager));
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [startTransition]);

  return [pm, set, isPending];
}
