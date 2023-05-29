import QuestItem from "@/components/QuestItem";
import SearchResults from "@/components/SearchResults";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export default async function Page({
  params,
}: {
  params: { journeyId: string };
}) {
  const user = await getCurrentUser();

  const journey = await prisma.journey.findUnique({
    where: {
      id: params.journeyId,
    },
  });

  if (!journey) return <div>Not found</div>;

  const isEditable = journey?.createdById === user?.id;

  const questsOnJourney = await prisma.questOnJourney.findMany({
    where: {
      journeyId: params.journeyId,
    },
    include: {
      quest: true,
    },
  });

  const quests = questsOnJourney.map((questOnJourney) => {
    return questOnJourney.quest;
  });

  return (
    <div className="w-full h-full flex flex-col items-center bg-background2 p-2">
      <div className="text-center text-background1 text-lg mb-3">
        {journey?.name}
      </div>
      {isEditable && <SearchResults userId={user.id} journeyId={journey.id} />}
      <div className="flex flex-col gap-y-6">
        <span className="text-background1 mt-2">Current Quests</span>
        {quests.map((quest) => {
          return (
            <QuestItem
              key={quest.id}
              journeyId={params.journeyId}
              name={quest.name}
              points={quest.points}
              action={quest?.action}
              addable={false}
              lat={quest.lat}
              lng={quest.lng}
              userId={user?.id!}
            />
          );
        })}
      </div>
    </div>
  );
}
