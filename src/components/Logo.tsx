import Image from "next/image";

/**
 * Hamile Engineering logo — the approved artwork from the logo sheet
 * (public/images/work/DarkChimney House@2x.png), cut out on a transparent background by
 * scripts/optimize-images.mjs:
 *  - /brand/hamile-contractors-logo.png       light / full-colour version (for light backgrounds)
 *  - /brand/hamile-contractors-logo-dark.png  dark / full-colour version (for navy and dark backgrounds)
 */
const variants = {
  light: { src: "/brand/hamile-contractors-logo.png", width: 753, height: 759 },
  dark: { src: "/brand/hamile-contractors-logo-dark.png", width: 411, height: 406 },
};

export default function Logo({
  className = "h-16 w-auto",
  onDark = false,
  preload = false,
}: {
  className?: string;
  /** use the dark-background version of the logo */
  onDark?: boolean;
  preload?: boolean;
}) {
  const v = variants[onDark ? "dark" : "light"];
  return (
    <Image
      src={v.src}
      alt="Hamile Engineering"
      width={v.width}
      height={v.height}
      sizes="160px"
      preload={preload}
      className={className}
    />
  );
}
