import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type AudioSettings = {
    muted: boolean;
    volume: number;
};

const audioSettingsAtom = atomWithStorage<AudioSettings>(
    "@soundcn/audioSettings",
    { muted: false, volume: 1 },
);

export const useAudioSettings = () => {
    const [settings, setSettings] = useAtom(audioSettingsAtom);

    const setMute = (muted: boolean) => {
        setSettings((prev) => ({ ...prev, muted }));
    }

    const setVolume = (volume: number) => {
        setSettings((prev) => ({ ...prev, volume }));
    }

    return {
        settings,
        setMute,
        setVolume,
    };
}
