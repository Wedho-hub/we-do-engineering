"use client";

import Image from "@/components/Photo";
import { useRef, useState } from "react";
import Lightbox from "@/components/Lightbox";
import UiIcon from "@/components/UiIcon";
import type { PortfolioPhoto } from "@/data/portfolio";

/** Swipeable featured-projects carousel (CSS scroll-snap; no autoplay, so it never fights the user). */
export default function FeaturedCarousel({
  photos,
  categoryNames,
}: {
  photos: PortfolioPhoto[];
  categoryNames: Record<string, string>;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  function scroll(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <ul
        ref={track}
        aria-label="Featured projects"
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:mx-0 sm:px-0"
      >
        {photos.map((photo, i) => (
          <li key={photo.slug} className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-2rem)/3)]">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-4/5 w-full overflow-hidden rounded-2xl bg-navy text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 80vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-linear-to-t from-navy-dark via-navy-dark/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-5">
                <span className="mb-2 inline-block rounded bg-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ink">
                  {categoryNames[photo.category]}
                </span>
                <span className="block text-lg font-bold text-white">{photo.title}</span>
                <span className="mt-1 block text-sm text-white/80">{photo.description}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous featured projects"
          className="rounded-full border-2 border-navy p-2.5 text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/50"
        >
          <UiIcon name="chevron-left" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next featured projects"
          className="rounded-full border-2 border-navy bg-navy p-2.5 text-white transition-colors hover:bg-navy-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/50"
        >
          <UiIcon name="chevron-right" />
        </button>
      </div>

      {open !== null && <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />}
    </div>
  );
}
