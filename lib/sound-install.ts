import { getInstallPrefix, type PackageManager } from "@/lib/package-manager";

export function buildInstallCommand(
	soundNames: string[],
	pm: PackageManager,
): string {
	if (soundNames.length === 0) return "";
	const names = soundNames.map((name) => `@soundcn/${name}`);
	return `${getInstallPrefix(pm)} add ${names.join(" ")}`;
}
