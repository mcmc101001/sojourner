import JourneySearchContainer from "@/components/journeySearch/JourneySearchContainer";

import { prisma } from "@/lib/prisma";

export default async function Page() {
  const allJourneys = await prisma.journey.findMany({
    include: {
      createdBy: true,
    },
  });

  return (
    <div className="bg-background2 flex flex-col items-center">
      <JourneySearchContainer journeys={allJourneys} />
    </div>
  );
}
