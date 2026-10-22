import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  // Modern, high-resolution SVG canvas for OpenGraph and Twitter cards (1200x630)
  const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#181715" />
      <stop offset="50%" stop-color="#141312" />
      <stop offset="100%" stop-color="#0E0D0C" />
    </linearGradient>

    <!-- Subtle Radial Glow behind emblem -->
    <radialGradient id="glow" cx="240" cy="315" r="320" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.16" />
      <stop offset="60%" stop-color="#10B981" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#141312" stop-opacity="0" />
    </radialGradient>

    <!-- Gold Gradients for Eggs & Nest -->
    <linearGradient id="gold1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFDF5" />
      <stop offset="45%" stop-color="#FDE047" />
      <stop offset="85%" stop-color="#EAB308" />
      <stop offset="100%" stop-color="#CA8A04" />
    </linearGradient>

    <linearGradient id="gold2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="50%" stop-color="#EAB308" />
      <stop offset="100%" stop-color="#A16207" />
    </linearGradient>

    <linearGradient id="emeraldLeaf" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#86EFAC" />
      <stop offset="60%" stop-color="#22C55E" />
      <stop offset="100%" stop-color="#15803D" />
    </linearGradient>

    <linearGradient id="nestRim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#854D0E" />
      <stop offset="35%" stop-color="#CA8A04" />
      <stop offset="70%" stop-color="#FACC15" />
      <stop offset="100%" stop-color="#A16207" />
    </linearGradient>
  </defs>

  <!-- Canvas Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <circle cx="240" cy="315" r="320" fill="url(#glow)" />

  <!-- Outer Border -->
  <rect x="24" y="24" width="1152" height="582" rx="24" fill="none" stroke="#2E2C28" stroke-width="2" />

  <!-- LEFT SIDE: Emblem Container (centered around x=240, y=315) -->
  <g transform="translate(100, 175) scale(0.55)">
    <!-- Shadow beneath nest -->
    <ellipse cx="256" cy="410" rx="190" ry="32" fill="#000000" opacity="0.6" />

    <!-- Fresh Growth Sprout Shoot -->
    <path d="M 270 240 C 278 170, 310 125, 360 85 C 330 140, 305 195, 275 250 Z" fill="url(#emeraldLeaf)" />
    <path d="M 272 170 C 240 140, 205 130, 170 125 C 205 160, 235 180, 268 200 Z" fill="url(#emeraldLeaf)" />

    <!-- Left Golden Egg with Bar Chart Glyphs -->
    <g transform="translate(140, 160) rotate(-14, 60, 85)">
      <ellipse cx="60" cy="85" rx="56" ry="78" fill="url(#gold1)" stroke="#B45309" stroke-width="3" />
      <rect x="32" y="96" width="12" height="28" rx="4" fill="#78350F" />
      <rect x="52" y="80" width="12" height="44" rx="4" fill="#78350F" />
      <rect x="72" y="62" width="12" height="62" rx="4" fill="#78350F" />
    </g>

    <!-- Right Golden Egg with Rising Trendline Arrow -->
    <g transform="translate(250, 160) rotate(14, 60, 85)">
      <ellipse cx="60" cy="85" rx="56" ry="78" fill="url(#gold2)" stroke="#B45309" stroke-width="3" />
      <path d="M 30 115 Q 55 90 70 85 T 90 62" fill="none" stroke="#78350F" stroke-width="6" stroke-linecap="round" />
      <polygon points="90,52 94,68 80,64" fill="#78350F" />
    </g>

    <!-- Center Nest Bowl -->
    <path d="M 64 260 C 90 395, 422 395, 448 260 C 375 290, 137 290, 64 260 Z" fill="#241E17" stroke="url(#nestRim)" stroke-width="6" />
    <!-- Golden Woven Twig Strands -->
    <path d="M 90 280 Q 256 360 422 280" fill="none" stroke="url(#nestRim)" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 120 305 Q 256 375 392 305" fill="none" stroke="#EAB308" stroke-width="3.5" stroke-linecap="round" opacity="0.9" />
    <path d="M 155 330 Q 256 385 357 330" fill="none" stroke="#CA8A04" stroke-width="3" stroke-linecap="round" opacity="0.8" />
  </g>

  <!-- RIGHT SIDE: Typography & Key Value Props -->
  <g transform="translate(430, 120)">
    <!-- Pill Badge: Data & Tools Standard -->
    <rect x="0" y="0" width="410" height="34" rx="17" fill="#1E2922" stroke="#059669" stroke-width="1.5" />
    <circle cx="18" cy="17" r="4.5" fill="#34D399" />
    <text x="32" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#A7F3D0" letter-spacing="1">
      OFFICIAL AMC FACTSHEET DATA · CONFLICT-FREE
    </text>

    <!-- Main Title -->
    <text x="0" y="90" font-family="'Times New Roman', Georgia, serif" font-size="56" font-weight="bold" fill="#FFFDF5" letter-spacing="-1">
      YieldNest.online
    </text>

    <!-- Tagline -->
    <text x="0" y="145" font-family="'Times New Roman', Georgia, serif" font-size="34" font-weight="600" fill="#FACC15">
      Mutual Fund Data &amp; Tools
    </text>

    <!-- Description -->
    <text x="0" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#D6D3D1">
      Factual scheme comparisons, compounding calculators, and
    </text>
    <text x="0" y="228" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#D6D3D1">
      canonical evergreen educational guides for Indian investors.
    </text>

    <!-- Three Value Cards at Bottom -->
    <g transform="translate(0, 270)">
      <!-- Card 1 -->
      <rect x="0" y="0" width="220" height="70" rx="12" fill="#1C1A17" stroke="#33302B" stroke-width="1" />
      <text x="16" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#34D399" letter-spacing="0.5">
        CALCULATORS
      </text>
      <text x="16" y="48" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#FFFFFF">
        SIP · TER Drag · SWP
      </text>

      <!-- Card 2 -->
      <rect x="235" y="0" width="225" height="70" rx="12" fill="#1C1A17" stroke="#33302B" stroke-width="1" />
      <text x="251" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FACC15" letter-spacing="0.5">
        FUND COMPARISON
      </text>
      <text x="251" y="48" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#FFFFFF">
        Neutral Factsheet Data
      </text>

      <!-- Card 3 -->
      <rect x="475" y="0" width="220" height="70" rx="12" fill="#1C1A17" stroke="#33302B" stroke-width="1" />
      <text x="491" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#60A5FA" letter-spacing="0.5">
        EVERGREEN GUIDES
      </text>
      <text x="491" y="48" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#FFFFFF">
        9 Factual Pillars
      </text>
    </g>
  </g>
</svg>`;

  const svgBuffer = Buffer.from(ogSvg);
  const targetOgPng = path.join(publicDir, "og-image.png");
  const targetTwitterPng = path.join(publicDir, "twitter-image.png");

  await sharp(svgBuffer)
    .resize(width, height)
    .png({ quality: 95 })
    .toFile(targetOgPng);

  fs.copyFileSync(targetOgPng, targetTwitterPng);

  console.log(`✓ Generated ${targetOgPng} (${width}x${height})`);
  console.log(`✓ Generated ${targetTwitterPng} (${width}x${height})`);
}

generateOgImage().catch((err) => {
  console.error("Error generating OG image:", err);
  process.exit(1);
});
