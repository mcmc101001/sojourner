import JourneySearchContainer from "@/components/journeySearch/JourneySearchContainer";

import { prisma } from "@/lib/prisma";

export default async function Page() {
  const allJourneys = await prisma.journey.findMany({
    include: {
      createdBy: true,
    },
  });

  return <JourneySearchContainer journeys={allJourneys} />;
}
