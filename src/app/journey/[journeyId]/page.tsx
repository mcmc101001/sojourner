import QuestItem from "@/components/QuestItem";
import SearchResults from "@/components/SearchResults";
import Button from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

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

  const allQuests = await prisma.quest.findMany();

  return (
    <div className="w-full h-full min-h-[100vh] flex flex-col items-center bg-background1 p-6">
      <div className="text-center text-background2 text-xl font-bold mb-3">
        {journey?.name}
      </div>
      {isEditable && (
        <SearchResults
          allQuests={allQuests}
          userId={user.id}
          journeyId={journey.id}
        />
      )}
      <div className="flex flex-col gap-y-6">
        <span className="text-background2 mt-2 font-semibold">
          Current Quests ({quests.length})
        </span>
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
        {isEditable && (
          <Button
            className="py-6 text-xl border-2 border-background2 mb-12"
            onClick={() => {
              toast.success("Journey published!");
              redirect("/welcome");
            }}
          >
            Publish
          </Button>
        )}
      </div>
    </div>
  );
}
