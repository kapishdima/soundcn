import { Heart } from "lucide-react";
import { EmptySponsors } from "@/components/empty-sponsors";
import { HeroBars } from "@/components/hero-bars";
import { BecomeSponsorButton } from "@/components/sponsor-button";
import { SponsorCard } from "@/components/sponsor-card";
import { SponsorTicker } from "@/components/sponsor-ticket";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { SPONSORS } from "@/lib/sponsors";

export function SponsorsPage() {
	const count = SPONSORS.length;

	return (
		<>
			{/* ── Hero ── */}
			<section className="relative overflow-hidden px-6 pt-8 pb-14 sm:pt-14 sm:pb-20">
				<HeroBars />

				<div
					className="pointer-events-none absolute -top-48 -left-32 size-[400px] rounded-full bg-primary opacity-[0.07] dark:opacity-[0.12] blur-2xl"
					aria-hidden="true"
				/>
				<div
					className="pointer-events-none absolute -bottom-20 -right-12 size-[280px] rounded-full bg-primary opacity-[0.04] dark:opacity-[0.08] blur-3xl"
					aria-hidden="true"
				/>

				<div className="relative mx-auto max-w-6xl">
					<div
						className="stagger-fade-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-xs font-medium text-primary mb-6"
						style={{ animationDelay: "30ms" }}
					>
						<Heart className="size-3 fill-current" aria-hidden="true" />
						Sponsors
					</div>

					<h1
						className="stagger-fade-up font-display text-4xl font-bold text-balance sm:text-5xl lg:text-6xl"
						style={{ animationDelay: "60ms" }}
					>
						People who make
						<br />
						<span className="text-muted-foreground">this possible.</span>
					</h1>

					<p
						className="stagger-fade-up text-muted-foreground mt-5 max-w-lg text-base text-pretty leading-relaxed sm:text-lg"
						style={{ animationDelay: "110ms" }}
					>
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
					</p>

					{/* ── Pricing ticket ── */}
					<div
						className="stagger-fade-up mt-8"
						style={{ animationDelay: "140ms" }}
					>
						<SponsorTicker />

						{/* CTA row */}
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
				</div>
			</section>

			{/* ── Sponsors grid ── */}
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
