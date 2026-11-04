// SECTION 2: Features
// This section shows how to build a list of cards from data.
// Instead of writing the same card HTML three times, we keep the content
// in an array and use `.map()` to turn each item into a card.

// TypeScript "type": describes what each item must contain.
type Feature = {
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    title: "Components",
    description:
      "Small reusable building blocks. This card and the section above are both components.",
  },
  {
    title: "Tailwind CSS",
    description:
      "Style things directly in className using utility classes like p-6 and rounded-xl.",
  },
  {
    title: "App Router",
    description:
      "Each folder inside src/app becomes a page. src/app/page.tsx is the home page.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-black px-6 py-20 text-white">
      <h2 className="text-center text-3xl font-medium">What I&apos;m learning</h2>

      {/* grid: 1 column on phones, 3 columns on medium screens and up */}
      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
        {features.map((feature) => (
          // `key` helps React keep track of each item in a list.
          <div
            key={feature.title}
            className="border border-white/10 bg-white/[0.03] p-6"
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-zinc-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
