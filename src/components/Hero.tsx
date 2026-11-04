// SECTION 1: Hero
// A "component" is just a function that returns JSX (HTML-like code).
// Components live in their own files so they can be reused and kept tidy.
// The `className` values are Tailwind CSS classes — small utility styles
// like `text-4xl` (big text) or `py-24` (vertical padding).

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white px-6 py-24 text-center dark:from-zinc-900 dark:to-black">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Learning Next.js
      </h1>

      <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        This is my first Next.js website. I&apos;m building it step by step to
        learn components, styling, and pages.
      </p>

      {/* <Link> is Next.js's way to link between pages without a full reload.
          "#features" jumps down to the section with id="features". */}
      <Link
        href="#features"
        className="mt-8 inline-block rounded-full bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
      >
        See what I&apos;m learning
      </Link>
    </section>
  );
}
