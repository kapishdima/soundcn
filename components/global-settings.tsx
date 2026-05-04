"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontalIcon } from "@/components/ui/sliders-horizontal";
import { Switch } from "@/components/ui/switch";
import { useAudioSettings } from "@/hooks/use-audio-settings";

export const GlobalSettings = () => {
	const { settings, setMute, setVolume } = useAudioSettings();
	const { muted, volume } = settings;

	return createPortal(
		<Dialog>
			<DialogTrigger asChild>
				<div className="fixed right-10 bottom-10">
					<Button size="icon-sm">
						<SlidersHorizontalIcon />
					</Button>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Audio settings</DialogTitle>
					<DialogDescription>
						Adjust your audio preferences for the application.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col">
					<Field
						orientation="horizontal"
						className="items-start py-4 first:pt-0"
					>
						<FieldContent>
							<FieldLabel htmlFor="mute-rows">Mute audio</FieldLabel>
							<p className="text-muted-foreground text-xs">
								Silence all sound effects across the app.
							</p>
						</FieldContent>
						<Switch id="mute-rows" checked={muted} onCheckedChange={setMute} />
					</Field>
					<Separator />
					<Field className="gap-3 py-4 last:pb-0">
						<div className="flex items-center justify-between">
							<FieldContent>
								<FieldLabel htmlFor="vol-rows">Master volume</FieldLabel>
								<p className="text-muted-foreground text-xs">
									Set playback volume for previews and effects.
								</p>
							</FieldContent>
							<span className="font-mono text-muted-foreground text-xs tabular-nums">
								{muted ? "—" : `${volume}%`}
							</span>
						</div>
						<Slider
							id="vol-rows"
							value={[volume]}
							onValueChange={([v]) => setVolume(v)}
							max={100}
							step={1}
							disabled={muted}
						/>
					</Field>
				</div>
			</DialogContent>
		</Dialog>,
		document.body,
	);
};
