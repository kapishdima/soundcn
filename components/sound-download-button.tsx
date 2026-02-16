import { Download } from "lucide-react";
import { useSoundDownload } from "@/hooks/use-sound-download";

export function SoundDownloadButton({ name }: { name: string }) {
	const download = useSoundDownload(name);

	return (
		<button
			type="button"
			onClick={download}
			className="text-muted-foreground hover:text-primary hover:bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none mt-1"
			aria-label="Download sound file"
		>
			<Download className="size-5" aria-hidden="true" />
		</button>
	);
}
