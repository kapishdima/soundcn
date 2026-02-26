import { Github } from "lucide-react";
import { GITHUB_URL } from "@/lib/constants";

export const GithubButton = () => {
	return (
		<a
			href={GITHUB_URL}
			target="_blank"
			rel="noopener noreferrer"
			className="text-muted-foreground hover:text-foreground transition-colors"
			aria-label="View soundcn on GitHub"
		>
			<Github className="size-5" aria-hidden="true" />
		</a>
	);
};
