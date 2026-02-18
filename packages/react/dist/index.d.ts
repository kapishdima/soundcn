import { SoundAsset, UseSoundOptions, UseSoundReturn } from '@soundcn/engine';
export { PlayFunction, SoundAsset, SoundControls, UseSoundOptions, UseSoundReturn } from '@soundcn/engine';

declare function useSound(sound: SoundAsset, options?: UseSoundOptions): UseSoundReturn;

export { useSound };
