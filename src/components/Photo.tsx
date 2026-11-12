"use client";

import Image, { type ImageProps } from "next/image";
import { cloudinaryLoader, isCloudinarySrc } from "@/lib/cloudinary";

/**
 * Drop-in replacement for next/image for site photographs. When Cloudinary is configured,
 * mirrored photos are delivered from its CDN; everything else uses Next's built-in optimizer.
 * (A client component, because loader functions can't be passed from Server Components.)
 */
export default function Photo({ alt, loader, ...props }: ImageProps) {
  const useCloudinary = typeof props.src === "string" && isCloudinarySrc(props.src);
  return <Image {...props} alt={alt} loader={useCloudinary ? cloudinaryLoader : loader} />;
}
