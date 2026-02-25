import Image from "next/image";
import { Heart, ExternalLink } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroBars } from "@/components/hero-bars";
import { SPONSOR_URL } from "@/lib/constants";
import { SPONSORS, type Sponsor } from "@/lib/sponsors";

// ── Sponsor card ──────────────────────────────────────────────────────────────

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
	return (
		<a
			href={sponsor.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group relative flex flex-col items-center gap-4 rounded-xl border border-border/50 bg-card p-6 text-center transition-[border-color,box-shadow,transform] duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.08] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
		>
			{/* External link — appears on hover */}
			<ExternalLink className="absolute top-3 right-3 size-3 text-muted-foreground/0 transition-all duration-200 group-hover:text-primary/40" />

			{/* Avatar / Logo */}
			<div className="size-20 rounded-full overflow-hidden border border-border/50 bg-muted flex items-center justify-center shrink-0">
				{sponsor.logo ? (
					<Image
						src={sponsor.logo}
						alt={sponsor.name}
						width={80}
						height={80}
						className="size-full object-cover"
					/>
				) : (
					<span className="font-display text-2xl font-bold text-muted-foreground/40">
						{sponsor.name[0].toUpperCase()}
					</span>
				)}
			</div>

			{/* Name + tagline */}
			<div className="space-y-1">
				<p className="font-display text-sm font-bold text-foreground leading-snug">
					{sponsor.name}
				</p>
				{sponsor.tagline && (
					<p className="text-xs text-muted-foreground leading-relaxed">
						{sponsor.tagline}
					</p>
				)}
			</div>
		</a>
	);
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
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

// ── Page ──────────────────────────────────────────────────────────────────────

export function SponsorsPage() {
	const count = SPONSORS.length;

	return (
		<div className="flex min-h-svh flex-col">
			<Header />

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

					<div
						className="stagger-fade-up mt-7"
						style={{ animationDelay: "160ms" }}
					>
						<a
							href={SPONSOR_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/[0.14] hover:border-primary/50 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
						>
							<Heart className="size-3.5 fill-current" aria-hidden="true" />
							Become a sponsor
						</a>
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
					<EmptyState />
				) : (
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
						{SPONSORS.map((sponsor) => (
							<SponsorCard key={sponsor.name} sponsor={sponsor} />
						))}
					</div>
				)}
			</main>

			<Footer />
		</div>
	);
}
