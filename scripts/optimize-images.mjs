// One-off asset pipeline: converts the original site photographs in assets-src/photos (kept out of
// public/ so the unredacted originals are never served)
// into web-sized WebP files with descriptive, SEO-friendly filenames in public/images/work,
// and generates the favicon / Open Graph images from the supplied logo.
//
// Run with: node scripts/optimize-images.mjs
// (uses `sharp`, which is already installed as part of Next.js — no extra dependency)
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = "assets-src/photos";
const OUT = "public/images/work";
const MAX = 1600;

/** source filename -> output slug (and optional crop for screenshots) */
const photos = [
  ["proConcretePouring.jpg", "concrete-slab-pour-screeding"],
  ["IMG_20250516_130659.jpg", "commercial-concrete-slab-levelling"],
  ["concretePouringPreps.jpg", "slab-reinforcement-before-pour"],
  ["IMG_20250516_125820.jpg", "team-on-site-concrete-pour"],
  ["IMG-20221220-WA0042.jpg", "completed-concrete-slab"],
  ["IMG-20221220-WA0049.jpg", "reinforcement-mesh-bar-spacers"],
  ["IMG-20221220-WA0052.jpg", "foundation-rebar-mesh"],
  ["IMG_20250513_155344.jpg", "excavation-site-works-team"],
  ["paving.jpg", "service-station-paving-works"],
  ["IMG_20241213_173259.jpg", "interlocking-paving-completed"],
  ["siteEstablishment.jpg", "service-station-site-establishment"],
  ["IMG_20240822_162859.jpg", "service-station-canopy-site"],
  ["proWelding.jpg", "on-site-welding-steel-mesh-enclosure"],
  ["IMG_20260831_130926.jpg", "fabricated-steel-mesh-security-cages"],
  ["A-frame.jpg", "fabricated-steel-a-frame-stand"],
  ["A-frameBulk.jpg", "batch-fabricated-steel-frames"],
  ["weldingAssembling.jpg", "workshop-steel-fabrication-assembly"],
  ["2kLitresSteelTanks.jpg", "steel-tank-fabrication-workshop"],
  ["qualifiedBoilerMaker.jpg", "boilermaking-workshop"],
  ["AGTank (1).jpg", "above-ground-fuel-tank-dispenser"],
  ["poolDecking (2).jpg", "diesel-tank-dispenser-installation"],
  ["IMG_20240730_165716.jpg", "fuel-tank-installation-site"],
  ["IMG_20240808_143940.jpg", "flanged-pipe-fitting"],
  ["IMG_20240808_143936.jpg", "flanged-pipework-installation"],
  ["pipeFitting.jpg", "underground-pipework-trench"],
  ["IMG_20240906_090826.jpg", "underground-tank-installation"],
  ["IMG-20230228-WA0014.jpg", "timber-clad-steel-framed-door"],
  ["IMG-20230228-WA0017.jpg", "timber-garden-steps"],
  ["IMG-20230228-WA0022.jpg", "timber-deck-plunge-pool"],
  // phone screenshot: crop away the black UI bars around the photo
  ["poolDecking (1).jpg", "hardwood-pool-deck", { left: 0, top: 386, width: 640, height: 476 }],
  ["woodDecks (1).jpg", "octagonal-tree-deck"],
  ["roofCleaning.jpg", "roof-tile-pressure-cleaning"],
  ["IMG_20250123_144104_1.jpg", "roof-tile-cleaning-maintenance"],
  // Fuel storage & dispensing infrastructure
  ["IMG-20240227-WA0010.jpg", "underground-fuel-tanks-installation"],
  ["IMG-20240227-WA0028.jpg", "underground-tanks-excavation-commercial"],
  ["IMG-20240227-WA0021.jpg", "tank-sumps-flexible-fuel-lines"],
  ["IMG-20240227-WA0013.jpg", "dispenser-sump-valves-pipework"],
  ["IMG-20240227-WA0014.jpg", "forecourt-dispenser-island-rebuild"],
  ["IMG-20240921-WA0019.jpg", "fuel-dispenser-maintenance"],
  ["IMG_20250530_142706.jpg", "tank-sump-submersible-pump"],
  ["IMG_20220909_175059.jpg", "pipe-installation-at-height"],
];

/**
 * Brand redaction: third-party brand names and logos (fuel companies, equipment makers, workwear
 * and hard-hat logos, shop signs, product labels) are pixelated so no brand appears on the site.
 * Regions are [left, top, width, height] as fractions (0–1) of the final image.
 */
const redact = {
  "forecourt-dispenser-island-rebuild": [[0.62, 0.0, 0.17, 0.115], [0.69, 0.09, 0.12, 0.08], [0.4, 0.145, 0.09, 0.1], [0.79, 0.15, 0.06, 0.1], [0.5, 0.17, 0.05, 0.07]],
  "service-station-site-establishment": [[0.24, 0.19, 0.21, 0.17], [0.25, 0.44, 0.08, 0.12], [0.12, 0.47, 0.06, 0.11], [0.01, 0.57, 0.06, 0.06]],
  "service-station-canopy-site": [[0.25, 0.44, 0.11, 0.15], [0.69, 0.42, 0.17, 0.18]],
  "service-station-paving-works": [[0.37, 0.31, 0.27, 0.05], [0.84, 0.33, 0.1, 0.09]],
  "fuel-dispenser-maintenance": [[0.05, 0.165, 0.11, 0.05], [0.54, 0.19, 0.05, 0.04], [0.19, 0.4, 0.07, 0.05]],
  "diesel-tank-dispenser-installation": [[0.25, 0.16, 0.09, 0.09], [0.24, 0.25, 0.13, 0.07], [0.6, 0.14, 0.15, 0.1], [0.26, 0.48, 0.08, 0.06]],
  "underground-tanks-excavation-commercial": [[0.25, 0.47, 0.06, 0.08], [0.35, 0.54, 0.08, 0.07], [0.46, 0.67, 0.06, 0.07]],
  "above-ground-fuel-tank-dispenser": [[0.28, 0.36, 0.08, 0.08], [0.44, 0.24, 0.06, 0.04]],
  "dispenser-sump-valves-pipework": [[0.45, 0.47, 0.14, 0.08], [0.44, 0.69, 0.15, 0.08], [0.61, 0.56, 0.07, 0.06], [0.38, 0.71, 0.08, 0.05], [0.0, 0.73, 0.15, 0.06]],
  "tank-sump-submersible-pump": [[0.32, 0.38, 0.12, 0.04], [0.22, 0.27, 0.08, 0.08], [0.38, 0.55, 0.06, 0.06], [0.09, 0.76, 0.12, 0.04], [0.6, 0.53, 0.1, 0.07]],
  "boilermaking-workshop": [[0.0, 0.61, 0.1, 0.09]],
  "steel-tank-fabrication-workshop": [[0.0, 0.65, 0.05, 0.08], [0.45, 0.1, 0.07, 0.05]],
  "flanged-pipe-fitting": [[0.06, 0.42, 0.16, 0.08]],
  "flanged-pipework-installation": [[0.31, 0.82, 0.1, 0.1]],
  "fuel-tank-installation-site": [[0.07, 0.51, 0.11, 0.06], [0.0, 0.77, 0.09, 0.08]],
  "underground-tank-installation": [[0.0, 0.83, 0.1, 0.07], [0.59, 0.66, 0.05, 0.04]],
  "excavation-site-works-team": [[0.23, 0.54, 0.06, 0.04], [0.33, 0.78, 0.05, 0.04]],
  "slab-reinforcement-before-pour": [[0.43, 0.35, 0.15, 0.07], [0.34, 0.22, 0.16, 0.04]],
  "team-on-site-concrete-pour": [[0.56, 0.35, 0.11, 0.07]],
  "batch-fabricated-steel-frames": [[0.33, 0.04, 0.25, 0.1], [0.68, 0.0, 0.24, 0.15]],
  "on-site-welding-steel-mesh-enclosure": [[0.29, 0.63, 0.09, 0.1], [0.36, 0.6, 0.1, 0.06], [0.58, 0.52, 0.14, 0.09]],
  "roof-tile-pressure-cleaning": [[0.42, 0.24, 0.06, 0.05], [0.52, 0.25, 0.06, 0.04]],
  "roof-tile-cleaning-maintenance": [[0.39, 0.19, 0.07, 0.05], [0.49, 0.19, 0.05, 0.05]],
};

/** Pixelates and softens each region so text and logos are unreadable. */
async function applyRedactions(buffer, regions) {
  const { width: W, height: H } = await sharp(buffer).metadata();
  const overlays = [];
  for (const [fx, fy, fw, fh] of regions) {
    const left = Math.max(0, Math.floor(fx * W));
    const top = Math.max(0, Math.floor(fy * H));
    const width = Math.min(W - left, Math.ceil(fw * W));
    const height = Math.min(H - top, Math.ceil(fh * H));
    const block = Math.max(6, Math.round(Math.min(width, height) / 5));
    const small = await sharp(buffer)
      .extract({ left, top, width, height })
      .resize(Math.max(1, Math.round(width / block)), Math.max(1, Math.round(height / block)), { kernel: "cubic" })
      .toBuffer();
    const input = await sharp(small).resize(width, height, { kernel: "nearest" }).blur(Math.max(1, block / 3)).toBuffer();
    overlays.push({ input, left, top });
  }
  return sharp(buffer).composite(overlays).toBuffer();
}

// `node scripts/optimize-images.mjs --photos-only` re-processes the photographs without
// regenerating the brand assets below.
const photosOnly = process.argv.includes("--photos-only");

await mkdir(OUT, { recursive: true });
const dims = {};
for (const [file, slug, crop] of photos) {
  let img = sharp(path.join(SRC, file)).rotate();
  if (crop) img = img.extract(crop);
  let buffer = await img.resize(MAX, MAX, { fit: "inside", withoutEnlargement: true }).png().toBuffer();
  if (redact[slug]) buffer = await applyRedactions(buffer, redact[slug]);
  const info = await sharp(buffer).webp({ quality: 78 }).toFile(path.join(OUT, `${slug}.webp`));
  dims[slug] = [info.width, info.height];
  console.log(`${slug}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}
await writeFile("src/data/image-dimensions.json", JSON.stringify(dims, null, 2) + "\n");
if (photosOnly) process.exit(0);

// ---- Brand assets ----
// Source: the approved logo sheet "DarkChimney House@2x.png" (light full-colour, dark full-colour,
// one-colour white and black variants). Each variant is cut from its panel and the panel colour is
// converted to transparency, so the artwork itself is unchanged.
const SHEET = "public/images/work/DarkChimney House@2x.png";
await mkdir("public/brand", { recursive: true });

/** GIMP-style "colour to alpha": removes a solid background colour while keeping anti-aliased edges. */
async function cutOut(region, bg, pad = 24) {
  const { data, info } = await sharp(SHEET).extract(region).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    let a = 0;
    for (let c = 0; c < 3; c++) {
      const p = data[i + c], b = bg[c];
      const ac = p > b ? (p - b) / (255 - b || 1) : p < b ? (b - p) / (b || 1) : 0;
      a = Math.max(a, ac);
    }
    if (a > 0) for (let c = 0; c < 3; c++) data[i + c] = Math.round(Math.min(255, Math.max(0, (data[i + c] - bg[c]) / a + bg[c])));
    data[i + 3] = Math.round(a * 255);
  }
  return sharp(data, { raw: info })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer({ resolveWithObject: true });
}

const LIGHT_BG = [248, 249, 250];
const NAVY_BG = [30, 58, 95];
// Bounds measured from the sheet (2x): full logo, house mark only, and the dark-panel logo.
const light = await cutOut({ left: 605, top: 231, width: 705, height: 711 }, LIGHT_BG);
const markImg = await cutOut({ left: 740, top: 231, width: 441, height: 432 }, LIGHT_BG, 8);
const dark = await cutOut({ left: 137, top: 1354, width: 363, height: 358 }, NAVY_BG);
await sharp(light.data).toFile("public/brand/hamile-contractors-logo.png");
await sharp(dark.data).toFile("public/brand/hamile-contractors-logo-dark.png");
await sharp(markImg.data).toFile("public/brand/hamile-contractors-mark.png");
console.log("logo", light.info.width, light.info.height, "dark", dark.info.width, dark.info.height);

// Favicon / Apple icon: the house-and-hammer mark centred on a white square.
const square = async (size, pad) =>
  sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } })
    .composite([{ input: await sharp(markImg.data).resize(size - pad * 2, size - pad * 2, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } }).toBuffer(), gravity: "centre" }])
    .png();
await (await square(96, 6)).toFile("src/app/icon.png");
await (await square(180, 20)).toFile("src/app/apple-icon.png");

// Open Graph / social sharing image (1200x630): logo on the light brand background with navy band.
const ogLogo = await sharp(light.data).resize({ height: 460 }).png().toBuffer();
const ogLogoMeta = await sharp(ogLogo).metadata();
const band = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#f8f9fa"/>
<rect y="520" width="1200" height="110" fill="#1e3a5f"/>
<rect y="512" width="1200" height="8" fill="#f97316"/>
<text x="600" y="585" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#ffffff" letter-spacing="2">BUILDING · STEEL FABRICATION · PIPE FITTING · CARPENTRY · MAINTENANCE</text>
</svg>`);
await sharp(band)
  .composite([{ input: ogLogo, left: Math.round((1200 - ogLogoMeta.width) / 2), top: Math.max(0, Math.round((512 - ogLogoMeta.height) / 2)) }])
  .png()
  .toFile("src/app/opengraph-image.png");
console.log("brand assets written");
