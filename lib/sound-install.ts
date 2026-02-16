import { getInstallPrefix, type PackageManager } from "@/lib/package-manager";
import type { InstallMethod } from "@/lib/install-method";

export function buildInstallCommand(
	soundNames: string[],
	pm: PackageManager,
	method: InstallMethod = "shadcn",
): string {
	if (soundNames.length === 0) return "";
	if (method === "manual") return "";

	const framework = method === "shadcn-vue" ? "vue" : "react";
	const names = soundNames.map((name) =>
		method === "shadcn-vue"
			? `https://soundcn.xyz/r/${name}.json`
			: `@soundcn/${name}`,
	);
	return `${getInstallPrefix(pm, framework)} add ${names.join(" ")}`;
}
