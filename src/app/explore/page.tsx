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
      <Navbar activePage="explore" />
      <main className="bg-campus flex-1">
        <ExploreClient
          key={typeof major === "string" ? major : "all-majors"}
          initialMajorId={typeof major === "string" ? major : undefined}
        />
      </main>
    </>
  );
}
