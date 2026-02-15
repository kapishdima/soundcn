import { type PackageManager, getInstallPrefix } from "@/lib/package-manager";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://soundcn.dev";

export function buildInstallCommand(soundNames: string[], pm: PackageManager): string {
  if (soundNames.length === 0) return "";
  const urls = soundNames.map((name) => `${BASE_URL}/r/${name}.json`);
  return `${getInstallPrefix(pm)} add ${urls.join(" ")}`;
}
