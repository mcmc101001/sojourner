"use client";

import { QuestOnJourney, User } from "@prisma/client";
import JourneySearchResults from "./JourneySearchResults";
import { useState } from "react";

type SearchProps = {
  journeys: {
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
};

export default function JourneySearchContainer({ journeys }: SearchProps) {
  const [searchResults, setSearchResults] = useState(journeys);

  const handleSearch = (text: string) => {
    if (text.length === 0) {
      setSearchResults([]);
    } else {
      setSearchResults(
        journeys.filter((journey) => journey.name.toLowerCase().includes(text))
      );
    }
  };

  return (
    <>
      <input
        className="w-11/12 m-8 p-4"
        placeholder="Search journeys..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <JourneySearchResults searchResults={searchResults} />
    </>
  );
}
