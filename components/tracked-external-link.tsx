"use client";

import { trackEvent } from "@/lib/analytics";

interface TrackedExternalLinkProps {
	href: string;
	label: string;
	className?: string;
	children: React.ReactNode;
}

export function TrackedExternalLink({
	href,
	label,
	className,
	children,
}: TrackedExternalLinkProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			onClick={() => trackEvent("external_link_clicked", { url: href, label })}
			className={className}
		>
			{children}
		</a>
	);
}
