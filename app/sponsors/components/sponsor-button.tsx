"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type SponsorButtonProps = {
	title?: string;
};

export const SponsorButton: React.FC<SponsorButtonProps> = ({
	title = "Sponsor",
}) => {
	return (
		<Button asChild size="sm">
			<Link href="/sponsors" aria-label="Sponsor soundcn">
				<Heart className="size-3 fill-current" aria-hidden="true" />
				{title}
			</Link>
		</Button>
	);
};
