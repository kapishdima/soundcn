"use client";

import { use } from "react";
import { InstallMethodContext } from "@/contexts/install-method-context";
import type { InstallMethod } from "@/lib/install-method";

export function useInstallMethod(): [
  InstallMethod,
  (method: InstallMethod) => void,
  boolean,
] {
  const context = use(InstallMethodContext);
  if (!context) {
    throw new Error(
      "useInstallMethod must be used within <InstallMethodProvider>",
    );
  }
  return context;
}
