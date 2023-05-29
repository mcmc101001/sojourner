"use client";

import { Journey, User } from "@prisma/client";
import JourneySearchResults from "./JourneySearchResults";
import { useState } from "react";

type SearchProps = {
  journeys: (Journey & { createdBy: User })[];
};

export default function JourneySearchContainer({ journeys }: SearchProps) {
  const [searchResults, setSearchResults] = useState(journeys);

  const handleSearch = (text: string) => {
    setSearchResults(journeys.filter((journey) => journey.name.includes(text)));
  };

  return (
    <>
      <input
        className="w-11/12 m-8 p-4 "
        placeholder="Search journeys..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <JourneySearchResults searchResults={searchResults} />
    </>
  );
}
