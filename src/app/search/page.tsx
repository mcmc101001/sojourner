import JourneySearchContainer from "@/components/journeySearch/JourneySearchContainer";

import { prisma } from "@/lib/prisma";

export default async function Page() {
  const allJourneys = await prisma.journey.findMany({
    include: {
      createdBy: true,
      quests: true,
      _count: {
        select: { quests: true },
      },
    },
  });

  const allJourneysWithPoints = await Promise.all(
    allJourneys.map(async (journey) => {
      const quests = await prisma.questOnJourney.findMany({
        where: {
          journeyId: journey.id,
        },
        include: {
          quest: true,
        },
      });
      const questPoints = quests.reduce(
        (total: number, quest) => total + quest.quest.points,
        0
      );
      return {
        ...journey,
        questPoints,
      };
    })
  );

  return (
    <div className="bg-background2 flex flex-col items-center">
      <JourneySearchContainer journeys={allJourneysWithPoints} />
    </div>
  );
}
