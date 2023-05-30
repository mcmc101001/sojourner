import { QuestOnJourney, User } from "@prisma/client";
import JourneySearchItem from "./JourneySearchItem";

export default function JourneySearchResults({
  searchResults,
}: {
  searchResults: {
    questPoints: number;
    id: string;
    name: string;
    createdAt: Date;
    createdById: string;
    _count: {
      quests: number;
    };
    createdBy: User;
    quests: QuestOnJourney[];
  }[];
}) {
  return (
    <>
      {searchResults.length === 0 && (
        <p className="w-full text-center">No journeys found!</p>
      )}
      {searchResults.length > 0 && (
        <>
          <p className="ml-4">Found {searchResults.length} journeys:</p>
          <ul key="Journey Search List" className="mb-12">
            {searchResults.map((journey) => {
              return (
                <li key={journey.id} className="mt-2">
                  <JourneySearchItem journey={journey} />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
