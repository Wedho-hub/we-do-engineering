// Uploads the optimised site photographs in public/images to Cloudinary.
//
// Only the processed files are uploaded — they are cropped and have third-party branding
// redacted by scripts/optimize-images.mjs. Never upload the originals in assets-src/.
//
// Credentials (set in .env.local, never commit them):
//   CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
//   NEXT_PUBLIC_CLOUDINARY_FOLDER=hamile   (optional, default "hamile")
//
// Run with: npm run upload-images            (skips photos already on Cloudinary)
//           npm run upload-images -- --force (re-uploads and overwrites everything)
import { v2 as cloudinary } from "cloudinary";
import { readdir } from "node:fs/promises";
import path from "node:path";

try {
  process.loadEnvFile(".env.local");
} catch {
  // No .env.local — rely on variables already in the environment.
}

if (!process.env.CLOUDINARY_URL) {
  console.error("CLOUDINARY_URL is not set. Add it to .env.local (see .env.example).");
  process.exit(1);
}

const ROOT = "public/images";
const folder = (process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER?.trim() || "hamile").replace(/^\/+|\/+$/g, "");
const force = process.argv.includes("--force");
// Only the optimised WebP photos the site actually uses (not logo sheets or other source PNGs).
const IMAGE = /\.webp$/i;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (IMAGE.test(entry.name)) yield full;
  }
}

let uploaded = 0;
let skipped = 0;
for await (const file of walk(ROOT)) {
  // public/images/work/foo.webp -> hamile/work/foo (must match src/lib/cloudinary.ts)
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  const publicId = `${folder}/${rel.replace(IMAGE, "")}`;
  const result = await cloudinary.uploader.upload(file, {
    public_id: publicId,
    overwrite: force,
    invalidate: force,
    resource_type: "image",
    unique_filename: false,
  });
  if (result.existing) {
    skipped++;
    console.log(`= ${publicId} (already uploaded)`);
  } else {
    uploaded++;
    console.log(`↑ ${publicId} (${result.width}×${result.height})`);
  }
}

console.log(`\nDone: ${uploaded} uploaded, ${skipped} skipped.`);
