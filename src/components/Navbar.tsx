import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/quiz", label: "Find My Path" },
  { href: "/explore", label: "Career Explorer" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/nccu-logo.jpg"
            alt="NCCU IAIER logo"
            width={48}
            height={48}
            priority
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
          />
          <span className="font-display text-lg font-bold tracking-tight">
            NetCentral
          </span>
        </Link>

        <nav className="flex items-center sm:gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full px-2.5 py-2 text-xs font-medium text-ink-700 transition hover:bg-primary-50 hover:text-primary-700 sm:px-4 sm:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
