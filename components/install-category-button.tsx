import { Package } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { usePackageManager } from "@/hooks/use-package-manager";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { buildInstallCommand } from "@/lib/sound-install";

export function InstallAllInCategoryButton({
	sounds,
}: {
	sounds: SoundCatalogItem[];
}) {
	const [pm] = usePackageManager();

	return (
		<CopyButton
			value={buildInstallCommand(
				sounds.map((s) => s.name),
				pm,
			)}
		>
			<Package className="size-3.5" />
			<span className="hidden sm:inline">Install all</span>
			<span className="sm:hidden">All</span>
		</CopyButton>
	);
}
