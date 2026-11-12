"use client";

import Image from "@/components/Photo";
import { useCallback, useEffect, useRef } from "react";
import UiIcon from "@/components/UiIcon";
import type { PortfolioPhoto } from "@/data/portfolio";

/** Accessible modal image viewer: Esc closes, arrow keys navigate, focus is trapped and restored. */
export default function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: PortfolioPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];
  const count = photos.length;

  const prev = useCallback(() => onNavigate((index - 1 + count) % count), [index, count, onNavigate]);
  const next = useCallback(() => onNavigate((index + 1) % count), [index, count, onNavigate]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // Basic swipe support on touch devices.
  const touchX = useRef<number | null>(null);

  if (!photo) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title} – image ${index + 1} of ${count}`}
      className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <span className="text-sm text-white/70">
          {index + 1} / {count}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="rounded-full p-2 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close image viewer"
        >
          <UiIcon name="x" className="h-7 w-7" />
        </button>
      </div>

      <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          className="object-contain p-2 md:p-8"
        />
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-navy/80 p-3 text-white hover:bg-accent hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:left-6"
            >
              <UiIcon name="chevron-left" className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-navy/80 p-3 text-white hover:bg-accent hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:right-6"
            >
              <UiIcon name="chevron-right" className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 pb-6 pt-3 text-center text-white">
        <h2 className="text-lg font-bold">{photo.title}</h2>
        <p className="mt-1 text-sm text-white/75">{photo.description}</p>
      </div>
    </div>
  );
}
