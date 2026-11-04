// Top navigation bar.
// The links come from an array (same .map() idea as in Features.tsx).
// `hidden md:flex` = hidden on phones, shown from medium screens up.

import Link from "next/link";
import Logo from "./Logo";
import DemoButton from "./DemoButton";

const navLinks = [
  { label: "Product", href: "#", hasMenu: true },
  { label: "Customers", href: "#", hasMenu: false },
  { label: "Pricing", href: "#", hasMenu: false },
  { label: "Resources", href: "#", hasMenu: true },
  { label: "Company", href: "#", hasMenu: true },
];

export default function Navbar() {
  return (
    <header className="relative z-10 border-b border-white/5">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
        <div className="flex items-center gap-12">
          <Link href="/">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-7 text-sm text-zinc-200 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="flex items-center gap-1 hover:text-white">
                  {link.label}
                  {/* Only show the down-arrow when the link has a menu */}
                  {link.hasMenu && (
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 4.5l3 3 3-3" />
                    </svg>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <Link href="#" className="hidden text-sm text-zinc-200 hover:text-white sm:block">
            Sign in
          </Link>
          <DemoButton />
        </div>
      </nav>
    </header>
  );
}
