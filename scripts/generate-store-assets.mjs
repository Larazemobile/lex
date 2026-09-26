import { mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "play-store", "assets");
await mkdir(output, { recursive: true });

const icon = await readFile(join(root, "assets", "icon-only.svg"));
await sharp(icon).resize(512, 512).png({ compressionLevel: 9 }).toFile(join(output, "app-icon-512.png"));

const featureGraphic = `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500" viewBox="0 0 1024 500">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9b7de8"/><stop offset="0.55" stop-color="#c8a7f3"/><stop offset="1" stop-color="#f3b6d3"/></linearGradient>
    <radialGradient id="globe" cx="35%" cy="28%" r="76%"><stop offset="0" stop-color="#eadcff"/><stop offset="0.45" stop-color="#9b6fea"/><stop offset="1" stop-color="#5b35b5"/></radialGradient>
    <filter id="shadow" x="-30%" y="-30%" width="170%" height="180%"><feDropShadow dx="0" dy="16" stdDeviation="12" flood-color="#252844" flood-opacity=".22"/></filter>
  </defs>
  <rect width="1024" height="500" fill="url(#bg)"/><circle cx="100" cy="76" r="58" fill="#fff" opacity=".13"/><circle cx="913" cy="90" r="38" fill="#ffd6e8" opacity=".52"/>
  <g transform="translate(236 246)" filter="url(#shadow)">
    <circle r="160" fill="url(#globe)" stroke="#252844" stroke-width="18"/>
    <path d="M-92-62c36-30 75-20 91 7 13 24-9 46-40 49-38 4-72-19-51-56Z" fill="#ff91bd" stroke="#d95892" stroke-width="8"/>
    <path d="M30 20c54-9 87 16 83 56-3 37-42 65-81 42-33-19-40-80-2-98Z" fill="#ff91bd" stroke="#d95892" stroke-width="8"/>
    <path d="M-105 59c28-11 54 3 59 31 4 26-26 39-54 26-23-12-29-47-5-57Z" fill="#ff91bd" stroke="#d95892" stroke-width="8"/>
    <ellipse cx="-57" cy="-84" rx="63" ry="34" fill="#fff" opacity=".34" transform="rotate(-22 -57 -84)"/>
    <path d="M108-118 116-98 136-90 116-82 108-62 100-82 80-90 100-98Z" fill="#fff"/>
  </g>
  <g transform="translate(465 32)">
    <text x="0" y="218" font-family="Arial Rounded MT Bold,Arial,sans-serif" font-weight="900" font-size="112" fill="#252844">Le<tspan fill="#ffcf3f">x</tspan></text>
    <text x="4" y="282" font-family="Arial,sans-serif" font-weight="700" font-size="34" fill="#493879">Leer, comprender y escribir</text>
    <text x="4" y="333" font-family="Arial,sans-serif" font-weight="700" font-size="25" fill="#5d527f">Con pistas y repaso de errores</text>
  </g>
</svg>`;

await sharp(Buffer.from(featureGraphic)).flatten({ background: "#c8a7f3" }).png({ compressionLevel: 9 }).toFile(join(output, "feature-graphic-1024x500.png"));
console.log("Google Play icon and feature graphic generated");
