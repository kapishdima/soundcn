"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import {
  type PackageManager,
  DEFAULT_PM,
  PM_STORAGE_KEY,
  PACKAGE_MANAGERS,
  loadPackageManager,
  savePackageManager,
} from "@/lib/package-manager";

type PackageManagerContextValue = [
  PackageManager,
  (pm: PackageManager) => void,
  boolean,
];

export const PackageManagerContext =
  createContext<PackageManagerContextValue | null>(null);

export function PackageManagerProvider({ children }: { children: ReactNode }) {
  const [pm, setPm] = useState<PackageManager>(DEFAULT_PM);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const stored = loadPackageManager();
    if (stored !== DEFAULT_PM) {
      startTransition(() => setPm(stored));
    }
  }, []);

  const set = useCallback(
    (next: PackageManager) => {
      savePackageManager(next);
      startTransition(() => setPm(next));
    },
    [startTransition],
  );

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== PM_STORAGE_KEY) return;
      if (
        e.newValue &&
        PACKAGE_MANAGERS.includes(e.newValue as PackageManager)
      ) {
        startTransition(() => setPm(e.newValue as PackageManager));
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [startTransition]);

  return (
    <PackageManagerContext value={[pm, set, isPending]}>
      {children}
    </PackageManagerContext>
  );
}
