"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "@/components/Lightbox";
import UiIcon from "@/components/UiIcon";
import type { PortfolioPhoto } from "@/data/portfolio";

export type GalleryFilter = { value: string; label: string };

/** Filterable, responsive project gallery with a lightbox viewer. */
export default function PhotoGallery({
  photos,
  filters,
  initialFilter = "all",
  limit,
}: {
  photos: PortfolioPhoto[];
  /** Category filters; omit to hide the filter bar. */
  filters?: GalleryFilter[];
  initialFilter?: string;
  /** Show only the first N photos (e.g. on the homepage). */
  limit?: number;
}) {
  const [filter, setFilter] = useState(initialFilter);
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(() => {
    const list = filter === "all" ? photos : photos.filter((p) => p.category === filter);
    return limit ? list.slice(0, limit) : list;
  }, [photos, filter, limit]);

  return (
    <div>
      {filters && (
        <div
          role="group"
          aria-label="Filter projects by service"
          className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
        >
          {[{ value: "all", label: "All Projects" }, ...filters].map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.value)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active ? "bg-accent text-ink" : "bg-white text-navy ring-1 ring-navy/15 hover:bg-mist"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      )}

      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-live="polite">
        {visible.map((photo, i) => (
          <li key={photo.slug} className={i === 0 && !limit ? "col-span-2 row-span-2" : ""}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-square w-full overflow-hidden rounded-xl bg-mist text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={i === 0 && !limit ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent" />
              <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <UiIcon name="expand" className="h-4 w-4" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <span className="block text-sm font-bold leading-snug text-white sm:text-base">{photo.title}</span>
                <span className="mt-1 hidden text-xs leading-snug text-white/80 sm:line-clamp-2">{photo.description}</span>
              </span>
              <span className="sr-only">– view larger image</span>
            </button>
          </li>
        ))}
      </ul>

      {visible.length === 0 && <p className="py-10 text-center text-ink/60">No projects in this category yet.</p>}

      {open !== null && (
        <Lightbox photos={visible} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
      )}
    </div>
  );
}
