import Link from "next/link";
import { EqLogo } from "@/components/logo";

export const AppLogo = () => {
	return (
		<Link href="/" className="flex items-center gap-2.5">
			<EqLogo />
			<span className="font-display text-lg font-bold">soundcn</span>
		</Link>
	);
};
