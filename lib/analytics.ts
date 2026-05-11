"use client";

import { useOpenPanel } from "@openpanel/nextjs";
import { useCallback } from "react";

type AnalyticsEvents = {
	sound_install_copied: {
		soundName: string;
		packageManager: string;
		installMethod: string;
	};
	batch_install_copied: { count: number; packageManager: string };
	sound_downloaded: { soundName: string };
	category_install_copied: { category: string; count: number };
	sound_previewed: { soundName: string };
	sound_detail_opened: { soundName: string };
	search_used: { query: string };
	category_filtered: { category: string };
	batch_selection_changed: { action: "add" | "remove"; count: number };
	package_manager_changed: { value: string };
	install_method_changed: { value: string };
	theme_toggled: { theme: string };
	collection_viewed: { collectionName: string };
};

export function useTrackEvent() {
	const op = useOpenPanel();

	return useCallback(
		<E extends keyof AnalyticsEvents>(
			event: E,
			...args: AnalyticsEvents[E] extends Record<string, never>
				? []
				: [AnalyticsEvents[E]]
		) => {
			op.track(event, args[0] as Record<string, unknown> | undefined);
		},
		[op],
	);
}
