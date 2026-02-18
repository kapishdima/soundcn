import { defineConfig } from "tsup";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const soundFiles = readdirSync(join(__dirname, "src/sounds")).filter(
  (f) => f.endsWith(".ts") && f !== "index.ts",
);

const soundEntries = Object.fromEntries(
  soundFiles.map((f) => [
    `sounds/${f.replace(".ts", "")}`,
    `src/sounds/${f}`,
  ]),
);

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "index.native": "src/index.native.ts",
    "sounds/index": "src/sounds/index.ts",
    catalog: "src/catalog.ts",
    ...soundEntries,
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: false,
  treeshake: true,
  noExternal: ["@soundcn/engine"],
  external: ["expo-av", "react", "react-native"],
});
