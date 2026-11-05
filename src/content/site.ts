// ─────────────────────────────────────────────────────────────
// ALL PORTFOLIO CONTENT LIVES HERE.
// Anything in [square brackets] is a placeholder: replace it with your
// real details. The rule is: no invented metrics or claims, so only
// put numbers here that you can back up.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Md Shadul",
  role: "Webflow & Framer Developer, SEO and CRO",
  // Set NEXT_PUBLIC_SITE_URL when you deploy (e.g. https://mdshadul.com).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Md Shadul | Webflow & Framer Developer, SEO and CRO",
  description:
    "Md Shadul builds Webflow and Framer marketing sites that load fast, rank, and convert. 4 years in SEO and CRO, currently at MaxIQ.",
};

export const hero = {
  status: "Available for new projects",
  label: "Webflow & Framer developer · SEO · CRO",
  // The headline is split so the last word can use the accent colour.
  headline: "I build Webflow and Framer sites that load fast, rank, and",
  accentWord: "convert",
  body: "4 years building marketing sites. Currently at MaxIQ, previously Razorpay.",
};

// Metric format must be one of:
//   "Organic traffic +[X]% in [N] months"
//   "Conversion rate [A]% → [B]%"
// Add `image: { src: "/work/name.webp", alt: "..." }` once you have a
// screenshot in /public/work (1600x1000, 16:10). Add `href` to link the
// card to the full case study.
export type CaseStudy = {
  name: string;
  problem: string;
  platform: "Webflow" | "Framer";
  metric: string;
  href?: string;
  image?: { src: string; alt: string };
};

export const work: CaseStudy[] = [
  {
    name: "[Project name]",
    problem: "[One-line problem the site had to solve]",
    platform: "Webflow",
    metric: "Organic traffic +[X]% in [N] months",
  },
  {
    name: "[Project name]",
    problem: "[One-line problem the site had to solve]",
    platform: "Framer",
    metric: "Conversion rate [A]% → [B]%",
  },
  {
    name: "[Project name]",
    problem: "[One-line problem the site had to solve]",
    platform: "Webflow",
    metric: "Organic traffic +[X]% in [N] months",
  },
];

export type Role = {
  company: string;
  title: string;
  start: string;
  end: string; // "Present" for the current role
  current: boolean;
  summary: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    company: "MaxIQ",
    title: "[Job title]",
    start: "[Mon YYYY]",
    end: "Present",
    current: true,
    summary: "Webflow and Framer development, SEO, CRO.",
    bullets: [
      "[Outcome: what you shipped and the measurable result]",
      "[Outcome: what you shipped and the measurable result]",
    ],
  },
  {
    company: "Razorpay",
    title: "[Job title]",
    start: "[Mon YYYY]",
    end: "[Mon YYYY]",
    current: false,
    summary: "[One line on the scope of the role]",
    bullets: [
      "[Outcome: what you shipped and the measurable result]",
      "[Outcome: what you shipped and the measurable result]",
    ],
  },
];

export const capabilities = [
  {
    title: "Build",
    items: ["Webflow", "Framer", "CMS architecture", "Interactions", "Custom code embeds"],
  },
  {
    title: "SEO",
    items: [
      "Technical SEO",
      "Core Web Vitals",
      "Schema markup",
      "Site structure",
      "[Your SEO tools, e.g. GSC, Ahrefs, Screaming Frog]",
    ],
  },
  {
    title: "CRO",
    items: [
      "A/B testing",
      "Landing page optimization",
      "Analytics setup",
      "[Your CRO tools, e.g. GA4, Hotjar, VWO]",
    ],
  },
];

export const contact = {
  heading: "Have a site that should be converting better?",
  email: "[your@email.com]",
  // Use full URLs (https://...). Only real URLs are added to the
  // search-engine profile (JSON-LD), so placeholders are ignored there.
  links: [
    { label: "LinkedIn", href: "[https://www.linkedin.com/in/your-profile]" },
    { label: "[Webflow / Framer / Contra / Dribbble]", href: "[https://your-profile-url]" },
  ],
  // Fill in after running Lighthouse on the deployed site.
  lighthouse: "",
};
