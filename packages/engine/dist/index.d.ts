interface SoundAsset {
    /** Unique identifier for the sound */
    name: string;
    /** Base64-encoded data URI (data:audio/mpeg;base64,...) */
    dataUri: string;
    /** Duration in seconds */
    duration: number;
    /** Audio format */
    format: "mp3" | "wav" | "ogg";
    /** License identifier */
    license: "CC0" | "OGA-BY" | "MIT";
    /** Original author/creator */
    author: string;
}
interface UseSoundOptions {
    /** Volume level from 0 to 1. Default: 1 */
    volume?: number;
    /** Playback speed multiplier. Default: 1 */
    playbackRate?: number;
    /** If true, calling play() stops current playback first. Default: false */
    interrupt?: boolean;
    /** If false, play() does nothing. Useful for user preferences. Default: true */
    soundEnabled?: boolean;
    /** Called when playback starts */
    onPlay?: () => void;
    /** Called when playback ends naturally */
    onEnd?: () => void;
    /** Called when pause() is called */
    onPause?: () => void;
    /** Called when stop() is called */
    onStop?: () => void;
}
type PlayFunction = (overrides?: {
    volume?: number;
    playbackRate?: number;
}) => void;
interface SoundControls {
    stop: () => void;
    pause: () => void;
    isPlaying: boolean;
    duration: number | null;
    sound: SoundAsset;
}
type UseSoundReturn = readonly [PlayFunction, SoundControls];
interface PlaySoundOptions {
    volume?: number;
    playbackRate?: number;
    onEnd?: () => void;
}
interface SoundPlayback {
    stop: () => void;
}
interface SoundEngine {
    play(asset: SoundAsset, options?: PlaySoundOptions): Promise<SoundPlayback>;
    preload?(asset: SoundAsset): Promise<void>;
}

declare function getAudioContext(): AudioContext;
declare function decodeAudioData(dataUri: string): Promise<AudioBuffer>;
declare function playSound(dataUri: string, options?: PlaySoundOptions): Promise<SoundPlayback>;
declare class WebAudioEngine implements SoundEngine {
    play(asset: SoundAsset, options?: PlaySoundOptions): Promise<SoundPlayback>;
    preload(asset: SoundAsset): Promise<void>;
}

export { type PlayFunction, type PlaySoundOptions, type SoundAsset, type SoundControls, type SoundEngine, type SoundPlayback, type UseSoundOptions, type UseSoundReturn, WebAudioEngine, decodeAudioData, getAudioContext, playSound };
