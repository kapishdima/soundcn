import { track } from "@vercel/analytics";

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
	sponsor_link_clicked: Record<string, never>;
	external_link_clicked: { url: string; label: string };
};

export function trackEvent<E extends keyof AnalyticsEvents>(
	event: E,
	...args: AnalyticsEvents[E] extends Record<string, never>
		? []
		: [AnalyticsEvents[E]]
) {
	track(event, args[0] as Record<string, string | number | boolean>);
}
