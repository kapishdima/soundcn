function toCamelCase(name: string): string {
  return name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

export interface SoundSnippets {
  exportName: string;
  installCmd: string;
  usageCode: string;
}

export function getSoundSnippets(name: string): SoundSnippets {
  const exportName = `${toCamelCase(name)}Sound`;
  const installCmd = `npx shadcn add https://soundcn.dev/r/${name}.json`;
  const usageCode = `import { useSound } from "@/hooks/use-sound";
import { ${exportName} } from "@/sounds/${name}";

const [play] = useSound(${exportName});`;

  return { exportName, installCmd, usageCode };
}
