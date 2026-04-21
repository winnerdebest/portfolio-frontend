// src/hooks/useScrollReveal.ts
"use client";

import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to all elements inside the given container
 * that have a `scroll-reveal`, `scroll-reveal-left`, or `scroll-reveal-scale` class.
 * When they enter the viewport the `revealed` class is added.
 */
export function useScrollReveal(deps?: unknown[]) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current ?? document;
    const selector =
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-scale";

    const elements = Array.from(
      (container as Element).querySelectorAll
        ? (container as Element).querySelectorAll(selector)
        : document.querySelectorAll(selector)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps ?? []);

  return containerRef;
}
