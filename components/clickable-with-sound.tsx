"use client";

import { Slot } from "@radix-ui/react-slot";
import type { ReactNode } from "react";
import { useSound } from "@/hooks/use-sound";
import { chipLay1Sound } from "@/registry/soundcn/sounds/chip-lay-1/chip-lay-1";

export function ClickableWithSound({
  children,
  volume = 0.5,
}: {
  children: ReactNode;
  volume?: number;
}) {
  const [play] = useSound(chipLay1Sound, { volume, interrupt: true });

  return <Slot onClick={() => play()}>{children}</Slot>;
}
