import { Heart } from "lucide-react";
import { SPONSOR_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const SponsorButton = () => {
	return (
		<a
			href={SPONSOR_URL}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				"inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
				"border border-primary/30 bg-primary/[0.08] text-primary",
				"hover:bg-primary/[0.14] hover:border-primary/50 transition-all duration-150",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
			)}
			aria-label="Sponsor soundcn"
		>
			<Heart className="size-3 fill-current" aria-hidden="true" />
			Sponsor
		</a>
	);
};

export const BecomeSponsorButton = () => {
	return (
		<a
			href={SPONSOR_URL}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/[0.14] hover:border-primary/50 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
		>
			<Heart className="size-3.5 fill-current" aria-hidden="true" />
			Become a sponsor
		</a>
	);
};
