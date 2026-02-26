import { Heart } from "lucide-react";
import { AppHero } from "@/components/app-hero";
import { EmptySponsors } from "@/components/empty-sponsors";
import { BecomeSponsorButton } from "@/components/sponsor-button";
import { SponsorCard } from "@/components/sponsor-card";
import { SponsorTicker } from "@/components/sponsor-ticket";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { SPONSORS } from "@/lib/sponsors";

export function SponsorsPage() {
	const count = SPONSORS.length;

	return (
		<>
			<AppHero
				eyebrow={
					<>
						<Heart className="size-3 fill-current" aria-hidden="true" />
						Sponsors
					</>
				}
				title={
					<>
						People who make
						<br />
						<span className="text-muted-foreground">this possible.</span>
					</>
				}
				description={
					<>
						soundcn is free and open source.{" "}
						<span className="text-foreground/60">
							{count > 0 ? (
								<>
									<span className="font-medium text-foreground">{count}</span>{" "}
									{count === 1 ? "person" : "people"} keeping it alive.
								</>
							) : (
								"Sponsors keep it maintained, growing, and free for everyone."
							)}
						</span>
					</>
				}
			>
				<div
					className="stagger-fade-up mt-8"
					style={{ animationDelay: "140ms" }}
				>
					<SponsorTicker />

					<div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
						<BecomeSponsorButton />
						<span className="text-xs text-muted-foreground/60">
							Questions?{" "}
							<a
								href={`mailto:${SUPPORT_EMAIL}`}
								className="text-muted-foreground hover:text-foreground transition-colors duration-150 underline underline-offset-2"
							>
								{SUPPORT_EMAIL}
							</a>
						</span>
					</div>
				</div>
			</AppHero>

			<main
				id="main-content"
				className="stagger-fade-up mx-auto w-full max-w-6xl flex-1 px-6 py-10"
				style={{ animationDelay: "200ms" }}
			>
				{count === 0 ? (
					<EmptySponsors />
				) : (
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
						{SPONSORS.map((sponsor) => (
							<SponsorCard key={sponsor.name} sponsor={sponsor} />
						))}
					</div>
				)}
			</main>
		</>
	);
}
