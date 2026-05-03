import type React from "react";
import type { PropsWithChildren } from "react";

type CodeBlockProps = {
	dataPm?: string;
	hasCommandPrefix?: boolean;
};

export const CodeBlock: React.FC<PropsWithChildren<CodeBlockProps>> = ({
	dataPm,
	hasCommandPrefix = true,
	children,
}) => {
	return (
		<pre
			data-pm={dataPm}
			className="group/tabs-content-pre overscroll-x-contain p-4 leading-6 not-data-[pm=prompt]:overflow-x-auto"
		>
			<code
				data-slot="code-block"
				data-language="bash"
				className="font-mono text-sm/none text-muted-foreground group-data-[pm=prompt]/tabs-content-pre:whitespace-normal"
			>
				{hasCommandPrefix && (
					<span className="select-none group-data-[pm=prompt]/tabs-content-pre:hidden">
						${" "}
					</span>
				)}
				{children}
			</code>
		</pre>
	);
};
