import type { SoundAsset } from "@soundcn/engine";

export async function loadSoundAsset(name: string): Promise<SoundAsset> {
  const mod: Record<string, unknown> = await import(
    /* webpackExclude: /it's/ */
    `@/registry/soundcn/sounds/${name}/${name}`
  );

  // Find the SoundAsset export by scanning for an object with `dataUri`
  for (const key of Object.keys(mod)) {
    const val = mod[key];
    if (val && typeof val === "object" && "dataUri" in val && "name" in val) {
      return val as SoundAsset;
    }
  }

  throw new Error(`No SoundAsset export found in module "${name}"`);
}
