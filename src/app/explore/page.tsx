import Navbar from "@/components/Navbar";
import ExploreClient from "@/components/explore/ExploreClient";

export const metadata = {
  title: "Career Path Explorer — NetCentral",
  description:
    "Explore real careers for your major: salary ranges, job outlook, skills, and typical career trajectories.",
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { major } = await searchParams;

  return (
    <>
      <Navbar />
      <main className="bg-campus flex-1">
        <ExploreClient
          initialMajorId={typeof major === "string" ? major : undefined}
        />
      </main>
    </>
  );
}
