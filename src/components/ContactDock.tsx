import Link from "next/link";
import UiIcon from "@/components/UiIcon";
import { business, whatsappLink } from "@/lib/business";

/**
 * Always-available contact actions:
 *  - mobile/tablet: a sticky bottom bar with Call / WhatsApp / Quote
 *  - desktop: a floating WhatsApp button
 */
export default function ContactDock() {
  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-navy-dark text-white shadow-[0_-4px_20px_rgba(22,48,87,0.25)] lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a href={business.phoneHref} className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold">
          <UiIcon name="phone" className="h-5 w-5 text-accent" />
          Call
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 border-x border-white/10 py-2.5 text-xs font-semibold"
        >
          <UiIcon name="whatsapp" className="h-5 w-5 text-accent" />
          WhatsApp
        </a>
        <Link href="/contact#quote" className="flex flex-col items-center gap-1 bg-accent py-2.5 text-xs font-bold text-ink">
          <UiIcon name="message" className="h-5 w-5" />
          Get a Quote
        </Link>
      </div>

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Hamile Engineering on WhatsApp"
        className="group fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full bg-navy py-3 pl-3 pr-5 text-white shadow-lg shadow-navy/30 ring-4 ring-accent/80 transition-transform hover:-translate-y-0.5 lg:flex"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-ink">
          <UiIcon name="whatsapp" className="h-6 w-6" />
        </span>
        <span className="text-sm font-bold">WhatsApp enquiry</span>
      </a>
    </>
  );
}
