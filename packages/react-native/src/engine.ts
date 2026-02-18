import { Audio } from "expo-av";
import type { SoundAsset, SoundEngine, SoundPlayback, PlaySoundOptions } from "@soundcn/engine";

export class ExpoAudioEngine implements SoundEngine {
  async play(asset: SoundAsset, options: PlaySoundOptions = {}): Promise<SoundPlayback> {
    const { volume = 1, playbackRate = 1, onEnd } = options;

    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    const { sound } = await Audio.Sound.createAsync(
      { uri: asset.dataUri },
      {
        volume,
        rate: playbackRate,
        shouldCorrectPitch: true,
      }
    );

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        onEnd?.();
        sound.unloadAsync();
      }
    });

    await sound.playAsync();

    return {
      stop: () => {
        sound.stopAsync().then(() => sound.unloadAsync());
      },
    };
  }

  async preload(asset: SoundAsset): Promise<void> {
    const { sound } = await Audio.Sound.createAsync({ uri: asset.dataUri });
    await sound.unloadAsync();
  }
}
