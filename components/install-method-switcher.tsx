"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInstallMethod } from "@/hooks/use-install-method";
import { trackEvent } from "@/lib/analytics";
import {
	INSTALL_METHOD_LABELS,
	INSTALL_METHODS,
	type InstallMethod,
} from "@/lib/install-method";

export function InstallMethodSwitcher() {
	const [method, setMethod] = useInstallMethod();

	return (
		<Tabs
			defaultValue="overview"
			value={method}
			onValueChange={(value) => {
				setMethod(value as InstallMethod);
			}}
		>
			<TabsList>
				{INSTALL_METHODS.map((method) => {
					return (
						<TabsTrigger
							key={method}
							onClick={() => {
								trackEvent("install_method_changed", { value: method });
							}}
							value={method}
						>
							{INSTALL_METHOD_LABELS[method]}
						</TabsTrigger>
					);
				})}
			</TabsList>
		</Tabs>
	);
}
