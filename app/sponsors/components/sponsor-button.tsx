"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { SPONSOR_URL } from "@/lib/constants";

type SponsorButtonProps = {
	title?: string;
};

export const SponsorButton: React.FC<SponsorButtonProps> = ({
	title = "Sponsor",
}) => {
	return (
		<Button asChild size="sm">
			<a
				href={SPONSOR_URL}
				target="_blank"
				rel="noopener noreferrer"
				onClick={() => trackEvent("sponsor_link_clicked")}
				aria-label="Sponsor soundcn"
			>
				<Heart className="size-3 fill-current" aria-hidden="true" />
				{title}
			</a>
		</Button>
	);
};
