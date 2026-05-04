import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSoundDownload } from "@/hooks/use-sound-download";

export function SoundDownloadButton({ name }: { name: string }) {
	const download = useSoundDownload(name);

	return (
		<Button
			onClick={download}
			aria-label="Download sound file"
			size="icon-sm"
			variant="outline"
		>
			<Download aria-hidden="true" />
		</Button>
	);
}
