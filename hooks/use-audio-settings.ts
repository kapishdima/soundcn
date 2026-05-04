import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type AudioSettings = {
    muted: boolean;
    volume: number;
};

const STORAGE_KEY = "@soundcn/audioSettings";
const PERSIST_DELAY_MS = 250;

const debouncedStorage = {
    getItem: (key: string, initialValue: AudioSettings): AudioSettings => {
        if (typeof window === "undefined") return initialValue;
        try {
            const raw = window.localStorage.getItem(key);
            return raw ? (JSON.parse(raw) as AudioSettings) : initialValue;
        } catch {
            return initialValue;
        }
    },
    setItem: (() => {
        let timeout: ReturnType<typeof setTimeout> | undefined;
        let pending: { key: string; value: AudioSettings } | null = null;
        const flush = () => {
            if (!pending) return;
            try {
                window.localStorage.setItem(
                    pending.key,
                    JSON.stringify(pending.value),
                );
            } catch {}
            pending = null;
        };
        if (typeof window !== "undefined") {
            window.addEventListener("pagehide", flush);
        }
        return (key: string, value: AudioSettings) => {
            if (typeof window === "undefined") return;
            pending = { key, value };
            clearTimeout(timeout);
            timeout = setTimeout(flush, PERSIST_DELAY_MS);
        };
    })(),
    removeItem: (key: string) => {
        if (typeof window === "undefined") return;
        window.localStorage.removeItem(key);
    },
};

export const audioSettingsAtom = atomWithStorage<AudioSettings>(
    STORAGE_KEY,
    { muted: false, volume: 1 },
    debouncedStorage,
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
