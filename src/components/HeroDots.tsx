// The hero's dot grid. Dots near the cursor brighten toward the accent
// colour and drift up to 6px away from it.
//
// Performance rules:
// - only animates while the hero is on screen AND the cursor effect is active
// - device pixel ratio capped at 2
// - touch devices and reduced-motion users get a static grid

"use client";

import { useEffect, useRef } from "react";

const SPACING = 24; // px between dots
const DOT = 1.5; // dot diameter
const RADIUS = 160; // cursor influence radius
const PUSH = 6; // max displacement
const LERP = 0.12; // cursor smoothing per frame
const FADE_MS = 600; // --t-slow

// cubic-bezier(0.22, 1, 0.36, 1) — the --ease-out token, solved in JS
function easeOut(t: number) {
  const [x1, y1, x2, y2] = [0.22, 1, 0.36, 1];
  const bez = (a: number, b: number, s: number) =>
    3 * a * s * (1 - s) ** 2 + 3 * b * s * s * (1 - s) + s ** 3;
  let s = t;
  for (let i = 0; i < 8; i++) {
    const x = bez(x1, x2, s) - t;
    const dx = 3 * x1 * (1 - s) ** 2 + 6 * (x2 - x1) * s * (1 - s) + 3 * (1 - x2) * s * s;
    if (Math.abs(x) < 1e-4 || dx === 0) break;
    s = Math.min(1, Math.max(0, s - x / dx));
  }
  return bez(y1, y2, s);
}

function readColor(name: string): [number, number, number] {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace("#", "");
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];
}

export default function HeroDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !hero || !ctx) return;

    const interactive =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let line = readColor("--line");
    let accent = readColor("--accent");

    // Cursor: target (real) and smoothed position
    const target = { x: 0, y: 0 };
    const cursor = { x: 0, y: 0 };
    let inside = false;

    // Effect strength 0..1, eased over 600ms on enter/leave
    let strength = 0;
    let fromStrength = 0;
    let toStrength = 0;
    let fadeStart = 0;

    let inView = true;
    let frame = 0;

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const [lr, lg, lb] = line;
      const [ar, ag, ab] = accent;

      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          let px = x;
          let py = y;
          let t = 0;

          if (strength > 0) {
            const dx = x - cursor.x;
            const dy = y - cursor.y;
            const d = Math.hypot(dx, dy);
            if (d < RADIUS) {
              t = (1 - (d / RADIUS) ** 2) * strength; // falloff by distance
              if (d > 0) {
                px += (dx / d) * PUSH * t;
                py += (dy / d) * PUSH * t;
              }
            }
          }

          ctx!.fillStyle = `rgb(${lr + (ar - lr) * t},${lg + (ag - lg) * t},${lb + (ab - lb) * t})`;
          ctx!.beginPath();
          ctx!.arc(px, py, DOT / 2, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function tick(now: number) {
      frame = 0;
      cursor.x += (target.x - cursor.x) * LERP;
      cursor.y += (target.y - cursor.y) * LERP;

      const p = Math.min(1, (now - fadeStart) / FADE_MS);
      strength = fromStrength + (toStrength - fromStrength) * easeOut(p);

      draw();

      // Keep animating only while something is still changing:
      // the fade is running, or the smoothed cursor is still catching up.
      const fading = p < 1;
      const catchingUp = Math.abs(target.x - cursor.x) > 0.1 || Math.abs(target.y - cursor.y) > 0.1;
      if (inView && (fading || (strength > 0 && catchingUp))) frame = requestAnimationFrame(tick);
    }

    function start() {
      if (!frame && inView) frame = requestAnimationFrame(tick);
    }

    function setStrength(to: number) {
      fromStrength = strength;
      toStrength = to;
      fadeStart = performance.now();
      start();
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = hero!.clientWidth;
      height = hero!.clientHeight;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    function onThemeChange() {
      line = readColor("--line");
      accent = readColor("--accent");
      draw();
    }

    function onMove(e: PointerEvent) {
      const rect = hero!.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      if (!inside) {
        inside = true;
        if (strength === 0) {
          cursor.x = target.x; // start where the cursor is, no sweep-in
          cursor.y = target.y;
        }
        setStrength(1);
      }
      start();
    }

    function onLeave() {
      inside = false;
      setStrength(0);
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(hero);

    // Redraw when the theme changes (toggle or system setting)
    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = window.matchMedia("(prefers-color-scheme: light)");
    scheme.addEventListener("change", onThemeChange);

    // Pause entirely when the hero is off-screen
    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    viewObserver.observe(hero);

    if (interactive) {
      hero.addEventListener("pointermove", onMove);
      hero.addEventListener("pointerleave", onLeave);
    }

    // Fade the grid in after the text (CSS handles timing)
    canvas.dataset.ready = "true";

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      viewObserver.disconnect();
      scheme.removeEventListener("change", onThemeChange);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-dots pointer-events-none absolute inset-0 size-full"
    />
  );
}
