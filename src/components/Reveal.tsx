// Watches every element with `data-reveal` and adds `.is-visible` the
// first time it scrolls into view. The CSS in globals.css does the fade.
// Renders nothing; it's mounted once on the page.

"use client";

import { useEffect } from "react";

export default function Reveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // trigger once
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
