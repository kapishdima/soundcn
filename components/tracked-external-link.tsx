"use client";

interface TrackedExternalLinkProps {
	href: string;
	className?: string;
	children: React.ReactNode;
}

export function TrackedExternalLink({
	href,
	className,
	children,
}: TrackedExternalLinkProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={className}
		>
			{children}
		</a>
	);
}
