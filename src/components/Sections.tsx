// The page sections. These are Server Components: plain HTML, no
// browser JavaScript, so they're fast and readable without JS.
//
// `data-reveal` + `--i` (the item's position) drive the scroll fade-in
// and its 60ms stagger (see globals.css). The hero uses `data-hero`
// instead: a pure-CSS load animation that doesn't wait for JavaScript,
// so the headline paints immediately (better LCP).

import type { CSSProperties } from "react";
import Image from "next/image";
import HeroDots from "./HeroDots";
import CopyEmail from "./CopyEmail";
import { capabilities, contact, experience, hero, site, work, type CaseStudy } from "@/content/site";

const container = "mx-auto max-w-[1200px] px-4 md:px-8";
const section = "border-t border-line py-16 md:py-32";
const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} data-reveal className="t-h2">
      {children}
    </h2>
  );
}

/* ── HERO ─────────────────────────────────────────────────── */

export function Hero() {
  return (
    <section aria-label="Introduction" className="relative overflow-hidden">
      <HeroDots />
      <div className={`${container} relative flex flex-col items-start gap-6 pt-32 pb-16 md:pb-32`}>
        {/* Playful status pill with a softly pulsing dot */}
        <p data-hero style={stagger(0)} className="flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1 t-small">
          <span aria-hidden="true" className="status-dot" />
          {hero.status}
        </p>
        <p data-hero style={stagger(1)} className="t-label text-muted">
          {hero.label}
        </p>
        <h1 data-hero style={stagger(2)} className="t-hero max-w-[16ch]">
          {hero.headline}{" "}
          <span className="scribble text-accent">
            {hero.accentWord}
            {/* Hand-drawn underline that draws itself in after the text loads */}
            <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
              <path d="M4 14 C 40 6, 90 4, 130 8 S 180 14, 196 9" pathLength="1" />
            </svg>
          </span>
          .
        </h1>
        <p data-hero style={stagger(3)} className="max-w-[65ch] text-muted">
          {hero.body}
        </p>
        <div data-hero style={stagger(4)} className="flex flex-wrap gap-4 pt-2">
          <a href="#work" className="btn btn-primary group gap-2 px-6 py-3">
            View work
            <span aria-hidden="true" className="nudge">→</span>
          </a>
          <a href="#contact" className="btn btn-secondary px-6 py-3">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── SELECTED WORK ────────────────────────────────────────── */

function Thumbnail({ study }: { study: CaseStudy }) {
  if (study.image) {
    return (
      <Image
        src={study.image.src}
        alt={study.image.alt}
        width={1600}
        height={1000}
        sizes="(min-width: 768px) 1136px, 100vw"
        loading="lazy"
        className="thumb aspect-[16/10] w-full object-cover"
      />
    );
  }
  // Placeholder until a real screenshot is added in src/content/site.ts
  return (
    <div className="thumb flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 bg-bg">
      <span className="t-h2 text-muted">{study.platform}</span>
      <span className="t-label text-muted">Screenshot coming soon</span>
    </div>
  );
}

function WorkCard({ study, index }: { study: CaseStudy; index: number }) {
  const body = (
    <article className="card flex h-full flex-col gap-6 rounded-md border border-line bg-surface p-6 md:p-8">
      <div className="overflow-hidden rounded-md border border-line">
        <Thumbnail study={study} />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="t-h3">{study.name}</h3>
          <span aria-hidden="true" className="card-arrow t-h3 text-muted">↗</span>
        </div>
        <p className="max-w-[65ch] text-muted">{study.problem}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
        <span className="t-label rounded-sm border border-line px-2 py-1 text-muted">{study.platform}</span>
        <span className="t-mono">{study.metric}</span>
      </div>
    </article>
  );

  return (
    <li data-reveal style={stagger(index)} className={index === 0 ? "md:col-span-2" : undefined}>
      {study.href ? (
        <a href={study.href} className="block h-full rounded-md" aria-label={`${study.name} case study`}>
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className={`${section} scroll-mt-16`}>
      <div className={`${container} flex flex-col gap-12`}>
        <SectionHeading id="work-title">Selected work</SectionHeading>
        <ul className="grid gap-6 md:grid-cols-2">
          {work.map((study, i) => (
            <WorkCard key={i} study={study} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── EXPERIENCE ───────────────────────────────────────────── */

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className={`${section} scroll-mt-16`}>
      <div className={`${container} flex flex-col gap-12`}>
        <SectionHeading id="experience-title">Experience</SectionHeading>
        <ol className="flex flex-col gap-12 border-l border-line">
          {experience.map((role, i) => (
            <li key={role.company} data-reveal style={stagger(i)} className="relative flex flex-col gap-4 pl-6 md:pl-8">
              {/* Timeline dot: an 8px square with the 6px radius renders as a circle */}
              <span aria-hidden="true" className="absolute top-2 left-0 size-2 -translate-x-1/2 rounded-sm border border-muted bg-bg" />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h3 className="t-h3">{role.company}</h3>
                <span className="text-muted">{role.title}</span>
                <span className="t-mono text-muted">
                  {role.start} – {role.end}
                </span>
                {role.current && (
                  <span className="t-label rounded-pill bg-accent px-2 py-1 text-on-accent">Current</span>
                )}
              </div>
              <p className="max-w-[65ch]">{role.summary}</p>
              <ul className="flex max-w-[65ch] list-disc flex-col gap-2 pl-4 text-muted">
                {role.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── CAPABILITIES ─────────────────────────────────────────── */

export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-title" className={section}>
      <div className={`${container} flex flex-col gap-12`}>
        <SectionHeading id="capabilities-title">Capabilities</SectionHeading>
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {capabilities.map((group, i) => (
            <div key={group.title} data-reveal style={stagger(i)} className="flex flex-col gap-4">
              <h3 className="t-label text-muted">{group.title}</h3>
              <ul className="flex flex-col border-t border-line">
                {group.items.map((item) => (
                  <li key={item} className="cap-item border-b border-line py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT + FOOTER ─────────────────────────────────────── */

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className={`${section} scroll-mt-16`}>
      <div className={`${container} flex flex-col items-start gap-8`}>
        <h2 id="contact-title" data-reveal className="t-hero max-w-[18ch]">
          {contact.heading}
        </h2>
        <div data-reveal style={stagger(1)}>
          <CopyEmail email={contact.email} />
        </div>
        <ul data-reveal style={stagger(2)} className="flex flex-wrap gap-6">
          {contact.links.map((link) => (
            <li key={link.label}>
              {/* Placeholder URLs (not starting with http) render as plain text */}
              {link.href.startsWith("http") ? (
                <a href={link.href} className="link" rel="me noopener" target="_blank">
                  {link.label}
                </a>
              ) : (
                <span className="text-muted">{link.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className={`${container} flex flex-wrap items-center justify-between gap-4 t-small text-muted`}>
        <p>© 2026 {site.name}</p>
        {contact.lighthouse && <p className="t-mono">{contact.lighthouse}</p>}
        <a href="#top" className="link group flex items-center gap-2">
          Back to top <span aria-hidden="true" className="nudge-up">↑</span>
        </a>
      </div>
    </footer>
  );
}
