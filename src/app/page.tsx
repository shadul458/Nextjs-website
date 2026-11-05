// Home page: the whole portfolio is one page.
// Section components live in src/components/Sections.tsx,
// and all text lives in src/content/site.ts.

import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { Capabilities, Contact, Experience, Footer, Hero, Work } from "@/components/Sections";
import { contact, site } from "@/content/site";

// Structured data so search engines understand who this site is about.
// Only real URLs (not [placeholders]) go into sameAs.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  worksFor: { "@type": "Organization", name: "MaxIQ" },
  sameAs: contact.links.map((l) => l.href).filter((href) => href.startsWith("http")),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main id="top">
        <Hero />
        <Work />
        <Experience />
        <Capabilities />
        <Contact />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
