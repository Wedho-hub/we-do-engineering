import type { ImageLoaderProps } from "next/image";

/**
 * Cloudinary delivery for the site photographs.
 *
 * Photos are uploaded with `npm run upload-images` (scripts/upload-to-cloudinary.mjs), which maps
 * `/images/work/<slug>.webp` to the public ID `<folder>/work/<slug>`. Until
 * NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set, photos are served from /public as before.
 */
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
const folder = (process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER?.trim() || "hamile").replace(/^\/+|\/+$/g, "");

/** Local paths under this prefix are mirrored to Cloudinary. */
const MIRRORED_PREFIX = "/images/";

export const cloudinaryEnabled = Boolean(cloudName);

export function isCloudinarySrc(src: string): boolean {
  return cloudinaryEnabled && src.startsWith(MIRRORED_PREFIX);
}

/** `/images/work/foo.webp` -> `hamile/work/foo` */
export function cloudinaryPublicId(src: string): string {
  return `${folder}/${src.slice(MIRRORED_PREFIX.length).replace(/\.[a-z0-9]+$/i, "")}`;
}

/**
 * next/image loader: Cloudinary resizes to the requested width (never upscaling) and picks the
 * best format (AVIF/WebP) and compression for each browser.
 */
export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const q = quality && quality !== 75 ? `q_${quality}` : "q_auto";
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,${q},c_limit,w_${width}/${cloudinaryPublicId(src)}`;
}
