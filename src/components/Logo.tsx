// The "X" mark + "MaxIQ" wordmark.
// Drawn with SVG so it stays sharp at any size and needs no image file.
// `className` is passed in from outside so each place can choose the size.

export function LogoMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="x-green" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4ade80" />
          <stop offset="1" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      {/* Two slanted strokes crossing make the "X" */}
      <path d="M6 4h9l19 32h-9z" fill="url(#x-green)" />
      <path d="M34 4h-9L6 36h9z" fill="url(#x-green)" opacity="0.8" />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="flex items-center gap-1.5">
      <LogoMark className="h-6 w-6" />
      <span className="text-2xl font-bold italic tracking-tight text-white">
        MaxIQ
      </span>
    </span>
  );
}
