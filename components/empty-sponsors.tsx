import { Heart } from "lucide-react";
import { SPONSOR_URL } from "@/lib/constants";

export function EmptySponsors() {
	return (
		<div className="flex flex-col items-center gap-6 py-16 text-center">
			<div className="flex size-14 items-center justify-center rounded-full border border-primary/20 bg-primary/[0.06]">
				<Heart className="size-6 text-primary/60" />
			</div>
			<div className="space-y-2">
				<p className="font-display text-lg font-semibold">No sponsors yet.</p>
				<p className="text-sm text-muted-foreground max-w-sm text-pretty">
					Be the first to support soundcn. Your name and link will appear right
					here.
				</p>
			</div>
			<a
				href={SPONSOR_URL}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/[0.14] hover:border-primary/50 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
			>
				<Heart className="size-3.5 fill-current" />
				Become the first sponsor
			</a>
		</div>
	);
}
