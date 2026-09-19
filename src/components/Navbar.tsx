import Link from "next/link";

const links = [
  { href: "/quiz", label: "Find My Path" },
  { href: "/explore", label: "Career Explorer" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-coral-500 font-display text-sm font-bold text-white">
            NC
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            NetCentral
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition hover:bg-primary-50 hover:text-primary-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/quiz"
          className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
