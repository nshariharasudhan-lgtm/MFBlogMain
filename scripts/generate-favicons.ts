import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

// Ultra-crisp master 512x512 SVG for YieldNest
const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="64" y1="32" x2="448" y2="480" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1A1815" />
      <stop offset="100%" stop-color="#0D0C0A" />
    </linearGradient>

    <!-- Golden Egg Gradient 1 (Left) -->
    <linearGradient id="eggGradLeft" x1="100" y1="180" x2="210" y2="390" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="35%" stop-color="#FACC15" />
      <stop offset="75%" stop-color="#EAB308" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>

    <!-- Golden Egg Gradient 2 (Center - brightest hero egg) -->
    <linearGradient id="eggGradCenter" x1="195" y1="140" x2="315" y2="380" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFDF5" />
      <stop offset="20%" stop-color="#FEF08A" />
      <stop offset="55%" stop-color="#FACC15" />
      <stop offset="85%" stop-color="#EAB308" />
      <stop offset="100%" stop-color="#92400E" />
    </linearGradient>

    <!-- Golden Egg Gradient 3 (Right) -->
    <linearGradient id="eggGradRight" x1="300" y1="180" x2="410" y2="390" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="35%" stop-color="#FACC15" />
      <stop offset="75%" stop-color="#EAB308" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>

    <!-- Emerald Leaf Gradients -->
    <linearGradient id="leafGradPrimary" x1="340" y1="50" x2="440" y2="190" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#4ADE80" />
      <stop offset="45%" stop-color="#22C55E" />
      <stop offset="100%" stop-color="#15803D" />
    </linearGradient>

    <linearGradient id="leafGradSecondary" x1="380" y1="80" x2="480" y2="210" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#22C55E" />
      <stop offset="50%" stop-color="#16A34A" />
      <stop offset="100%" stop-color="#166534" />
    </linearGradient>

    <!-- Nest Highlights -->
    <linearGradient id="goldRimGrad" x1="70" y1="380" x2="440" y2="440" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#CA8A04" stop-opacity="0.2" />
      <stop offset="50%" stop-color="#FACC15" stop-opacity="0.75" />
      <stop offset="100%" stop-color="#CA8A04" stop-opacity="0.2" />
    </linearGradient>
  </defs>

  <!-- Squircle Applet Icon Canvas (App Icon & High-Contrast Tab Identity) -->
  <rect x="16" y="16" width="480" height="480" rx="108" fill="url(#bgGrad)" stroke="#2D271F" stroke-width="6" />

  <!-- Inner Soft Golden Accent Border Ring -->
  <rect x="24" y="24" width="464" height="464" rx="100" fill="none" stroke="#CA8A04" stroke-width="2.5" stroke-opacity="0.3" />

  <!-- GROWTH SPROUT LEAVES (Top Right - Flourishing Yield) -->
  <g id="sprout-leaves">
    <!-- Leaf 1 (Left primary leaf) -->
    <path
      d="M346 195 C350 90, 436 48, 456 58 C462 130, 412 182, 364 206 Z"
      fill="url(#leafGradPrimary)"
    />
    <path
      d="M358 198 C388 145, 428 98, 452 64"
      stroke="#BBF7D0"
      stroke-width="3.5"
      stroke-linecap="round"
      stroke-opacity="0.8"
    />
    <!-- Leaf 2 (Right secondary leaf) -->
    <path
      d="M378 206 C394 125, 474 92, 492 104 C490 166, 442 210, 396 220 Z"
      fill="url(#leafGradSecondary)"
    />
    <path
      d="M388 208 C420 160, 460 125, 486 110"
      stroke="#86EFAC"
      stroke-width="3"
      stroke-linecap="round"
      stroke-opacity="0.75"
    />
  </g>

  <!-- NEST STRUCTURE (Base bowl supporting the 3 golden eggs) -->
  <g id="nest-base">
    <!-- Back lip shadow -->
    <ellipse cx="256" cy="355" rx="195" ry="46" fill="#14120F" />

    <!-- EGG 1 (Left): Bar Chart -->
    <g id="egg-left">
      <ellipse cx="160" cy="300" rx="66" ry="94" fill="url(#eggGradLeft)" />
      <ellipse cx="160" cy="300" rx="66" ry="94" stroke="#FDE047" stroke-width="3.5" stroke-opacity="0.9" />
      <!-- Bar Chart Glyph (Solid high contrast) -->
      <rect x="124" y="310" width="16" height="40" rx="4" fill="#1A1815" />
      <rect x="150" y="280" width="16" height="70" rx="4" fill="#1A1815" />
      <rect x="176" y="250" width="16" height="100" rx="4" fill="#1A1815" />
    </g>

    <!-- EGG 3 (Right): Trend Line with Arrow -->
    <g id="egg-right">
      <ellipse cx="352" cy="300" rx="66" ry="94" fill="url(#eggGradRight)" />
      <ellipse cx="352" cy="300" rx="66" ry="94" stroke="#FDE047" stroke-width="3.5" stroke-opacity="0.9" />
      <!-- Trendline & Arrow Glyph -->
      <path
        d="M318 338 L340 312 L362 326 L388 274"
        stroke="#1A1815"
        stroke-width="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M368 274 L388 274 L388 294"
        stroke="#1A1815"
        stroke-width="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>

    <!-- EGG 2 (Center - Hero Golden Egg): Donut & Growth Wedge -->
    <g id="egg-center">
      <ellipse cx="256" cy="270" rx="74" ry="104" fill="url(#eggGradCenter)" />
      <ellipse cx="256" cy="270" rx="74" ry="104" stroke="#FEF08A" stroke-width="4" />
      <!-- Specular Highlight for 3D Golden Gleam -->
      <ellipse cx="235" cy="216" rx="18" ry="34" fill="#FFFFFF" fill-opacity="0.45" transform="rotate(-15 235 216)" />
      <!-- Financial Pie Glyph with Emerald Growth Slice -->
      <circle cx="256" cy="270" r="42" fill="#1A1815" />
      <!-- Emerald Growth Slice -->
      <path
        d="M256 270 L256 228 A42 42 0 0 1 298 270 Z"
        fill="#16A34A"
      />
      <path
        d="M256 270 L285.7 240.3 A42 42 0 0 1 298 270 Z"
        fill="#22C55E"
      />
      <!-- Center Gold Core -->
      <circle cx="256" cy="270" r="16" fill="#FACC15" />
      <circle cx="256" cy="270" r="16" stroke="#CA8A04" stroke-width="2.5" fill="none" />
    </g>

    <!-- Front Nest Bowl (Overlapping bottom portion of eggs) -->
    <!-- Main Outer Bowl -->
    <ellipse cx="256" cy="404" rx="208" ry="64" fill="#1C1A17" stroke="#2B261F" stroke-width="3" />
    <!-- Secondary Depth Layer -->
    <ellipse cx="256" cy="396" rx="196" ry="52" fill="#26221C" />
    <!-- Golden Woven Highlights on Nest Strands -->
    <path
      d="M72 396 C124 456, 388 456, 440 396 C388 464, 124 464, 72 396 Z"
      fill="#3E362C"
    />
    <path
      d="M100 412 C150 454, 362 454, 412 412 C362 460, 150 460, 100 412 Z"
      fill="url(#goldRimGrad)"
    />
    <!-- Additional nest texture lines -->
    <path
      d="M140 432 C180 452, 332 452, 372 432"
      stroke="#CA8A04"
      stroke-width="3.5"
      stroke-linecap="round"
      stroke-opacity="0.5"
    />
  </g>
</svg>
`;

// Standalone favicon SVG (crisp, scalable vector for modern browsers)
const standaloneSvg = svgContent;

/**
 * Creates a standard multi-resolution ICO file from PNG buffers.
 * Supported by modern web standards and all desktop/mobile browsers.
 */
function createIco(pngBuffers: { width: number; height: number; buffer: Buffer }[]): Buffer {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const directoryEntrySize = 16;
  const headerAndDirSize = headerSize + numImages * directoryEntrySize;

  let currentOffset = headerAndDirSize;
  const entries: Buffer[] = [];
  const imageBuffers: Buffer[] = [];

  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    // Width (0 means 256)
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    // Height (0 means 256)
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    // Color count (0 for 32-bit PNG)
    entry.writeUInt8(0, 2);
    // Reserved
    entry.writeUInt8(0, 3);
    // Color planes (1)
    entry.writeUInt16LE(1, 4);
    // Bits per pixel (32)
    entry.writeUInt16LE(32, 6);
    // Image size in bytes
    entry.writeUInt32LE(item.buffer.length, 8);
    // Offset from start of ICO file
    entry.writeUInt32LE(currentOffset, 12);

    entries.push(entry);
    imageBuffers.push(item.buffer);
    currentOffset += item.buffer.length;
  }

  // Header: 2 bytes reserved (0), 2 bytes type (1 = ICO), 2 bytes image count
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);
  icoHeader.writeUInt16LE(1, 2);
  icoHeader.writeUInt16LE(numImages, 4);

  return Buffer.concat([icoHeader, ...entries, ...imageBuffers]);
}

async function main() {
  console.log("Generating favicons and site icon assets...");

  // 1. Write the vector favicon.svg
  fs.writeFileSync(path.join(publicDir, "favicon.svg"), standaloneSvg, "utf8");
  console.log("Created public/favicon.svg");

  const svgBuffer = Buffer.from(svgContent);

  // 2. Generate PNG sizes
  const sizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "favicon-48x48.png", size: 48 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "icon-192.png", size: 192 },
    { name: "icon-512.png", size: 512 },
  ];

  const generatedPngs: { width: number; height: number; buffer: Buffer }[] = [];

  for (const { name, size } of sizes) {
    const pngBuffer = await sharp(svgBuffer)
      .resize(size, size, { fit: "contain" })
      .png({ compressionLevel: 9 })
      .toBuffer();

    fs.writeFileSync(path.join(publicDir, name), pngBuffer);
    console.log(`Created public/${name} (${size}x${size})`);

    if (size === 16 || size === 32 || size === 48) {
      generatedPngs.push({ width: size, height: size, buffer: pngBuffer });
    }
  }

  // 3. Generate favicon.ico (multi-size 16, 32, 48)
  const icoBuffer = createIco(generatedPngs);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
  console.log("Created public/favicon.ico (multi-resolution ICO with 16x16, 32x32, 48x48)");

  // 4. Create site.webmanifest
  const manifest = {
    name: "YieldNest – Mutual Fund Research & Analytics",
    short_name: "YieldNest",
    description: "Independent quantitative mutual fund research, rolling returns analysis, and investor calculation suite.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F5",
    theme_color: "#181613",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };

  fs.writeFileSync(
    path.join(publicDir, "site.webmanifest"),
    JSON.stringify(manifest, null, 2),
    "utf8"
  );
  console.log("Created public/site.webmanifest");

  console.log("All favicon assets successfully generated!");
}

main().catch((err) => {
  console.error("Error generating favicons:", err);
  process.exit(1);
});
