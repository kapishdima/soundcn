import { Package } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { useInstallMethod } from "@/hooks/use-install-method";
import { usePackageManager } from "@/hooks/use-package-manager";
import type { SoundCatalogItem } from "@soundcn/sounds/catalog";
import { buildInstallCommand } from "@/lib/sound-install";

export function InstallAllInCategoryButton({
	sounds,
}: {
	sounds: SoundCatalogItem[];
}) {
	const [pm] = usePackageManager();
	const [method] = useInstallMethod();

	const cmd = buildInstallCommand(
		sounds.map((s) => s.name),
		pm,
		method,
	);

	if (!cmd) return null;

	return (
		<CopyButton value={cmd}>
			<Package className="size-3.5" />
			<span className="hidden sm:inline">Install all</span>
			<span className="sm:hidden">All</span>
		</CopyButton>
	);
}
