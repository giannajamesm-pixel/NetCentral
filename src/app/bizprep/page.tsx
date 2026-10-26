import Navbar from "@/components/Navbar";
import BizPrepClient from "@/components/bizprep/BizPrepClient";
import EventsSection from "@/components/bizprep/EventsSection";

export const metadata = {
  title: "BizPrep — NetCentral",
  description:
    "Campus career events, upcoming career fair employers, and resume tools for NCCU students.",
};

export default function BizPrepPage() {
  return (
    <>
      <Navbar />
      <main className="bg-mesh flex-1">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <div className="text-center">
            <span className="rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
              BizPrep
            </span>
            <h1 className="font-display mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Get <span className="text-gradient">career ready</span>.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-ink-500">
              Find career events on campus, see who&apos;s recruiting at the
              next fair, and get your resume ready to hand over.
            </p>
          </div>

           <div className="mt-10 flex flex-col gap-6">
            <EventsSection />
            <BizPrepClient />

            <section className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Explore Careers with Forage
              </h2>

              <p className="mt-3 text-gray-600">
                Explore Forage for career preparation resources and
                job simulations.
              </p>

              <a
                href="https://www.theforage.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-lg bg-primary-700 px-5 py-3 font-semibold text-white hover:underline"
              >
                Visit Forage
              </a>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
