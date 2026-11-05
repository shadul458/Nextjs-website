// Sticky top navigation.
// Client Component because it reacts to scrolling, opens a mobile menu,
// and switches the theme.

"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const links = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.getAttribute("data-theme") ??
    (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  const next = current === "light" ? "dark" : "light";

  // Fade colours for 300ms while switching
  root.classList.add("theme-switching");
  root.setAttribute("data-theme", next);
  window.setTimeout(() => root.classList.remove("theme-switching"), 300);

  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage blocked (private mode): the theme still switches for this visit
  }
}

function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch colour theme"
      className="flex size-8 items-center justify-center rounded-sm border border-line text-muted transition-colors hover:text-text"
    >
      {/* Sun shows in dark mode, moon in light mode (handled in CSS below) */}
      <svg viewBox="0 0 16 16" className="theme-icon-sun size-4" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <circle cx="8" cy="8" r="3" />
        <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1 1M12 12l1 1M3 13l1-1M12 4l1-1" />
      </svg>
      <svg viewBox="0 0 16 16" className="theme-icon-moon size-4" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7z" />
      </svg>
    </button>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-20 border-b transition-colors duration-300 ${
        solid ? "border-line bg-surface" : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 md:px-8">
        <a href="#top" className="t-h3">
          {site.name}
        </a>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 t-small md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="btn btn-secondary px-3 py-1 t-small md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Mobile menu: full-width panel under the bar */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full border-b border-line bg-surface transition duration-300 ease-out md:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-4 py-2">
          {links.map((link) => (
            <li key={link.href} className="border-b border-line last:border-b-0">
              <a href={link.href} onClick={() => setOpen(false)} className="block py-4">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
