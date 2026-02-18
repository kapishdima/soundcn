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
  type InstallMethod,
  DEFAULT_IM,
  IM_STORAGE_KEY,
  INSTALL_METHODS,
  loadInstallMethod,
  saveInstallMethod,
} from "@/lib/install-method";

type InstallMethodContextValue = [
  InstallMethod,
  (method: InstallMethod) => void,
  boolean,
];

export const InstallMethodContext =
  createContext<InstallMethodContextValue | null>(null);

export function InstallMethodProvider({ children }: { children: ReactNode }) {
  const [method, setMethod] = useState<InstallMethod>(DEFAULT_IM);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const stored = loadInstallMethod();
    if (stored !== DEFAULT_IM) {
      startTransition(() => setMethod(stored));
    }
  }, []);

  const set = useCallback(
    (next: InstallMethod) => {
      saveInstallMethod(next);
      startTransition(() => setMethod(next));
    },
    [startTransition],
  );

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== IM_STORAGE_KEY) return;
      if (
        e.newValue &&
        INSTALL_METHODS.includes(e.newValue as InstallMethod)
      ) {
        startTransition(() => setMethod(e.newValue as InstallMethod));
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [startTransition]);

  return (
    <InstallMethodContext value={[method, set, isPending]}>
      {children}
    </InstallMethodContext>
  );
}
