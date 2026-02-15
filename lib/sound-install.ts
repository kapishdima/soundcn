const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://soundcn.dev";

export function buildInstallCommand(soundNames: string[]): string {
  if (soundNames.length === 0) return "";
  const urls = soundNames.map((name) => `${BASE_URL}/r/${name}.json`);
  return `npx shadcn add ${urls.join(" ")}`;
}
