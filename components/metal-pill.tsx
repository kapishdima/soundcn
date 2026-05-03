import { Badge } from "@/components/ui/badge";

export function MetaPill({
	icon: Icon,
	children,
}: {
	icon: React.ComponentType<{ className?: string }>;
	children: React.ReactNode;
}) {
	return (
		<Badge variant="outline">
			<Icon className="size-3.5 shrink-0" aria-hidden="true" />
			{children}
		</Badge>
	);
}
