"use client";

import { useCallback } from "react";
import { loadSoundAsset } from "@/lib/sound-loader";

export function useSoundDownload(soundName: string | null) {
  return useCallback(async () => {
    if (!soundName) return;
    try {
      const asset = await loadSoundAsset(soundName);
      const res = await fetch(asset.dataUri);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${soundName}.${asset.format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(`[useSoundDownload] Failed to download "${soundName}":`, err);
    }
  }, [soundName]);
}
