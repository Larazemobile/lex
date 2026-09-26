import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "www");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(join(root, "index.html"), join(output, "index.html"));
await cp(join(root, "privacy.html"), join(output, "privacy.html"));
await cp(join(root, "favicon-32.png"), join(output, "favicon-32.png"));
await cp(join(root, "apple-touch-icon.png"), join(output, "apple-touch-icon.png"));

console.log("Lex web assets copied to www/");
