import Icon, { type IconName } from "@/components/Icon";

/**
 * Branded blueprint-style panel used where no genuine project photograph exists yet.
 * It is clearly labelled as an illustration so it is never mistaken for completed work.
 */
export default function IllustrationPanel({
  icon,
  label,
  className = "",
}: {
  icon: IconName;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Illustration: ${label}`}
      className={`bg-blueprint relative flex items-center justify-center overflow-hidden text-white ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 400 300" className="absolute inset-0 h-full w-full opacity-25" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="#ffffff" strokeWidth="1.5">
          <rect x="60" y="70" width="280" height="170" />
          <path d="M60 70 200 20l140 50" />
          <path d="M150 240v-80h60v80M250 110h60v50h-60z" />
          <path d="M40 260h320M40 255v10M360 255v10" strokeDasharray="4 4" />
          <path d="M30 70v170M25 70h10M25 240h10" strokeDasharray="4 4" />
        </g>
      </svg>
      <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-accent ring-1 ring-white/20 backdrop-blur-sm">
        <Icon name={icon} className="h-10 w-10" />
      </span>
      <span className="absolute right-3 top-3 rounded bg-ink/70 px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90">
        Illustration
      </span>
    </div>
  );
}
