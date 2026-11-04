// SECTION 1: Hero (dark MaxIQ-style)
// This file only arranges smaller components:
//   Navbar   -> top menu
//   EmailForm -> "Work email" + button (a Client Component, see that file)
//   Bowtie   -> the diagram at the bottom
// Splitting a big section into small components keeps each file easy to read.

import Navbar from "./Navbar";
import EmailForm from "./EmailForm";
import Bowtie from "./Bowtie";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black pb-24 text-white">
      {/* Background layer 1: a grid of tiny dots, faded out toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:6px_6px] [mask-image:radial-gradient(ellipse_at_25%_20%,black,transparent_55%)]"
      />
      {/* Background layer 2: soft green glow behind the diagram */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-96 max-w-xl rounded-full bg-green-500/15 blur-3xl"
      />

      <Navbar />

      {/* `relative` keeps the content above the absolute background layers */}
      <div className="relative mx-auto max-w-6xl px-4 pt-16 text-center sm:px-6 sm:pt-20">
        <span className="inline-block border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-medium tracking-wide">
          THE AI-NATIVE REVENUE PLATFORM
        </span>

        {/* Two lines: the second one is pushed right on bigger screens */}
        <h1 className="mt-6 text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
          <span className="block sm:-translate-x-16">Better Revenue</span>
          <span className="block sm:translate-x-16">
            Built on MaxIQ<span className="text-green-400">.</span>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-zinc-200 sm:text-base">
          MaxIQ gives revenue teams one shared context and the AGENTS that act
          on it, so you see every deal, pipeline, forecast, and rep clearly,
          and catch the signals no one else sees.
        </p>

        <EmailForm />

        <Bowtie />
      </div>
    </section>
  );
}
