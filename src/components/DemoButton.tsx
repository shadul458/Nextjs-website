// The green "Book a demo" button, used in the navbar and in the hero form.
// Making it a component means the style lives in one place.

type DemoButtonProps = {
  type?: "button" | "submit";
  className?: string;
};

export default function DemoButton({ type = "button", className = "" }: DemoButtonProps) {
  return (
    <button
      type={type}
      className={`flex items-center gap-2 bg-green-400 px-2 py-1.5 text-sm font-medium text-black transition hover:bg-green-300 ${className}`}
    >
      {/* Small dark square with an arrow icon */}
      <span className="flex h-6 w-6 items-center justify-center bg-black/85">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 8h11" strokeDasharray="2 2" />
          <path d="M9 4l4 4-4 4" />
        </svg>
      </span>
      <span className="pr-2">Book a demo</span>
    </button>
  );
}
