"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import type { Sponsor } from "@/lib/sponsors";
import { isSvgSource } from "@/lib/sponsors";

export function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
	return (
		<a
			href={sponsor.url}
			target="_blank"
			rel="noopener noreferrer"
			onClick={() => trackEvent("sponsor_link_clicked")}
		>
			<Card>
				<CardContent>
					<Avatar>
						{sponsor.logo && isSvgSource(sponsor.logo) ? (
							<div
								className="size-full flex items-center justify-center p-2 [&>svg]:size-full [&>svg]:max-w-full [&>svg]:max-h-full"
								// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted sponsor SVG source
								dangerouslySetInnerHTML={{ __html: sponsor.logo }}
							/>
						) : (
							<AvatarImage src={sponsor.logo} alt={sponsor.name} />
						)}
					</Avatar>
					<CardTitle>{sponsor.name}</CardTitle>
				</CardContent>
			</Card>
		</a>
	);
}
