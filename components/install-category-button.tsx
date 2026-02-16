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
		/>
	);
}
