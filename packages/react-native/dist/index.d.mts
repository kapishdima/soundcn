import { SoundAsset, UseSoundOptions, UseSoundReturn, SoundEngine, PlaySoundOptions, SoundPlayback } from '@soundcn/engine';
export { PlayFunction, SoundAsset, SoundControls, UseSoundOptions, UseSoundReturn } from '@soundcn/engine';

declare function useSound(sound: SoundAsset, options?: UseSoundOptions): UseSoundReturn;

declare class ExpoAudioEngine implements SoundEngine {
    play(asset: SoundAsset, options?: PlaySoundOptions): Promise<SoundPlayback>;
    preload(asset: SoundAsset): Promise<void>;
}

export { ExpoAudioEngine, useSound };
