import { type PackageManager, getInstallPrefix } from "@/lib/package-manager";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://soundcn.dev";

function toCamelCase(name: string): string {
  return name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

export interface SoundSnippets {
  exportName: string;
  installCmd: string;
  usageCode: string;
}

export function getSoundSnippets(name: string, pm: PackageManager): SoundSnippets {
  const exportName = `${toCamelCase(name)}Sound`;
  const installCmd = `${getInstallPrefix(pm)} add ${BASE_URL}/r/${name}.json`;
  const usageCode = `import { useSound } from "@/hooks/use-sound";
import { ${exportName} } from "@/sounds/${name}";

const [play] = useSound(${exportName});`;

  return { exportName, installCmd, usageCode };
}
