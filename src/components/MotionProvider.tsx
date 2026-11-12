"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/** Space reserved for the sticky header when scrolling to an anchor (matches scroll-padding-top). */
const HEADER_OFFSET = 120;
const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const PRESSABLE = "a, button, summary, [role='button'], [data-press]";

/**
 * Site-wide GSAP motion layer, mounted once in the root layout.
 *
 * Instead of wiring animations into every page, it finds common building blocks inside <main>
 * (section headings, card grids, images, FAQ items) and animates them as they enter the viewport.
 * Pages can opt elements in with `data-reveal` or out with `data-no-motion`.
 *
 * - Only content that starts below the fold is animated, so nothing visible on load ever flickers
 *   and all content stays in the server-rendered HTML for search engines.
 * - Everything is skipped when the visitor prefers reduced motion.
 * - Animations are rebuilt on every client-side route change and fully reverted on cleanup.
 */
export default function MotionProvider() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);

  // Scroll-driven reveals, rebuilt per route.
  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const marked = new Set<Element>();
      const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92;
      // Skip anything already animated through an ancestor, opted out, or in the initial viewport.
      const eligible = (el: Element) => {
        if (el.closest("[data-no-motion]") || !belowFold(el)) return false;
        for (let p = el.parentElement; p && p !== main; p = p.parentElement) if (marked.has(p)) return false;
        return !marked.has(el);
      };
      const take = (els: Element[]) => {
        const out = els.filter(eligible);
        out.forEach((el) => marked.add(el));
        return out;
      };

      // 1. Explicit opt-ins.
      take(gsap.utils.toArray<Element>("[data-reveal]", main)).forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // 2. Card grids and lists: children rise in with a stagger, batched per scroll position.
      const gridChildren = gsap.utils
        .toArray<Element>("section .grid", main)
        .flatMap((grid) => take(Array.from(grid.children)));
      if (gridChildren.length) {
        gsap.set(gridChildren, { autoAlpha: 0, y: 48 });
        ScrollTrigger.batch(gridChildren, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.09, overwrite: true }),
        });
      }

      // 3. Section headings and their lead paragraphs.
      take(gsap.utils.toArray<Element>("section h2, section h2 + p", main)).forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // 4. Photos settle from a slight zoom (their containers clip the overflow).
      take(gsap.utils.toArray<Element>("section img", main)).forEach((img) => {
        gsap.from(img, {
          autoAlpha: 0,
          scale: 1.08,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: img, start: "top 92%", once: true },
        });
      });

      // 5. FAQ accordions.
      const faqs = take(gsap.utils.toArray<Element>("details", main));
      if (faqs.length) {
        gsap.set(faqs, { autoAlpha: 0, x: -24 });
        ScrollTrigger.batch(faqs, {
          start: "top 92%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out", stagger: 0.07 }),
        });
      }

      // 6. Hero parallax: the background photo drifts slower than the page and the copy eases away.
      const hero = main.querySelector<HTMLElement>(":scope > section:first-child");
      const heroImg = hero?.querySelector<HTMLElement>(":scope > img");
      if (hero && heroImg) {
        gsap.set(heroImg, { scale: 1.12, transformOrigin: "50% 50%" });
        gsap.to(heroImg, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
        // The container, not the copy itself: the copy's CSS entry animation would override GSAP.
        const copy = hero.querySelector(":scope > div:last-child");
        if (copy) {
          gsap.to(copy, {
            y: -60,
            autoAlpha: 0.2,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
          });
        }
      }

      // Images and fonts can shift layout after first paint; recalculate trigger positions.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => mm.revert();
  }, [pathname]);

  // Route-independent behaviour: progress bar, eased anchor scrolling, press feedback.
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const bar = progressRef.current;
      const progress = bar
        ? gsap.to(bar, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
          })
        : null;

      // Smooth, eased scrolling for same-page anchor links (Next <Link> skips if default is prevented).
      const onClick = (e: MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href*='#']");
        if (!link || link.target === "_blank") return;
        const url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
        const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (!target) return;
        e.preventDefault();
        history.pushState(null, "", url.hash);
        gsap.to(window, {
          duration: 0.9,
          ease: "power3.inOut",
          scrollTo: { y: target, offsetY: HEADER_OFFSET, autoKill: true },
          onComplete: () => target.focus({ preventScroll: true }),
        });
      };

      // Tactile press feedback for taps and clicks; the dip scales down for large cards.
      let pressed: HTMLElement | null = null;
      const release = () => {
        if (!pressed) return;
        gsap.to(pressed, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
        pressed = null;
      };
      const onDown = (e: PointerEvent) => {
        if (e.button !== 0) return;
        const el = (e.target as Element | null)?.closest<HTMLElement>(PRESSABLE);
        if (!el || el.closest("[data-no-motion]") || getComputedStyle(el).display === "inline") return;
        release();
        pressed = el;
        const dip = Math.min(0.05, 10 / Math.max(el.offsetWidth, 1));
        gsap.to(el, { scale: 1 - dip, duration: 0.12, ease: "power2.out", overwrite: "auto" });
      };

      document.addEventListener("click", onClick);
      document.addEventListener("pointerdown", onDown, { passive: true });
      document.addEventListener("pointerup", release, { passive: true });
      document.addEventListener("pointercancel", release, { passive: true });
      window.addEventListener("blur", release);

      return () => {
        progress?.scrollTrigger?.kill();
        document.removeEventListener("click", onClick);
        document.removeEventListener("pointerdown", onDown);
        document.removeEventListener("pointerup", release);
        document.removeEventListener("pointercancel", release);
        window.removeEventListener("blur", release);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={progressRef}
      aria-hidden="true"
      style={{ transform: "scaleX(0)" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-70 h-0.75 origin-left bg-accent motion-reduce:hidden"
    />
  );
}
