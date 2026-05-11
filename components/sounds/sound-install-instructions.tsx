"use client";

import { useEffect, useMemo, useState } from "react";
import {
	CodeBlockCommand,
	convertNpmCommand,
} from "@/components/code-block-command/code-block-command";
import { CopyButton } from "@/components/copy-button/copy-button";
import { InstallMethodSwitcher } from "@/components/install-method-switcher";

import { SoundCopyBlock } from "@/components/sounds/sound-copy-block";
import { useInstallMethod } from "@/hooks/use-install-method";
import { usePackageManager } from "@/hooks/use-package-manager";
import { useTrackEvent } from "@/lib/analytics";
import { getSoundSnippets, type SetupStep } from "@/lib/sound-snippets";

interface SoundInstallInstructionsProps {
	soundName: string;
}

function useSoundFileContent(soundName: string, enabled: boolean) {
	const [content, setContent] = useState<string | null>(null);

	useEffect(() => {
		if (!enabled) {
			setContent(null);
			return;
		}

		let cancelled = false;

		fetch(`/r/${soundName}.json`)
			.then((res) => res.json())
			.then((data) => {
				if (cancelled) return;
				const soundFile = data.files?.find((f: { path: string }) =>
					f.path.includes(`/sounds/${soundName}/`),
				);
				if (soundFile?.content) {
					setContent(soundFile.content);
				}
			})
			.catch(() => {
				// Silently fail
			});

		return () => {
			cancelled = true;
		};
	}, [soundName, enabled]);

	return content;
}

function ManualStepBlock({ step }: { step: SetupStep }) {
	if (!step.code) {
		return (
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground text-[11px] font-semibold uppercase">
						{step.label}
					</span>
				</div>
				<div className="rounded-lg border border-border/40 bg-secondary/30 p-3">
					<span className="text-xs text-muted-foreground/70">
						Loading\u2026
					</span>
				</div>
			</div>
		);
	}

	return <SoundCopyBlock label={step.label} text={step.code} />;
}

export function SoundInstallInstructions({
	soundName,
}: SoundInstallInstructionsProps) {
	const [method] = useInstallMethod();
	const [pm] = usePackageManager();
	const trackEvent = useTrackEvent();

	const snippets = useMemo(
		() => getSoundSnippets(soundName, pm, method),
		[soundName, pm, method],
	);

	const isManual = method === "manual";
	const soundFileContent = useSoundFileContent(soundName, isManual);

	// Merge fetched sound file content into steps
	const resolvedSteps = useMemo(() => {
		if (!snippets.setupSteps) return null;
		return snippets.setupSteps.map((step) =>
			step.code === "" && soundFileContent
				? { ...step, code: soundFileContent }
				: step,
		);
	}, [snippets.setupSteps, soundFileContent]);

	return (
		<div className="flex flex-col gap-5">
			{/* Method selector */}
			<div className="flex items-center justify-between">
				<InstallMethodSwitcher />
			</div>

			{/* Install command (CLI methods only) */}
			{snippets.installCmd !== null ? (
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground text-[11px] font-semibold uppercase tracking-wide">
							Command
						</span>
						<CopyButton
							value={snippets.installCmd}
							size="icon-sm"
							text="Copied!"
							onCopy={() =>
								trackEvent("sound_install_copied", {
									soundName,
									packageManager: pm,
									installMethod: method,
								})
							}
						/>
					</div>
					<CodeBlockCommand
						classNames="rounded-none"
						prompt={`Add the @soundcn/${soundName} component to my project`}
						{...convertNpmCommand(`npx shadcn add @soundcn/${soundName}`)}
					/>
				</div>
			) : null}

			{/* Manual setup steps with full source code */}
			{resolvedSteps !== null ? (
				<div className="flex flex-col gap-4">
					{resolvedSteps.map((step) => (
						<ManualStepBlock key={step.label} step={step} />
					))}
				</div>
			) : null}

			{/* Usage code */}
			<SoundCopyBlock label="Usage" text={snippets.usageCode} />
		</div>
	);
}
