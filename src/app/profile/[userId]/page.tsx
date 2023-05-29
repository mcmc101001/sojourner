import JourneyItem from "@/components/JourneyItem";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export default async function Page({ params }: { params: { userId: string } }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return <div>Not found</div>;

  const profileUser = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  const profileJourneys = await prisma.journey.findMany({
    where: {
      createdById: params.userId,
    },
  });

  return (
    <div className="w-full h-full bg-background2 flex flex-col items-center">
      <div>{profileUser?.name}</div>
      <ul className="w-full">
        {profileJourneys.map((journey) => {
          return (
            <ul key={journey.id}>
              <li className="mt-2">
                <JourneyItem journeyId={journey.id} />
              </li>
            </ul>
          );
        })}
      </ul>
    </div>
  );
}
