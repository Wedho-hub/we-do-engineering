export type IconName =
  | "blueprint"
  | "calendar"
  | "fuel-tank"
  | "gear"
  | "hammer"
  | "handshake"
  | "hard-hat"
  | "home-repair"
  | "industry"
  | "nut-screw"
  | "solar-panel"
  | "stopwatch"
  | "team"
  | "tools"
  | "wrench";

// Renders an SVG from public/assets/svg as a mask, so it takes the current text colour
// (e.g. "text-[#f97316]") and can change colour on hover like regular text.
export default function Icon({ name, className = "w-6 h-6" }: { name: IconName; className?: string }) {
  const url = `url(/assets/svg/${name}.svg)`;
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
