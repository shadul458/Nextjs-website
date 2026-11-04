// The animated green word in the heading.
//
// It changes every few seconds, so it needs state and a timer -> "use client".
// Only this small word runs in the browser; the rest of the Hero stays a
// Server Component. (Next.js docs: keep "use client" files as small as possible.)

"use client";

import { useEffect, useState } from "react";

const words = ["Revenue", "Pipeline", "Forecasts", "Retention", "Execution"];

export default function RotatingWord() {
  const [index, setIndex] = useState(0);

  // useEffect runs after the component appears on screen.
  // We start a timer, and return a "cleanup" that stops it if the component goes away.
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    // inline-grid stacks every word in the same spot. The hidden copies keep
    // the box as wide as the longest word, so the heading never jumps around.
    <span className="inline-grid overflow-hidden pb-1 align-bottom">
      {words.map((word) => (
        <span key={word} aria-hidden="true" className="invisible col-start-1 row-start-1">
          {word}
        </span>
      ))}

      {/* Changing `key` makes React create a new element, which replays the
          slide-up animation each time the word changes. */}
      <span
        key={words[index]}
        className="col-start-1 row-start-1 text-left text-green-400 animate-word-in"
      >
        {words[index]}
      </span>
    </span>
  );
}
