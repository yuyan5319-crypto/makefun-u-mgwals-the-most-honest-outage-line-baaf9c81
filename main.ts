// The Most Honest Outage Line — one status page line, written by the agent
// itself while every server is down. Plain, first person, specific about
// what is down, and honest about what it cannot check or does not yet know.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "All our servers are down, and I can't reach any of them to check what broke — I don't know why yet, or when they'll be back.";

// The gate requires 1-160 characters and more than whitespace; refuse to
// write anything that would fail it, instead of silently shipping a bad line.
const chars = [...LINE].length;
if (chars < 1 || chars > 160 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-160 non-whitespace characters, got ${chars}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
