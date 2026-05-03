import Link from "next/link";
import { EqLogo } from "@/components/logo";

export const AppLogo = () => {
	return (
		<Link href="/" className="flex items-baseline gap-x-2.5">
			<EqLogo />
			<span className="font-heading text-lg font-bold">soundcn</span>
		</Link>
	);
};
