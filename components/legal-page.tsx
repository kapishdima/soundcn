import Link from "next/link";
import { PRIVACY_SECTIONS, type Section, TERMS_SECTIONS } from "@/lib/legal";

function LegalSection({ section }: { section: Section }) {
	return (
		<div id={section.id} className="scroll-mt-8">
			<h3 className="font-display text-base font-semibold text-foreground mb-3">
				{section.title}
			</h3>
			<div className="text-sm text-muted-foreground leading-relaxed space-y-3 [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primary [&_ul]:mt-2 [&_ul]:space-y-2 [&_ul]:pl-4 [&_ul]:list-disc">
				{section.content}
			</div>
		</div>
	);
}

function TableOfContents({
	label,
	sections,
}: {
	label: string;
	sections: Section[];
}) {
	return (
		<nav aria-label={label}>
			<p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/50 mb-3">
				{label}
			</p>
			<ul className="space-y-1.5">
				{sections.map((s) => (
					<li key={s.id}>
						<a
							href={`#${s.id}`}
							className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
						>
							{s.title}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}

export function LegalPage() {
	const lastUpdated = "February 2026";

	return (
		<main
			id="main-content"
			className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 sm:py-16"
		>
			{/* Page header */}
			<div className="mb-12">
				<div className="flex items-center gap-2 text-xs text-muted-foreground/50 mb-4">
					<Link href="/" className="hover:text-foreground transition-colors">
						soundcn
					</Link>
					<span>/</span>
					<span>Legal</span>
				</div>
				<h1 className="font-display text-3xl font-bold sm:text-4xl mb-3">
					Privacy &amp; Terms
				</h1>
				<p className="text-muted-foreground text-sm">
					Last updated: {lastUpdated}
				</p>
			</div>

			<div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
				{/* Sidebar TOC */}
				<aside className="hidden lg:block">
					<div className="sticky top-8 space-y-8">
						<TableOfContents
							label="Privacy Policy"
							sections={PRIVACY_SECTIONS}
						/>
						<TableOfContents
							label="Terms of Service"
							sections={TERMS_SECTIONS}
						/>
					</div>
				</aside>

				{/* Content */}
				<div className="min-w-0 space-y-16">
					{/* Privacy Policy */}
					<section>
						<h2 className="font-display text-xl font-bold mb-8 pb-4 border-b border-border/60">
							Privacy Policy
						</h2>
						<div className="space-y-8">
							{PRIVACY_SECTIONS.map((s) => (
								<LegalSection key={s.id} section={s} />
							))}
						</div>
					</section>

					{/* Terms of Service */}
					<section>
						<h2 className="font-display text-xl font-bold mb-8 pb-4 border-b border-border/60">
							Terms of Service
						</h2>
						<div className="space-y-8">
							{TERMS_SECTIONS.map((s) => (
								<LegalSection key={s.id} section={s} />
							))}
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}
