// This file is the HOME PAGE (the "/" URL).
// In the Next.js App Router, src/app/page.tsx = http://localhost:3000/
// The page just puts our two section components in order.

import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
}
