import Link from "next/link";
import { EqLogo } from "@/components/logo";

export const AppLogo = () => {
	return (
		<Link href="/" className="flex items-end gap-x-3">
			<EqLogo />
			<span className=" font-heading text-lg font-bold leading-4 mb-0.5">
				soundcn
			</span>
		</Link>
	);
};
