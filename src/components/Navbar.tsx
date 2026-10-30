import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  activePage?: "quiz" | "explore" | "roadmap" | "bizprep";
  majorId?: string;
  careerId?: string;
};

export default function Navbar({ activePage, majorId, careerId }: NavbarProps) {
  const context = new URLSearchParams();
  if (majorId) context.set("major", majorId);
  if (careerId) context.set("career", careerId);
  const contextQuery = context.toString();
  const majorQuery = majorId ? `?major=${encodeURIComponent(majorId)}` : "";
  const links = [
    { id: "quiz", href: "/quiz", label: "Find My Path" },
    { id: "explore", href: activePage === "explore" ? "#careers" : `/explore${majorQuery}`, label: "Careers" },
    { id: "bizprep", href: `/bizprep${contextQuery ? `?${contextQuery}` : ""}`, label: "BizPrep" },
  ];

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

        <nav aria-label="Main navigation" className="flex items-center sm:gap-1">
          {links.map((link) => {
            const isActive = activePage === link.id || (activePage === "roadmap" && link.id === "explore");
            return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? (activePage === "roadmap" ? "location" : "page") : undefined}
              className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-semibold transition hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:px-4 sm:text-sm ${isActive ? "bg-primary-50 text-primary-700" : "text-ink-700"}`}
            >
              {link.label}
            </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
