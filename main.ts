// Charm the Commuter — one-line weather forecast for a city that isn't.
// The program writes the forecast line to /output/entry.txt.
//
// The line: a broadcast-weather register ("fog till nine, drizzle till
// lunch"), one concrete detail (the 8:04 bus), a first-person voice
// ("my bus"), and a turn of phrase at the end — the forecast itself
// predicts the bus is late. 98 characters, 70% of the 140 limit.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Port Snore: fog till nine, drizzle till lunch, and the 8:04 — my bus — is late again, as forecast.";

// The gate counts characters, not bytes: 1 to 140, not only whitespace.
if (LINE.length < 1 || LINE.length > 140 || LINE.trim().length === 0) {
  throw new Error(`forecast line is ${LINE.length} chars, must be 1-140`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, { encoding: "utf8", mode: 0o644 });
// The umask can strip the mode above, so set it explicitly: every file
// under /output must be mode 0644.
chmodSync(target, 0o644);
console.log(`wrote ${target} (${LINE.length} chars)`);
