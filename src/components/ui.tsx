import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import UiIcon from "@/components/UiIcon";
import { whatsappLink } from "@/lib/business";

/** Shared layout and button primitives so spacing, typography and CTAs stay consistent. */

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={`label-technical mb-3 inline-flex items-center gap-2.5 text-xs ${
        tone === "dark" ? "text-accent-soft" : "text-accent-strong"
      }`}
    >
      <span aria-hidden="true" className="dimension-line" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
}) {
  return (
    <div className={`mb-10 md:mb-14 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Tag
        className={`text-3xl font-bold leading-[1.1] md:text-[2.75rem] ${tone === "dark" ? "text-white" : "text-navy"}`}
      >
        {title}
      </Tag>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed md:text-lg ${tone === "dark" ? "text-white/80" : "text-ink/70"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "outline-light" | "outline-dark" | "whatsapp";

const variants: Record<ButtonVariant, string> = {
  // Orange with ink text: 6.1:1 contrast (white on orange would fail WCAG).
  primary: "bg-accent text-ink hover:bg-accent-soft shadow-sm shadow-accent/30",
  secondary: "bg-navy text-white hover:bg-navy-dark",
  "outline-light": "border-2 border-white/50 text-white hover:border-white hover:bg-white/10",
  "outline-dark": "border-2 border-navy text-navy hover:bg-navy hover:text-white",
  whatsapp: "bg-white text-navy hover:bg-mist ring-1 ring-navy/15",
};

export function buttonClass(variant: ButtonVariant = "primary", size: "md" | "lg" = "md") {
  return `inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/50 ${
    size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-sm"
  } ${variants[variant]}`;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; size?: "md" | "lg" }) {
  return <Link {...props} className={`${buttonClass(variant, size)} ${className}`} />;
}

export function WhatsAppButton({
  message,
  label = "WhatsApp Us",
  variant = "whatsapp",
  size = "md",
  className = "",
}: {
  message?: string;
  label?: string;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${buttonClass(variant, size)} ${className}`}
    >
      <UiIcon name="whatsapp" className="h-5 w-5" />
      {label}
      <span className="sr-only">(opens WhatsApp)</span>
    </a>
  );
}

export function CheckList({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3 ${tone === "dark" ? "text-white/90" : "text-ink/80"}`}>
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
            <UiIcon name="check" className="h-3 w-3" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
