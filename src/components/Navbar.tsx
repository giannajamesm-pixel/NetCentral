import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/quiz", label: "Find My Path" },
  { href: "/explore", label: "Career Explorer" },
  { href: "/bizprep", label: "BizPrep" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Link href="/" aria-label="NetCentral home" className="flex shrink-0 items-center gap-2">
          <Image
            src="/nccu-logo.png"
            alt="NCCU IAIER logo"
            width={72}
            height={72}
            priority
            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
          />
          <div className="hidden border-l border-ink-100 pl-3 sm:block">
            <span className="font-display block text-lg font-bold tracking-tight">NetCentral</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">Your next chapter</span>
          </div>
        </Link>

        <nav className="flex items-center sm:gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-semibold text-ink-700 transition hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:px-4 sm:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
