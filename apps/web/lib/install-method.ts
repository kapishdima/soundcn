export type InstallMethod = "shadcn" | "shadcn-vue" | "manual";

export const INSTALL_METHODS: InstallMethod[] = ["shadcn", "shadcn-vue", "manual"];

export const INSTALL_METHOD_LABELS: Record<InstallMethod, string> = {
  shadcn: "React",
  "shadcn-vue": "Vue",
  manual: "Manual",
};

export const IM_STORAGE_KEY = "soundcn-install-method";
export const DEFAULT_IM: InstallMethod = "shadcn";

export function loadInstallMethod(): InstallMethod {
  if (typeof window === "undefined") return DEFAULT_IM;
  try {
    const stored = localStorage.getItem(IM_STORAGE_KEY);
    if (stored && INSTALL_METHODS.includes(stored as InstallMethod)) {
      return stored as InstallMethod;
    }
  } catch {
    /* SSR or restricted storage */
  }
  return DEFAULT_IM;
}

export function saveInstallMethod(method: InstallMethod): void {
  try {
    localStorage.setItem(IM_STORAGE_KEY, method);
  } catch {
    /* restricted storage */
  }
}
